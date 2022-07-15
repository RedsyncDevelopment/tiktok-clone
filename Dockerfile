FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY .env ./


RUN npm install
RUN npx prisma generate

COPY .gitignore ./
COPY example.env ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY components ./components
COPY pages ./pages

COPY states ./states
COPY styles ./styles
COPY utils ./utils


CMD ["npm", "run", "dev"]