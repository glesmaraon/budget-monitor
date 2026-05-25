import React,{useEffect,useState} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [records,setRecords]=useState([]);

const [income,setIncome]=useState("");
const [savingGoal,setSavingGoal]=useState("");

const [loanType,setLoanType]=
useState("Student Loan");

const [loan,setLoan]=
useState("");

const [expense,setExpense]=
useState("");

const [category,setCategory]=
useState("Transportation");

const [description,setDescription]=
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

time:
new Date()
.toLocaleTimeString(),

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



function downloadSpreadsheet(){

if(records.length===0){

alert(
"No records to export"
);

return;

}


const rows=[

[
"Date",
"Time",
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

item.time,

item.category,

item.expense,

item.description,

loanType,

balance

]);

});


const sheet=

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
sheet,
"Financial"

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



function recommendation(){

if(balance<0){

return
"⚠ Overspending detected. Reduce optional spending.";

}

if(

Number(loan)

>

Number(income)*0.5

){

return
"📉 Loan burden is affecting future savings.";

}

if(records.length>5){

return
"📈 Spending pattern stable. Savings target remains achievable.";

}

return
"Collect more daily data for stronger forecasting.";

}



const confidence=

records.length>10

?95

:records.length>5

?88

:70;



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
color:"white",
padding:"30px",
borderRadius:"20px"
}}
>

<h1>

💰 AI Financial Companion

</h1>

<p>

Personal Budget & Expense Monitoring System

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

].map(

(card,index)=>(

<div
key={index}
style={{

background:"white",

padding:"25px",

borderRadius:"18px",

boxShadow:
"0 4px 12px rgba(0,0,0,.08)"

}}
>

<h3>

{card.title}

</h3>

<h1>

{card.value}

</h1>

</div>

)

)

}

</div>



<div
style={{
background:"white",
padding:"25px",
marginTop:"25px",
borderRadius:"18px",
boxShadow:
"0 4px 12px rgba(0,0,0,.08)"
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
)

}

style={{
margin:"5px"
}}

/>


<input

type="number"

placeholder=
"Savings Goal"

value=
{savingGoal}

onChange={(e)=>

setSavingGoal(
e.target.value
)

}

style={{
margin:"5px"
}}

/>


<br/><br/>


<select

value={loanType}

onChange={(e)=>

setLoanType(
e.target.value
)

}

>

<option>
Student Loan
</option>

<option>
Credit Card
</option>

<option>
Personal Loan
</option>

<option>
Mortgage
</option>

<option>
Car Loan
</option>

<option>
Family Loan
</option>

<option>
Other
</option>

</select>


<input

type="number"

placeholder=
"Loan Amount"

value=
{loan}

onChange={(e)=>

setLoan(
e.target.value
)

}

/>


<br/><br/>


<select

value={category}

onChange={(e)=>

setCategory(
e.target.value
)

}

>

<option>
Transportation
</option>

<option>
Food
</option>

<option>
Bills
</option>

<option>
Travel
</option>

<option>
Shopping
</option>

</select>


<input

type="number"

placeholder=
"Expense (£)"

value=
{expense}

onChange={(e)=>

setExpense(
e.target.value
)

}

/>


<input

placeholder=
"Description"

value=
{description}

onChange={(e)=>

setDescription(
e.target.value
)

}

/>


<button
onClick={addExpense}
style={{
marginLeft:"10px"
}}
>

Add Expense

</button>

</div>



<div
style={{
background:"white",
padding:"25px",
marginTop:"25px",
borderRadius:"18px",
boxShadow:
"0 4px 12px rgba(0,0,0,.08)"
}}
>

<h2>

🤖 Forecast & Recommendation

</h2>

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
borderRadius:"18px",
boxShadow:
"0 4px 12px rgba(0,0,0,.08)"
}}
>

<h2>

📄 Daily Spend Records

</h2>


<button

onClick={downloadSpreadsheet}

style={{
marginBottom:"15px"
}}

>

⬇ Download Spreadsheet

</button>


<table
width="100%"
border="1"
cellPadding="10"
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
