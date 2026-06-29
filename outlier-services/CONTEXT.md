Here's the complete **Q&A summary** to paste alongside your master prompt in a new chat:

---

### ✅ Confirmed Answers — Outlier Services (Next.js / VFS)

| # | Question | Answer |
|---|---|---|
| 1 | Data source | Static JSON files (MDM-based, no backend/API) |
| 2 | Authentication | None — no login required |
| 3 | State management | React Context + `useState` |
| 4 | Styling | Tailwind CSS |
| 5 | Transaction persistence | Local state only — no DB yet |
| 6 | Multi-service checkout | One combined transaction with multiple services under one `Transaction_ID` |
| 7 | Transaction history page | Out of scope for now (future feature) |

---

### 🔒 Additional Locked Decisions

- Currency defaults to **INR** — architecture should support switching later
- `Service_Type` is always **VAS** — display as label, no filtering needed
- `Unit_Price` is **fixed** from JSON — not editable by user
- `Total = Unit_Price × Quantity` — computed on frontend
- Payment modes are **filtered by Currency_Code**
- Services are **filtered by Country_Code**
- VAC is **filtered by Country_Code**
- On checkout → one Transaction record, `Transaction_Status` defaults to `Completed`
- No Region filter needed in UI for now (optional field, skip for v1)

---

Paste the master prompt first, then this block right after it, and you're good to go. Want me to also define the JSON file structures you should prepare before starting the build?

Here's a comprehensive master prompt for your **Outlier Services** application:

---

## 🧾 Master Prompt — Outlier Services (Next.js Application for VFS)

---

### 🔷 Project Overview

You are an expert **Next.js frontend developer and UI designer**. I am building a web application called **Outlier Services** for **VFS (Visa Facilitation Services)**. This application is an internal POS/service management tool used at VFS centers to log and manage **Value-Added Services (VAS)** such as Xerox, printouts, photoshoots, etc., offered to visa applicants.

The tech stack is **Next.js** (App Router preferred). The UI should be clean, professional, and operational — suited for a front-desk operator at a VAC (Visa Application Center).

---

### 🗃️ Database Design (MDM — Master Data Management)

The application uses flat CSV-based MDM tables. Here is the full schema:

| Table | Columns | Notes |
|---|---|---|
| `COUNTRY` | `Country_Code` (PK), `Country_Name`, `Region_Code` (FK), `Currency_Code` (FK) | |
| `VAC` | `VAC_Code` (PK), `VAC_Name`, `Country_Code` (FK) | VAC belongs to a country |
| `Region` | `Region_Code` (PK), `Region_Name` | |
| `Currency` | `Currency_Code` (PK), `Currency_Name`, `Currency_Symbol`, `Country_Code` (FK) | |
| `Payment_Modes` | `Payment_Code` (PK), `Payment_Name`, `Currency_Code` (FK) | Modes tied to currency |
| `Services` | `Service_Code` (PK), `Service_Name`, `Service_Type`, `Currency_Code` (FK), `Unit_Price` (Decimal 10,2), `Country_Code` (FK) | Service_Type is always `VAS` |
| `Transactions` | `Transaction_ID` (PK, int), `VAC_Code` (FK), `Service_Code` (FK), `Payment_Code` (FK), `Currency_Code` (FK), `Unit_Price`, `Transaction_Date`, `Transaction_Status` (`Completed / Pending / Failed`) | |

---

### 🔁 Application Flow

```
1. Select Region (optional filter)
       ↓
2. Select Country (dropdown/search)
       ↓
3. Select VAC (filtered by Country)
       ↓
4. Load Services (filtered by Country)
       ↓
5. Add Services to Cart (with quantity)
       ↓
6. Select Payment Mode (filtered by Currency)
       ↓
7. Checkout → Save to Transactions table
```

---

### 🖥️ UI Layout Structure

#### **Header**
- Application name: **Outlier Services**
- Logo / branding for VFS
- Operator info or session info (if applicable)

#### **Left Navbar (Sidebar)**
- Navigation links (e.g., New Transaction, Transaction History, Settings, etc.)
- Collapsible preferred

#### **Main Body — Components (in order)**

---

**1. Country & VAC Selector Component**
- Search or dropdown to select **Country**
- Once country is selected → load **VAC** options filtered by that country
- Optional: Region filter above Country
- Display selected Country and VAC clearly

---

**2. Services Component**
- Load all services filtered by the selected **Country**
- Display each service as a card/row showing:
  - `Service_Name` — `(Service_Code)` — `Service_Type: VAS`
  - `Unit_Price` with currency symbol (default: **INR**)
  - **Quantity control** — ADD button UI (+ / − stepper, not just a simple add)
  - Line total = `Unit_Price × Quantity`
- Services are **per VAC** — different VACs may offer different services
- Currency displayed can change based on user request; **default is INR**

---

**3. Cart Summary Component**
- Shows all selected services with:
  - Service Name, Service Code
  - Quantity, Unit Price, Line Total
- Shows **Grand Total**
- Option to remove items or update quantity
- Visible alongside or below the Services component

---

**4. Payment Mode Component**

- Lists all available **Payment Modes** filtered by the **Currency** of the selected country
- Radio button or card-based selection UI
- User selects one payment mode before proceeding to checkout

