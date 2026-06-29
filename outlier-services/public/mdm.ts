import type { Currency, Country, VAC, Service, PaymentMode } from "./types";

export const currencies: Currency[] = [
  { Currency_Code: "INR", Currency_Name: "Indian Rupee", Currency_Symbol: "₹" },
  { Currency_Code: "USD", Currency_Name: "US Dollar", Currency_Symbol: "$" },
  { Currency_Code: "EUR", Currency_Name: "Euro", Currency_Symbol: "€" },
  { Currency_Code: "GBP", Currency_Name: "British Pound", Currency_Symbol: "£" },
  { Currency_Code: "AED", Currency_Name: "UAE Dirham", Currency_Symbol: "د.إ" },
];

export const countries: Country[] = [
  { Country_Code: "IN", Country_Name: "India", Currency_Code: "INR" },
  { Country_Code: "US", Country_Name: "United States", Currency_Code: "USD" },
  { Country_Code: "DE", Country_Name: "Germany", Currency_Code: "EUR" },
  { Country_Code: "FR", Country_Name: "France", Currency_Code: "EUR" },
  { Country_Code: "GB", Country_Name: "United Kingdom", Currency_Code: "GBP" },
  { Country_Code: "AE", Country_Name: "United Arab Emirates", Currency_Code: "AED" },
];

export const vacs: VAC[] = [
  { VAC_Code: "IN-DEL", VAC_Name: "Delhi VAC", Country_Code: "IN" },
  { VAC_Code: "IN-MUM", VAC_Name: "Mumbai VAC", Country_Code: "IN" },
  { VAC_Code: "IN-BLR", VAC_Name: "Bangalore VAC", Country_Code: "IN" },
  { VAC_Code: "IN-CHE", VAC_Name: "Chennai VAC", Country_Code: "IN" },
  { VAC_Code: "IN-HYD", VAC_Name: "Hyderabad VAC", Country_Code: "IN" },
  { VAC_Code: "US-NYC", VAC_Name: "New York VAC", Country_Code: "US" },
  { VAC_Code: "US-LAX", VAC_Name: "Los Angeles VAC", Country_Code: "US" },
  { VAC_Code: "US-CHI", VAC_Name: "Chicago VAC", Country_Code: "US" },
  { VAC_Code: "DE-BER", VAC_Name: "Berlin VAC", Country_Code: "DE" },
  { VAC_Code: "DE-MUN", VAC_Name: "Munich VAC", Country_Code: "DE" },
  { VAC_Code: "FR-PAR", VAC_Name: "Paris VAC", Country_Code: "FR" },
  { VAC_Code: "GB-LON", VAC_Name: "London VAC", Country_Code: "GB" },
  { VAC_Code: "GB-MAN", VAC_Name: "Manchester VAC", Country_Code: "GB" },
  { VAC_Code: "AE-DXB", VAC_Name: "Dubai VAC", Country_Code: "AE" },
  { VAC_Code: "AE-AUH", VAC_Name: "Abu Dhabi VAC", Country_Code: "AE" },
];

