import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [records,setRecords]=useState([]);

const [income,setIncome]=useState("");
const [expense,setExpense]=useState("");

const [category,setCategory]=
useState("Transportation");

const [description,setDescription]=
useState("");

const [loanType,setLoanType]=
useState("Student Loan");

const [loan,setLoan]=
useState("");

const [savingGoal,setSavingGoal]=
useState("");

useEffect(()=>{

const saved=

localStorage.getItem(
"finance_records"
);

if(saved){

setRecords(
JSON.parse(saved)
);

}

},[]);



function addExpense(){

if(!expense)return;

const item={

id:Date.now(),

date:
new Date()
.toLocaleDateString(),

category,

expense:
Number(expense),

description

};

const updated=[
...records,
item
];

setRecords(updated);

localStorage.setItem(

"finance_records",

JSON.stringify(
updated
)

);

setExpense("");
setDescription("");

}



function downloadReport(){

const rows=[

[
"Date",
"Category",
"Expense",
"Description",
"Loan Type",
"Balance"
]

];

records.forEach(item=>{

rows.push([

item.date,

item.category,

item.expense,

item.description,

loanType,

balance

]);

});


const worksheet=

XLSX.utils
.aoa_to_sheet(
rows
);

const workbook=

XLSX.utils
.book_new();

XLSX.utils
.book_append_sheet(

workbook,

worksheet,

"Financial Report"

);

XLSX.writeFile(

workbook,

"Financial_Report.xlsx"

);

}



const totalExpenses=

records.reduce(

(sum,r)=>

sum+
Number(
r.expense||0
),

0

);


const balance=

Number(
income||0
)

-

totalExpenses

-

Number(
loan||0
);



const recommendation=()=>{

if(balance<0){

return
"⚠ Overspending detected. Reduce optional expenses and prioritize essentials.";

}

if(

Number(loan)

>

Number(income)*0.5

){

return
"📉 Loan burden may affect future savings. Focus on repayments.";

}

if(records.length>5){

return
"📈 Spending trend stable. Savings goal achievable if pattern continues.";

}

return
"Add more daily spending data for stronger AI forecasting.";

};



return(

<div
style={{
background:"#f4f7fb",
minHeight:"100vh",
padding:"30px",
fontFamily:"Arial"
}}
>

<div
style={{
background:"#111827",
padding:"30px",
borderRadius:"20px",
color:"white"
}}
>

<h1>
💰 AI Financial Companion
</h1>

<p>
Simple financial dashboard + forecasting
</p>

</div>


<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginTop:"20px"

}}
>

{[

{
title:"💼 Income",
value:`£${income||0}`
},

{
title:"💸 Expenses",
value:`£${totalExpenses}`
},

{
title:"🏦 Loan",
value:`£${loan||0}`
},

{
title:"💰 Balance",
value:`£${balance}`
}

].map((card,i)=>(

<div
key={i}
style={{
background:"white",
padding:"25px",
borderRadius:"18px",
boxShadow:
"0 4px 10px rgba(0,0,0,.08)"
}}
>

<h3>{card.title}</h3>

<h1>{card.value}</h1>

</div>

))

}

</div>


<div
style={{
background:"white",
padding:"25px",
borderRadius:"18px",
marginTop:"20px"
}}
>

<h2>
⚡ Daily Tracker
</h2>

<input
type="number"
placeholder="Income (£)"
value={income}
onChange={(e)=>
setIncome(
e.target.value
)}
/>

<input
type="number"
placeholder="Savings Goal"
value={savingGoal}
onChange={(e)=>
setSavingGoal(
e.target.value
)}
/>

<br/><br/>

<select
value={loanType}
onChange={(e)=>
setLoanType(
e.target.value
)}
>

<option>Student Loan</option>
<option>Credit Card</option>
<option>Personal Loan</option>
<option>Mortgage</option>
<option>Car Loan</option>
<option>Family Loan</option>

</select>

<input
type="number"
placeholder="Loan Amount"
value={loan}
onChange={(e)=>
setLoan(
e.target.value
)}
/>

<br/><br/>

<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)}
>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Travel</option>
<option>Shopping</option>

</select>

<input
type="number"
placeholder="Expense (£)"
value={expense}
onChange={(e)=>
setExpense(
e.target.value
)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)}
/>

<button
onClick={addExpense}
>

Add Expense

</button>

</div>


<div
style={{
background:"white",
padding:"25px",
marginTop:"20px",
borderRadius:"18px"
}}
>

<h2>
🤖 Forecast & Recommendation
</h2>

<p>

{recommendation()}

</p>

</div>


<div
style={{
background:"white",
padding:"25px",
marginTop:"20px",
borderRadius:"18px"
}}
>

<button
onClick={downloadReport}
>

⬇ Download Spreadsheet

</button>

</div>

</div>

)

}
