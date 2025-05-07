# Myan Flow

## Running the Application

### Development Mode

To start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

To build the application for production:

```bash
pnpm run build
```

---

## Linting and Formatting

### Check for Linting Issues

```bash
pnpm run lint
```

### Automatically Fix Linting Issues

```bash
pnpm run lint:fix

pnpm run format
```

The End.
---

### Generate Schema

```bash
pnpm run db:generate
```

### Run Migrations

```bash
pnpm run db:migrate
```

### Open Drizzle Studio

```bash
pnpm run db:studio
```

### Run DB Seeding

```bash

pnpm run seed
```

Demo Accounts

Super User Admin:
```
email: admin123@gmail.com
password: Admin123!
```

Customer:
```
email: user123@gmail.com
password: User123!
```

Warehouse:
```
email: warehouse123@gmail.com
password: Warehouse123!
```

Finance
```
email: finance123@gmail.com
password: Finance123!
```