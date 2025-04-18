##### Stage 1 - Development - Generate dist folder
FROM node:21-slim AS builder
LABEL author="Swadesh Behera"

# RUN npm install -g pnpm

WORKDIR /usr/app
COPY package.json ./
COPY .npmrc ./
ENV PUPPETEER_SKIP_DOWNLOAD="true"
RUN yarn install --force
RUN cp -R node_modules prod_node_modules
COPY . .
RUN yarn run build

##### Stage 2 - Production
FROM builder as production
WORKDIR /usr/app
COPY --from=builder /usr/app/prod_node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD="true"
ENV NODE_ENV=production
COPY --from=builder /usr/app/.svelte-kit ./.svelte-kit
CMD [ "yarn", "start" ]
