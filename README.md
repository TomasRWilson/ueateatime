## Getting Started

First, install dependancies:

```bash
npm install
```
Then, adjust SMTP password according to operating system:

If using MAC change
```bash 
process.env.SMTP_PASSWORD_WINDOWS
```
to
```bash
process.env.SMTP_PASSWORD_MAC
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.