export const services: Service[] = [
  // India
  { Service_Code: "VAS-XRX-IN",  Service_Name: "Xerox / Photocopy",      Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 5.00,   Country_Code: "IN" },
  { Service_Code: "VAS-PRT-IN",  Service_Name: "Printout (B&W)",          Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 10.00,  Country_Code: "IN" },
  { Service_Code: "VAS-CLR-IN",  Service_Name: "Printout (Color)",        Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 25.00,  Country_Code: "IN" },
  { Service_Code: "VAS-PHT-IN",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 150.00, Country_Code: "IN" },
  { Service_Code: "VAS-SCN-IN",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 8.00,   Country_Code: "IN" },
  { Service_Code: "VAS-LAM-IN",  Service_Name: "Lamination",              Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 30.00,  Country_Code: "IN" },
  { Service_Code: "VAS-SMS-IN",  Service_Name: "SMS Notification",        Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 20.00,  Country_Code: "IN" },
  { Service_Code: "VAS-TRK-IN",  Service_Name: "Courier Tracking",        Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 50.00,  Country_Code: "IN" },
  { Service_Code: "VAS-ATT-IN",  Service_Name: "Attestation Assistance",  Service_Type: "VAS", Currency_Code: "INR", Unit_Price: 200.00, Country_Code: "IN" },
  // USA
  { Service_Code: "VAS-PHT-US",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "USD", Unit_Price: 15.00,  Country_Code: "US" },
  { Service_Code: "VAS-SCN-US",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "USD", Unit_Price: 3.00,   Country_Code: "US" },
  { Service_Code: "VAS-PRT-US",  Service_Name: "Printout",                Service_Type: "VAS", Currency_Code: "USD", Unit_Price: 2.00,   Country_Code: "US" },
  { Service_Code: "VAS-TRK-US",  Service_Name: "Courier Tracking",        Service_Type: "VAS", Currency_Code: "USD", Unit_Price: 12.00,  Country_Code: "US" },
  // Germany
  { Service_Code: "VAS-PHT-DE",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 12.00,  Country_Code: "DE" },
  { Service_Code: "VAS-SCN-DE",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 2.50,   Country_Code: "DE" },
  { Service_Code: "VAS-TRN-DE",  Service_Name: "Document Translation",    Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 55.00,  Country_Code: "DE" },
  // France
  { Service_Code: "VAS-PHT-FR",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 14.00,  Country_Code: "FR" },
  { Service_Code: "VAS-TRN-FR",  Service_Name: "Document Translation",    Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 60.00,  Country_Code: "FR" },
  { Service_Code: "VAS-SCN-FR",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "EUR", Unit_Price: 3.00,   Country_Code: "FR" },
  // UK
  { Service_Code: "VAS-PHT-GB",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "GBP", Unit_Price: 10.00,  Country_Code: "GB" },
  { Service_Code: "VAS-SCN-GB",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "GBP", Unit_Price: 2.00,   Country_Code: "GB" },
  { Service_Code: "VAS-TRK-GB",  Service_Name: "Courier Tracking",        Service_Type: "VAS", Currency_Code: "GBP", Unit_Price: 9.00,   Country_Code: "GB" },
  { Service_Code: "VAS-PRT-GB",  Service_Name: "Printout",                Service_Type: "VAS", Currency_Code: "GBP", Unit_Price: 1.50,   Country_Code: "GB" },
  // UAE
  { Service_Code: "VAS-PHT-AE",  Service_Name: "Passport Photoshoot",     Service_Type: "VAS", Currency_Code: "AED", Unit_Price: 50.00,  Country_Code: "AE" },
  { Service_Code: "VAS-SCN-AE",  Service_Name: "Document Scan",           Service_Type: "VAS", Currency_Code: "AED", Unit_Price: 10.00,  Country_Code: "AE" },
  { Service_Code: "VAS-TRK-AE",  Service_Name: "Courier Tracking",        Service_Type: "VAS", Currency_Code: "AED", Unit_Price: 40.00,  Country_Code: "AE" },
];

export const paymentModes: PaymentMode[] = [
  { Payment_Code: "PM-CASH-INR",  Payment_Name: "Cash",                  Currency_Code: "INR" },
  { Payment_Code: "PM-CARD-INR",  Payment_Name: "Debit / Credit Card",   Currency_Code: "INR" },
  { Payment_Code: "PM-UPI-INR",   Payment_Name: "UPI / QR Code",         Currency_Code: "INR" },
  { Payment_Code: "PM-DD-INR",    Payment_Name: "Demand Draft",          Currency_Code: "INR" },
  { Payment_Code: "PM-CASH-USD",  Payment_Name: "Cash (USD)",            Currency_Code: "USD" },
  { Payment_Code: "PM-CARD-USD",  Payment_Name: "Credit / Debit Card",   Currency_Code: "USD" },
  { Payment_Code: "PM-CASH-EUR",  Payment_Name: "Cash (EUR)",            Currency_Code: "EUR" },
  { Payment_Code: "PM-CARD-EUR",  Payment_Name: "Credit / Debit Card",   Currency_Code: "EUR" },
  { Payment_Code: "PM-CASH-GBP",  Payment_Name: "Cash (GBP)",            Currency_Code: "GBP" },
  { Payment_Code: "PM-CARD-GBP",  Payment_Name: "Credit / Debit Card",   Currency_Code: "GBP" },
  { Payment_Code: "PM-CASH-AED",  Payment_Name: "Cash (AED)",            Currency_Code: "AED" },
  { Payment_Code: "PM-CARD-AED",  Payment_Name: "Credit / Debit Card",   Currency_Code: "AED" },
];
