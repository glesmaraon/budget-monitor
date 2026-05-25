import React, { useEffect, useMemo, useState } from "react";

export default function Dashboard() {

const [tab,setTab]=useState("Home");

const [goal,setGoal]=useState(2400);

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

useEffect(()=>{

const saved=
localStorage.getItem(
"transactions"
);

if(saved){

setRecords(
JSON.parse(saved)
);

}

},[]);

useEffect(()=>{

localStorage.setItem(
"transactions",
JSON.stringify(records)
);

},[records]);

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
"Bonus",
"Freelance",
"Other"
],

Savings:[
"Emergency Fund",
"Travel",
"Investment",
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

if(
!category||
!amount
)return;

const finalCategory=

category==="Other"

?customCategory

:category;

const item={

type,

category:
finalCategory,

amount:
Number(amount),

date,

time

};

setRecords([
...records,
item
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

const monthlyGoal=
Math.round(
goal/12
);

const predictedYear=

totals.savings*12;

const achievement=

Math.min(
100,
Math.round(
(predictedYear/
goal)*100
)
);

const validation=
records.length;

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

const weeklySpend=
Math.round(
totals.expense/4
);

const savingsRate=

totals.income

?

Math.round(

(
totals.savings/
totals.income
)*100
)

:0;

const netBalance=

totals.income-
totals.expense;

const aiCoach=

achievement<50

?

`You may miss your yearly goal.
Reduce spending by £${Math.max(
1,
Math.round(
(monthlyGoal-
totals.savings)/30
)
)}/day.`

:

"You're progressing well 🎉";

function downloadReport(){

const report=

records.map(

x=>

`${x.date},

${x.time},

${x.type},

${x.category},

£${x.amount}`

).join("\n");

const blob=
new Blob(
[report],
{type:"text/plain"}
);

const a=
document.createElement("a");

a.href=
URL.createObjectURL(
blob
);

a.download=
"Transactions_Report.txt";

a.click();

}

function renderTable(name){

const data=
records.filter(
x=>x.type===name
);

return(

<div
style={{
background:"white",
padding:"20px",
borderRadius:"15px",
boxShadow:
"0 2px 10px lightgray",
marginBottom:"20px"
}}
>

<h3>
{name}
Records
</h3>

<table
width="100%"
border="1"
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

{data.map(
(item,index)=>

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

)}

</tbody>

</table>

</div>

)

}

return(

<div style={{

padding:"30px",

background:"#f5f8fc",

minHeight:"100vh",

fontFamily:"Arial"

}}>

<h1>
💰 Personal Financial Monitoring
</h1>

<p>
Track smarter with AI guidance
</p>

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

{tab==="Home"&&(

<>

<div
style={{
display:"flex",
gap:"20px",
flexWrap:"wrap"
}}
>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
flex:"1"
}}>

💵 Income

<h2>
£{totals.income}
</h2>

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
flex:"1"
}}>

📉 Expenses

<h2>
£{totals.expense}
</h2>

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
flex:"1"
}}>

💰 Savings

<h2>
£{totals.savings}
</h2>

</div>

</div>

<br/>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px"
}}>

<h2>
⚡ Quick Entry
</h2>

<input
type="number"
placeholder="Savings Goal / Year (£)"
value={goal}
onChange={(e)=>
setGoal(
e.target.value
)}
/>

<br/><br/>

<select
value={type}
onChange={(e)=>{

setType(
e.target.value
);

setCategory("");

}}
>

<option>Expense</option>

<option>Income</option>

<option>Savings</option>

<option>Loan</option>

</select>

<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)}
>

<option>
Select Category
</option>

{
categories[type]
.map(
x=>

<option key={x}>
{x}
</option>
)

}

</select>

{category==="Other"&&(

<input
placeholder="Other"
value={customCategory}
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
placeholder="Amount £"
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

</div>

<br/>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px"
}}>

<h2>
🤖 AI Prediction Analysis
</h2>

<p>
Goal Achievement:
{achievement}%
</p>

<p>
Predicted Year-End:
£{predictedYear}
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
AI Coach:
{aiCoach}
</p>

</div>

<br/>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px"
}}>

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

</div>

<br/>

<button
onClick={
downloadReport
}
>

⬇ Download Report

</button>

</>

)}

{tab==="Summary"&&(

<>

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
