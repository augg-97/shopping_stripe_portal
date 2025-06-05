# Shoping stripe portal

Hoang's e-commerce APIs service

## System requirements

Make sure system installed

**NodeJS >= v18**

**PNPM >= v8**

**Docker**

**Visual studio code**

## Setup and run localy

Clone the project

```bash
  git clone https://github.com/l2h97/shopping_stripe_portal.git
```

Go to the project directory

```bash
  cd shopping_stripe_portal
```

Create file `.env` have data follow file `./src/appConfigs/configuration.ts`

Initialize infrastructure

```bash
  docker compose -f docker-compose.yml up
```

Install dependencies

```bash
  pnpm install
```

Initialize database schema

```bash
  pnpm run prima:migration dev
```

```bash
  pnpm run prima:generate
```

Run server dev

```bash
  pnpm run dev
```

Start the server

```bash
  pnpm run build
```

```bash
  pnpm run start
```
