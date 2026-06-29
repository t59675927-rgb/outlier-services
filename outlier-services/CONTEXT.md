


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