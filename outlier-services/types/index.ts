// COUNTRY
export interface Country {
    Country_Code: string;
    Country_Name: string;
    Region_Code?: string;
    Currency_Code?: string;
  }
  
  // VAC
  export interface VAC {
    VAC_Code: string;
    VAC_Name: string;
    Country_Code: string;
  }
  
  // REGION (optional for future)
  export interface Region {
    Region_Code: string;
    Region_Name: string;
  }
  
  // CURRENCY
  export interface Currency {
    Currency_Code: string;
    Currency_Name: string;
    Currency_Symbol: string;
    Country_Code: string;
  }
  
  // PAYMENT MODES
  export interface PaymentMode {
    Payment_Code: string;
    Payment_Name: string;
    Currency_Code: string;
  }
  
  // SERVICES
  export interface Service {
    Service_Code: string;
    Service_Name: string;
    Service_Type: "VAS";
    Currency_Code: string;
    Unit_Price: number;
    Country_Code: string;
  
    // optional (if you implement VAC-level services)
    VAC_Code?: string;
  }
  
  // CART ITEM (frontend only)
  export interface CartItem {
    code: string;
    name: string;
    price: number;
    qty: number;
  }
  
  // TRANSACTION
  export interface Transaction {
    Transaction_ID: number;
    VAC_Code: string;
    Service_Code: string;
    Payment_Code: string;
    Currency_Code: string;
    Unit_Price: number;
    Quantity: number;
    Transaction_Date: string;
    Transaction_Status: "Completed" | "Pending" | "Failed";
  }