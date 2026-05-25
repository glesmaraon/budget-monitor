import React,{useEffect,useState} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [records,setRecords]=useState([]);

const [income,setIncome]=useState("");
const [savingGoal,setSavingGoal]=useState("");

const [loanType,setLoanType]=useState("Student Loan");
const [loan,setLoan]=useState("");

const [expense,setExpense]=useState("");
const [category,setCategory]=useState("Transportation");
const [description,setDescription]=useState("");


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

expense:
Number(expense),

category,

description

};

const updated=[
...records,
item
];

setRecords(updated);

localStorage.setItem(
"finance_records",
JSON.stringify(updated)
);

setExpense("");
setDescription("");

}



const totalExpenses=

records.reduce(
(sum,item)=>
sum+
item.expense
,0
);



const balance=

Number(income||0)

-

totalExpenses

-

Number(loan||0);



function recommendation(){

if(balance<0){

return "⚠ High spending detected. Reduce optional purchases and transportation costs.";

}

if(

Number(loan)
>

Number(income)*0.5

){

return "📉 Loan burden is high. Focus on reducing debt before increasing savings.";

}

if(

savingGoal>

income

){

return "🎯 Savings target may be unrealistic based on current cashflow.";

}

if(records.length>5){

return "📈 Spending behavior looks stable. Continue daily monitoring.";

}

return "Collect more daily records for stronger forecasting.";

}



function forecast(){

if(records.length===0){

return "No prediction yet";

}

const average=

totalExpenses
/
records.length;


const future=

Math.round(
average*30
);


return `Predicted monthly spending: £${future}`;

}



const confidence=

records.length>15

?96

:records.length>8

?90

:75;



function downloadSpreadsheet(){

const rows=[

[
"Date",
"Category",
"Expense",
"Description",
"Loan Type",
"Balance",
"Forecast"
]

];


records.forEach(

item=>{

rows.push([

item.date,

item.category,

item.expense,

item.description,

loanType,

balance,

forecast()

])

}

);


const ws=

XLSX.utils
.aoa_to_sheet(rows);

const wb=
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Financial Report"
);

XLSX.writeFile(
wb,
"Financial_Report.xlsx"
);

}



return(

<div
style={{
background:"#F3F6FB",
minHeight:"100vh",
padding:"30px",
fontFamily:"Arial"
}}
>

<div
style={{
background:"#111827",
padding:"35px",
borderRadius:"20px",
color:"white"
}}
>

<h1>

💰 AI Financial Companion

</h1>

<p>

Smart Budget Monitoring Platform

</p>

</div>



<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginTop:"25px"
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
borderRadius:"20px",
boxShadow:
"0 4px 15px rgba(0,0,0,.08)"
}}
>

<h3>

{card.title}

</h3>

<h1>

{card.value}

</h1>

</div>

))

}

</div>



<div
style={{
background:"white",
padding:"30px",
marginTop:"25px",
borderRadius:"20px"
}}
>

<h2>

⚡ Daily Tracker

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap:"15px"
}}
>

<input
type="number"
placeholder="Income (£)"
value={income}
onChange={(e)=>setIncome(e.target.value)}
/>

<input
type="number"
placeholder="Savings Goal (£)"
value={savingGoal}
onChange={(e)=>setSavingGoal(e.target.value)}
/>

<select
value={loanType}
onChange={(e)=>setLoanType(e.target.value)}
>

<option>Student Loan</option>
<option>Credit Card</option>
<option>Personal Loan</option>
<option>Mortgage</option>
<option>Car Loan</option>
<option>Family Loan</option>
<option>Other</option>

</select>

<input
type="number"
placeholder="Loan Amount"
value={loan}
onChange={(e)=>setLoan(e.target.value)}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
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
onChange={(e)=>setExpense(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button
onClick={addExpense}
style={{
background:"#111827",
color:"white",
border:"none",
borderRadius:"10px"
}}
>

+ Add Expense

</button>

</div>

</div>



<div
style={{
background:"white",
padding:"25px",
marginTop:"25px",
borderRadius:"20px"
}}
>

<h2>

🤖 Forecasting & Recommendation

</h2>

<p>

{forecast()}

</p>

<p>

{recommendation()}

</p>

<p>

Confidence:
{confidence}%

</p>

</div>



<div
style={{
background:"white",
padding:"25px",
marginTop:"25px",
borderRadius:"20px"
}}
>

<button
onClick={downloadSpreadsheet}
>

⬇ Download Spreadsheet

</button>


<table
width="100%"
border="1"
cellPadding="8"
style={{
marginTop:"15px"
}}
>

<thead>

<tr>

<th>Date</th>

<th>Category</th>

<th>Expense</th>

<th>Description</th>

</tr>

</thead>

<tbody>

{

records.length===0

?

<tr>

<td
colSpan="4"
>

No records available

</td>

</tr>

:

records.map(

item=>(

<tr
key={item.id}
>

<td>
{item.date}
</td>

<td>
{item.category}
</td>

<td>
£{item.expense}
</td>

<td>
{item.description}
</td>

</tr>

)

)

}

</tbody>

</table>

</div>

</div>

)

}
