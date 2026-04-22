#!/bin/bash
set -e

# ============================================================
# HIK - Google Cloud Run Deploy Script
# ============================================================

# --- CONFIG (edit these) ---
PROJECT_ID="artf-staging-env"
REGION="us-east4"
REGISTRY="us-east1-docker.pkg.dev/${PROJECT_ID}/artefactos"
DOMAIN="hik.artificialmente.uy"

# MongoDB (from Atlas)
MONGO_URL="mongodb+srv://martin_db_user:VCBNEt8fKBIXAEaM@cluster0.a6v4fzz.mongodb.net/?appName=Cluster0"
DB_NAME="hikdb"

# Service names
BACKEND_SERVICE="hik-backend"
FRONTEND_SERVICE="hik-frontend"

# Image tags
BACKEND_IMAGE="${REGISTRY}/${BACKEND_SERVICE}:latest"
FRONTEND_IMAGE="${REGISTRY}/${FRONTEND_SERVICE}:latest"

# ============================================================

echo "🔐 Authenticating with Google Cloud..."
gcloud config set project ${PROJECT_ID}
gcloud auth configure-docker us-east1-docker.pkg.dev --quiet

# ============================================================
echo ""
echo "🐍 Building backend image..."
docker build -t ${BACKEND_IMAGE} ./backend
echo "📤 Pushing backend image..."
docker push ${BACKEND_IMAGE}

echo ""
echo "🚀 Deploying backend to Cloud Run..."
gcloud run deploy ${BACKEND_SERVICE} \
  --image=${BACKEND_IMAGE} \
  --region=${REGION} \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=3 \
  --set-env-vars="MONGO_URL=${MONGO_URL},DB_NAME=${DB_NAME},CORS_ORIGINS=https://${DOMAIN}"

# Get the backend URL
BACKEND_URL=$(gcloud run services describe ${BACKEND_SERVICE} \
  --region=${REGION} \
  --format="value(status.url)")
echo ""
echo "✅ Backend deployed at: ${BACKEND_URL}"

# ============================================================
echo ""
echo "⚛️  Building frontend image (with backend URL: ${BACKEND_URL})..."
cd frontend
export REACT_APP_BACKEND_URL=${BACKEND_URL}
npm install
npm run build
cd ..

docker build \
  --build-arg REACT_APP_BACKEND_URL=${BACKEND_URL} \
  -t ${FRONTEND_IMAGE} \
  ./frontend
echo "📤 Pushing frontend image..."
docker push ${FRONTEND_IMAGE}

echo ""
echo "🚀 Deploying frontend to Cloud Run..."
gcloud run deploy ${FRONTEND_SERVICE} \
  --image=${FRONTEND_IMAGE} \
  --region=${REGION} \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=256Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=3

FRONTEND_URL=$(gcloud run services describe ${FRONTEND_SERVICE} \
  --region=${REGION} \
  --format="value(status.url)")
echo ""
echo "✅ Frontend deployed at: ${FRONTEND_URL}"

# ============================================================
echo ""
echo "🌐 Mapping custom domain: ${DOMAIN} → ${FRONTEND_SERVICE}"
gcloud run domain-mappings create \
  --service=${FRONTEND_SERVICE} \
  --domain=${DOMAIN} \
  --region=${REGION} || echo "⚠️  Domain mapping may already exist."

echo ""
echo "📋 CNAME record to add in cPanel:"
echo "   Name:  hik"
echo "   Type:  CNAME"
echo "   Value: ghs.googlehosted.com"
echo ""
echo "============================================================"
echo "✅ Deploy complete!"
echo "   Frontend (Cloud Run): ${FRONTEND_URL}"
echo "   Frontend (cPanel domain): https://${DOMAIN}  ← after CNAME"
echo "   Backend:  ${BACKEND_URL}"
echo "============================================================"
