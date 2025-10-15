This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Using PostgreSQL with Prisma (local development)

This project includes a Prisma schema and seed script to load the existing dummy data into a PostgreSQL database.

Steps:

1. Install dependencies (adds Prisma and the client):

	```powershell
	npm install
	```

2. Create a PostgreSQL database (locally or via a provider) and copy `.env.example` to `.env` then set `DATABASE_URL`.

3. Generate Prisma client and run migrations:

	```powershell
	npx prisma generate
	npx prisma migrate dev --name init
	```

4. Seed the database:

	```powershell
	npm run prisma:seed
	```

5. Start the dev server:

	```powershell
	npm run dev
	```

API: a simple route is available at `/api/menu` to fetch categories and items from the database.
