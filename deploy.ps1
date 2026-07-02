$ErrorActionPreference = "Stop"

# HIK Website Deploy Script
# Project:  gen-lang-client-0109704786
# Region:   us-east4
# Registry: us-east4-docker.pkg.dev/gen-lang-client-0109704786/hik-repo
# Domain:   www.humaniskind.com

$PROJECT_ID      = "gen-lang-client-0109704786"
$REGION          = "us-east4"
$REGISTRY        = "us-east4-docker.pkg.dev/$PROJECT_ID/hik-repo"
$DOMAIN          = "www.humaniskind.com"

$BACKEND_SERVICE  = "hik-backend"
$FRONTEND_SERVICE = "hik-frontend"

$BACKEND_IMAGE    = "$REGISTRY/$BACKEND_SERVICE`:latest"
$FRONTEND_IMAGE   = "$REGISTRY/$FRONTEND_SERVICE`:latest"

Write-Host "=== HIK Deploy: $PROJECT_ID ===" -ForegroundColor Cyan

# 0. Auth
Write-Host "[0/6] Authenticating..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID
gcloud config set account martinriotorto33@gmail.com
gcloud auth configure-docker us-east4-docker.pkg.dev --quiet

# 0b. Pull runtime config from Secret Manager
Write-Host "[0/6] Resolving runtime config..." -ForegroundColor Yellow
$MONGO_URI      = gcloud secrets versions access latest --secret="hik-mongo-uri"      --project=$PROJECT_ID
$DB_NAME        = gcloud secrets versions access latest --secret="hik-db-name"        --project=$PROJECT_ID
$CORS_ORIGINS   = gcloud secrets versions access latest --secret="hik-cors-origins"   --project=$PROJECT_ID
$POSTHOG_KEY    = gcloud secrets versions access latest --secret="hik-posthog-key"    --project=$PROJECT_ID
Write-Host "  Config resolved." -ForegroundColor Green

# 1. Build + push backend
Write-Host "[1/5] Building backend image..." -ForegroundColor Yellow
docker build -t $BACKEND_IMAGE ./backend
docker push $BACKEND_IMAGE
Write-Host "  Backend image pushed" -ForegroundColor Green

# 2. Deploy hik-backend
Write-Host "[2/5] Deploying hik-backend to Cloud Run..." -ForegroundColor Yellow
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
  --set-env-vars="MONGO_URI=$MONGO_URI,MONGO_TLS=true,DB_NAME=$DB_NAME,CORS_ORIGINS=$CORS_ORIGINS"

$BACKEND_URL = gcloud run services describe $BACKEND_SERVICE --region=$REGION --format="value(status.url)"
Write-Host "  Backend live at: $BACKEND_URL" -ForegroundColor Green

# 3. Build frontend (Next.js)
Write-Host "[3/5] Building frontend (Next.js)..." -ForegroundColor Yellow
docker build `
  --build-arg NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL `
  --build-arg NEXT_PUBLIC_POSTHOG_KEY=$POSTHOG_KEY `
  --build-arg NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com `
  -t $FRONTEND_IMAGE `
  ./frontend-next
docker push $FRONTEND_IMAGE
Write-Host "  Frontend image pushed" -ForegroundColor Green

# 4. Deploy hik-frontend
Write-Host "[4/5] Deploying hik-frontend to Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $FRONTEND_SERVICE `
  --image=$FRONTEND_IMAGE `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --port=8080 `
  --memory=512Mi `
  --cpu=1 `
  --min-instances=0 `
  --max-instances=3

$FRONTEND_URL = gcloud run services describe $FRONTEND_SERVICE --region=$REGION --format="value(status.url)"
Write-Host "  Frontend live at: $FRONTEND_URL" -ForegroundColor Green

# 5. Custom domain mapping
Write-Host "[5/5] Mapping domain $DOMAIN..." -ForegroundColor Yellow
try {
    gcloud run domain-mappings create `
      --service=$FRONTEND_SERVICE `
      --domain=$DOMAIN `
      --region=$REGION
} catch {
    Write-Host "  Domain mapping may already exist -- skipping" -ForegroundColor DarkYellow
}

# Summary
Write-Host ""
Write-Host "=== DEPLOY COMPLETE ===" -ForegroundColor Green
Write-Host "  Frontend (Cloud Run): $FRONTEND_URL" -ForegroundColor Cyan
Write-Host "  Frontend (domain):    https://$DOMAIN  (after CNAME)" -ForegroundColor Cyan
Write-Host "  Backend:              $BACKEND_URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "  DNS CNAME to set:" -ForegroundColor Yellow
Write-Host "    Name:  www" -ForegroundColor White
Write-Host "    Type:  CNAME" -ForegroundColor White
Write-Host "    Value: ghs.googlehosted.com" -ForegroundColor White
