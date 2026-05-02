# Use pre-built React app (built locally to avoid Node version conflicts)
FROM nginx:1.25-alpine

# curl is needed to fetch GCP identity tokens from the metadata server
RUN apk add --no-cache curl

# Copy built assets from local build folder
COPY build/ /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy token-refresh entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

CMD ["/entrypoint.sh"]
