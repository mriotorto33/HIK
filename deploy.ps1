$ErrorActionPreference = "Stop"

# ============================================================
# HIK - Google Cloud Run Deploy Script (PowerShell)
# ============================================================

# --- CONFIG (edit these) ---
$PROJECT_ID = "artf-staging-env"
$REGION = "us-east4"
$REGISTRY = "us-east1-docker.pkg.dev/$PROJECT_ID/artefactos"
$DOMAIN = "hik.artificialmente.uy"

$MONGO_URL = "mongodb+srv://martin_db_user:7sEBf58_gV6i%25-%25@cluster0.a6v4fzz.mongodb.net/?appName=Cluster0"
$DB_NAME = "hikdb"
$CORS_ORIGINS = "https://hik.artificialmente.uy,https://humaniskind.com,https://www.humaniskind.com,https://hik-frontend-6oohyoez6q-uk.a.run.app,https://hik-frontend-805730087505.us-east4.run.app"

$BACKEND_SERVICE = "hik-backend"
$FRONTEND_SERVICE = "hik-frontend"

$BACKEND_IMAGE = "$REGISTRY/$BACKEND_SERVICE`:latest"
$FRONTEND_IMAGE = "$REGISTRY/$FRONTEND_SERVICE`:latest"

# ============================================================

Write-Host "Authenticating with Google Cloud..."
gcloud config set project $PROJECT_ID
gcloud auth configure-docker us-east1-docker.pkg.dev --quiet

# ============================================================
Write-Host "`nBuilding backend image..."
docker build -t $BACKEND_IMAGE ./backend

Write-Host "Pushing backend image..."
docker push $BACKEND_IMAGE

Write-Host "`nDeploying backend to Cloud Run..."
gcloud run deploy $BACKEND_SERVICE `
  --image=$BACKEND_IMAGE `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --port=8080 `
  --memory=512Mi `
  --cpu=1 `
  --min-instances=0 `
  --max-instances=3 `
  --set-env-vars="MONGO_URL=$MONGO_URL,DB_NAME=$DB_NAME,CORS_ORIGINS=$CORS_ORIGINS"

$BACKEND_URL = gcloud run services describe $BACKEND_SERVICE --region=$REGION --format="value(status.url)"
Write-Host "`nBackend deployed at: $BACKEND_URL"

# ============================================================
Write-Host "`nBuilding frontend image (with backend URL: $BACKEND_URL)..."
Push-Location -Path ./frontend
$env:REACT_APP_BACKEND_URL=$BACKEND_URL
npm install
npm run build
Pop-Location
docker build `
  --build-arg REACT_APP_BACKEND_URL=$BACKEND_URL `
  -t $FRONTEND_IMAGE `
  ./frontend

Write-Host "Pushing frontend image..."
docker push $FRONTEND_IMAGE

Write-Host "`nDeploying frontend to Cloud Run..."
gcloud run deploy $FRONTEND_SERVICE `
  --image=$FRONTEND_IMAGE `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --port=8080 `
  --memory=256Mi `
  --cpu=1 `
  --min-instances=0 `
  --max-instances=3

$FRONTEND_URL = gcloud run services describe $FRONTEND_SERVICE --region=$REGION --format="value(status.url)"
Write-Host "`nFrontend deployed at: $FRONTEND_URL"

# ============================================================
Write-Host "`nMapping custom domain: $DOMAIN to $FRONTEND_SERVICE"
try {
    gcloud run domain-mappings create `
      --service=$FRONTEND_SERVICE `
      --domain=$DOMAIN
} catch {
    Write-Host "Domain mapping may already exist."
}

Write-Host "`nCNAME record to add in cPanel:"
Write-Host "   Name:  hik"
Write-Host "   Type:  CNAME"
Write-Host "   Value: ghs.googlehosted.com`n"
Write-Host "============================================================"
Write-Host "Deploy complete!"
Write-Host "   Frontend (Cloud Run): $FRONTEND_URL"
Write-Host "   Frontend (cPanel domain): https://$DOMAIN  <- after CNAME"
Write-Host "   Backend:  $BACKEND_URL"
Write-Host "============================================================"
