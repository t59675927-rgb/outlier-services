export interface Currency {
  Currency_Code: string;
  Currency_Name: string;
  Currency_Symbol: string;
}

export interface Country {
  Country_Code: string;
  Country_Name: string;
  Currency_Code: string;
}

export interface VAC {
  VAC_Code: string;
  VAC_Name: string;
  Country_Code: string;
}

export interface Service {
  Service_Code: string;
  Service_Name: string;
  Service_Type: "VAS";
  Currency_Code: string;
  Unit_Price: number;
  Country_Code: string;
}

export interface PaymentMode {
  Payment_Code: string;
  Payment_Name: string;
  Currency_Code: string;
}

export interface Transaction {
  Transaction_ID: string;
  VAC_Code: string;
  VAC_Name: string;
  Country_Name: string;
  Service_Code: string;
  Service_Name: string;
  Payment_Code: string;
  Payment_Name: string;
  Currency_Code: string;
  Currency_Symbol: string;
  Unit_Price: number;
  Quantity: number;
  Line_Total: number;
  Transaction_Date: string;
  Transaction_Status: "Completed" | "Pending" | "Failed";
}

export interface CartItem extends Service {
  qty: number;
}