---

**5. Checkout / Confirm Button**
- Triggers saving the transaction to the `Transactions` table
- Each service added = one transaction record
- Transaction includes: VAC_Code, Service_Code, Payment_Code, Currency_Code, Unit_Price, Transaction_Date, Transaction_Status

---

### 🧠 Business Logic / Rules

- `Service_Type` is always **VAS** — no need to filter, but display it as a label
- `Unit_Price` is **fixed** — pulled from the Services table, not editable by the user
- `Total Amount = Unit_Price × Quantity` computed on the frontend
- Currency defaults to **INR**; architecture should support future currency switching
- Payment modes are **currency-dependent** — filter `Payment_Modes` by `Currency_Code`
- Each line item in cart = one row in `Transactions` on checkout
- `Transaction_Status` defaults to `Completed` on successful checkout

---

### ✅ What I Need You to Build / Help With

1. **Header + Sidebar Navbar** — layout scaffold
2. **Country & VAC selector** — with cascading dropdown logic
3. **Services listing component** — with quantity stepper and live line-total
4. **Cart Summary component** — dynamic, updates in real time
5. **Payment Mode selector** — filtered by currency
6. **Checkout flow** — writes to Transactions

---

### ❓ Questions Still Needed From Me (Before Full Build)

Before proceeding, confirm or provide:

1. **Data source** — Are the CSV files loaded as static JSON at build time, or is there a backend API / database connection (e.g., Supabase, PostgreSQL)?
2. **Auth** — Is there operator login, or is this open/internal tool?
3. **State management** — Redux, Zustand, React Context, or just `useState`?
4. **Styling preference** — Tailwind CSS, CSS Modules, or a component library (shadcn/ui, Ant Design)?
5. **Transaction persistence** — Where does the transaction get saved? API route? Direct DB?
6. **Multi-service checkout** — Does one checkout create multiple transaction rows (one per service), or one combined transaction?
7. **History / reporting page** — Is a transaction history view in scope now or later?

---

That's the full master prompt. Once you answer those 7 questions, development can begin cleanly from component 1 through checkout. What would you like to start with first?


You are a software designer. iam making an application in next.js. it is called Outlier Services. I am making this for VFS. V R MAKING USE OF VAS services such as xerox, printout, photoshoot, etc. i need to make the header and navbar, the in main body the country vac services payment mode and cart summary....to make this what all things do u need from me. i have the database design ready. and ik how the ui format should be. if u have understood then lemme know what all u understood and ask me relevant questions which is related to this project i am about to make o help you

DB Schema: I am using MDM (Master Data Management)

### **COUNTRY.csv**

```csv
Column Name,Data Type,Key,Length
Country_Code,Text,PK,5
Country_Name,Text,,50
Region_Code,Text,FK,5
Currency_Code,Text,FK,5
```

***

### **VAC.csv**

```csv
Column Name,Data Type,Key,Length
VAC_Code,Text,PK,5
VAC_Name,Text,,50
Country_Code,Text,FK,5
```

***

### **Region.csv**

```csv
Column Name,Data Type,Key,Length
Region_Code,Text,PK,5
Region_Name,Text,,50
```

***

### **Currency.csv**

```csv
Column Name,Data Type,Key,Length
Currency_Code,Text,PK,5
Currency_Name,Text,,50
Currency_Symbol,Text,,5
Country_Code,Text,FK,5
```

***

### **Payment\_Modes.csv**

```csv
Column Name,Data Type,Key,Length
Payment_Code,Text,PK,5
Payment_Name,Text,,50
Currency_Code,Text,FK,5
```

***

### **Services.csv**

```csv
Column Name,Data Type,Key,Length
Service_Code,Text,PK,5
Service_Name,Text,,50
Service_Type,Text,,50
Currency_Code,Text,FK,5
Unit_Price,Decimal,,10,2
Country_Code,Text,FK,5
```

> Note: `Unit_Price` length split into precision and scale (`10,2`).

***

### **Transactions.csv**

```csv
Column Name,Data Type,Description,Key
Transaction_ID,Integer,Unique transaction identifier,PK
VAC_Code,Text,Reference to VAC,FK
Service_Code,Text,Reference to Service,FK
Payment_Code,Text,Reference to Payment Mode,FK
Currency_Code,Text,Reference to Currency,FK
Unit_Price,Decimal,Price per unit at time of transaction,
Transaction_Date,Date,Date of transaction,
Transaction_Status,Text,Completed / Pending / Failed,
```

***

Flow inferred:
1. Select Region (optional)
2. Select Country
3. Select VAC
4. Load Services (based on country)
5. Add services to cart
6. Select payment mode (based on currency)
7. Checkout → Save to transactions

UI
yaa services maye different for different vacs quanity should be ADD UI:Top: HeaderLeft Bar: Navbarbelow header (in main page):Country and VAC (selected through search or dropdown)Services component:All services shown in this componentYou can select the services u want to add service code shown in bracket along with name, and service type is always VASCurrency will change according to user request but for now v take default INRu can add the number of units u want; the prices will be fixed. Total amount=number of units* unit priceCart Summary
Summary of all the services used and their pricesPayment Mode Component:gives list of all payment mode available in this component and u can select which u want to proceed
