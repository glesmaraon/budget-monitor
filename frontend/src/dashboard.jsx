import React, { useMemo, useState } from "react";

export default function Dashboard() {

const [tab,setTab]=useState("Home");

const [type,setType]=useState("Expense");

const [category,setCategory]=useState("");

const [customCategory,setCustomCategory]=useState("");

const [amount,setAmount]=useState("");

const [date,setDate]=useState(
new Date().toISOString().slice(0,10)
);

const [time,setTime]=useState(
new Date().toTimeString().slice(0,5)
);

const [records,setRecords]=useState([]);

const categories={

Expense:[
"Food",
"Transportation",
"Bills",
"Shopping",
"Health",
"Education",
"Entertainment",
"Other"
],

Income:[
"Salary",
"Allowance",
"Freelance",
"Bonus",
"Other"
],

Savings:[
"Emergency Fund",
"Investment",
"Travel",
"Other"
],

Loan:[
"Personal Loan",
"Credit Card",
"Mortgage",
"Other"
]

};

function addTransaction(){

if(!category || !amount)
return;

const finalCategory=

category==="Other"

?customCategory

:category;

setRecords([
...records,
{

type,

category:finalCategory,

amount:Number(amount),

date,

time

}

]);

setCategory("");
setCustomCategory("");
setAmount("");

}

const totals=useMemo(()=>{

return{

income:
records
.filter(
x=>x.type==="Income"
)
.reduce(
(a,b)=>a+b.amount,
0
),

expense:
records
.filter(
x=>x.type==="Expense"
)
.reduce(
(a,b)=>a+b.amount,
0
),

savings:
records
.filter(
x=>x.type==="Savings"
)
.reduce(
(a,b)=>a+b.amount,
0
),

loan:
records
.filter(
x=>x.type==="Loan"
)
.reduce(
(a,b)=>a+b.amount,
0
)

}

},[records]);

const validation=
records.length;

const health=
Math.max(
0,
Math.min(
100,

Math.round(
(
(totals.income-
totals.expense)
/
(totals.income||1)
)*100
)
)
);

const confidence=

validation>=20

?90

:validation>=10

?80

:60;

const reality=

validation>=20

?85

:70;

const predicted=

totals.income-

totals.expense+

totals.savings;

const savingsRate=

totals.income

?

Math.round(

(totals.savings/

totals.income)

*100

)

:0;

const weeklySpend=

Math.round(
totals.expense/4
);

const netBalance=

totals.income-

totals.expense;

const topCategory=

records.length

?

records[records.length-1]
.category

:"No data";

const aiCoach=

predicted<100

?"Save £5/day to improve monthly outcome"

:"Great progress. Continue consistency 🎉";

function downloadReport(){

const report=`

GLIZA FINANCIAL REPORT

Income:
£${totals.income}

Expense:
£${totals.expense}

Savings:
£${totals.savings}

Loan:
£${totals.loan}

Health:
${health}/100

Confidence:
${confidence}%

Reality:
${reality}%

Prediction:
£${predicted}

Transactions:
${validation}

`;

const blob=
new Blob(
[report],
{
type:"text/plain"
}
);

const link=
document.createElement("a");

link.href=
URL.createObjectURL(blob);

link.download=
"Financial_Report.txt";

link.click();

}

function renderTable(name){

const data=
records.filter(
x=>x.type===name
);

return(

<>

<h3>
{name}
Records
</h3>

<table
border="1"
width="100%"
cellPadding="8"
>

<thead>

<tr>

<th>Date</th>
<th>Time</th>
<th>Category</th>
<th>£</th>

</tr>

</thead>

<tbody>

{

data.map(
(item,index)=>(

<tr key={index}>

<td>
{item.date}
</td>

<td>
{item.time}
</td>

<td>
{item.category}
</td>

<td>
£{item.amount}
</td>

</tr>

))

}

</tbody>

</table>

<br/>

</>

)

}

return(

<div style={{

maxWidth:"1200px",

margin:"auto",

padding:"30px",

fontFamily:"Arial"

}}>

<h1>
💰 Financial Monitoring System
</h1>

<button
onClick={()=>
setTab("Home")
}
>

Home

</button>

<button
onClick={()=>
setTab("Summary")
}
>

Summary

</button>

<hr/>

{tab==="Home" && (

<>

<h2>
⚡ Quick Entry
</h2>

<select
value={type}
onChange={(e)=>{

setType(
e.target.value
);

setCategory("");

}}
>

<option>
Expense
</option>

<option>
Income
</option>

<option>
Savings
</option>

<option>
Loan
</option>

</select>

<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)
}
>

<option>
Select Category
</option>

{
categories[type]
.map(x=>

<option
key={x}
>

{x}

</option>

)

}

</select>

{category==="Other"&&(

<input

placeholder=
"Other"

value=
{customCategory}

onChange={(e)=>

setCustomCategory(
e.target.value
)}

 />

)}

<input
type="date"
value={date}
onChange={(e)=>
setDate(
e.target.value
)}
/>

<input
type="time"
value={time}
onChange={(e)=>
setTime(
e.target.value
)}
/>

<input
type="number"
placeholder="£"
value={amount}
onChange={(e)=>
setAmount(
e.target.value
)}
/>

<button
onClick={
addTransaction
}
>

Add

</button>

<hr/>

<h2>
🤖 AI Prediction Analysis
</h2>

<p>
Health:
{health}/100
</p>

<p>
Success:
{health}%
</p>

<p>
AI Confidence:
{confidence}%
</p>

<p>
Reality:
{reality}%
</p>

<p>
Validation:
{validation}
transactions
</p>

<p>

Prediction:

£{predicted}

next 30 days

</p>

<p>

AI Coach:

{aiCoach}

</p>

<hr/>

<h2>
📈 Trends
</h2>

<p>
Weekly Spend:
£{weeklySpend}
</p>

<p>
Savings Rate:
{savingsRate}%
</p>

<p>
Net Balance:
£{netBalance}
</p>

<p>
Top Category:
{topCategory}
</p>

<hr/>

<button
onClick={
downloadReport
}
>

⬇ Download Report

</button>

</>

)}

{tab==="Summary" && (

<>

<h2>
📊 Dashboard Summary
</h2>

<p>
Income:
£{totals.income}
</p>

<p>
Expense:
£{totals.expense}
</p>

<p>
Savings:
£{totals.savings}
</p>

<p>
Loan:
£{totals.loan}
</p>

<hr/>

{renderTable(
"Expense"
)}

{renderTable(
"Income"
)}

{renderTable(
"Savings"
)}

{renderTable(
"Loan"
)}

</>

)}

</div>

)

}
