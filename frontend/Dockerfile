# Use pre-built React app (built locally to avoid Node version conflicts)
FROM nginx:1.25-alpine

# Copy built assets from local build folder
COPY build/ /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
