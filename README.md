# Outlier Services — VFS VAS Management Console

A Next.js 14 (App Router) internal POS tool for logging Value-Added Services (VAS) at VFS Visa Application Centres.

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS**
- **React Context + useReducer** — state management
- **Static JSON/TS** — MDM data (no backend)

## Project Structure

```
outlier-services/
├── app/
│   ├── layout.tsx           # Root layout (Header + Sidebar + Provider)
│   ├── page.tsx             # Entry point
│   ├── ClientPage.tsx       # Page router (new | history)
│   ├── NewTransactionPage.tsx
│   ├── HistoryPage.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx           # Top bar — VFS branding, operator info
│   ├── Sidebar.tsx          # Left nav — collapsible
│   ├── SectionCard.tsx      # Reusable card wrapper
│   ├── LocationSelector.tsx # Country + VAC cascading dropdowns
│   ├── ServicesPanel.tsx    # Service rows with +/- stepper
│   ├── CartSummary.tsx      # Live cart with line totals
│   ├── PaymentModeSelector.tsx
│   ├── CheckoutPanel.tsx    # Checklist + confirm button
│   └── TransactionHistory.tsx
├── context/
│   └── AppContext.tsx       # Global state — cart, selections, transactions
├── data/
│   ├── types.ts             # TypeScript interfaces
│   └── mdm.ts              # Static MDM tables (countries, VACs, services, etc.)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Flow

1. Select **Country** (searchable dropdown)
2. Select **VAC** (filtered by country)
3. Add **Services** to cart using +/- stepper
4. Select **Payment Mode** (filtered by currency)
5. Click **Confirm & Checkout** → transaction saved to session state
6. View **Transaction Log** in sidebar

## Extending

### Add MDM data
Edit `data/mdm.ts` — add rows to `countries`, `vacs`, `services`, or `paymentModes`.

### Connect a backend
Replace the `checkout` function in `context/AppContext.tsx` with an API call (e.g., `fetch('/api/transactions', { method: 'POST', body: ... })`).

### Add auth
Wrap `AppProvider` in your auth provider (NextAuth, Clerk, etc.) and read the session in `Header.tsx`.

### Persist transactions
Add a Next.js API route at `app/api/transactions/route.ts` and POST to it from `checkout()`.
