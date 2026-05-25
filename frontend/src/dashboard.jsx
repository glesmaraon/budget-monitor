import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [transactions,setTransactions]=useState([]);

const [selectedDate,setSelectedDate]=useState(
new Date().toISOString().split("T")[0]
);

const [income,setIncome]=useState("");
const [incomeType,setIncomeType]=useState("Salary");

const [category,setCategory]=useState("Transportation");
const [expense,setExpense]=useState("");

const [loanType,setLoanType]=useState("Student Loan");
const [loanAmount,setLoanAmount]=useState("");

const [savingGoal,setSavingGoal]=useState("");
const [description,setDescription]=useState("");

useEffect(()=>{

const saved=
localStorage.getItem(
"ai_transactions"
);

if(saved){

setTransactions(
JSON.parse(saved)
);

}

},[]);



function addTransaction(){

const record={

id:Date.now(),

date:selectedDate,

income:Number(
income||0
),

incomeType,

category,

expense:Number(
expense||0
),

loan:Number(
loanAmount||0
),

loanType,

goal:Number(
savingGoal||0
),

description

};


const updated=[

record,
...transactions

];


setTransactions(
updated
);

localStorage.setItem(

"ai_transactions",

JSON.stringify(
updated
)

);


setExpense("");
setDescription("");

}



const totalIncome=

transactions.reduce(

(sum,t)=>

sum+
t.income

,0);


const totalExpenses=

transactions.reduce(

(sum,t)=>

sum+
t.expense

,0);



const totalLoan=

transactions.reduce(

(sum,t)=>

sum+
t.loan

,0);


const balance=

totalIncome-
totalExpenses-
totalLoan;


const avg=

transactions.length

?

totalExpenses/
transactions.length

:0;


const projected=

Math.round(
avg*30
);


const confidence=

transactions.length>20

?95

:transactions.length>10

?90

:transactions.length>5

?82

:65;


let recommendation="";

if(balance<0){

recommendation=
"Reduce daily spending by £5";

}

else if(

projected>

totalIncome*.8

){

recommendation=
"Reduce optional spending.";

}

else{

recommendation=
"Current spending pattern sustainable";

}


const months=

savingGoal && balance>0

?

Math.ceil(
savingGoal/
balance
)

:

"Unknown";



function exportExcel(){

const rows=[

[
"Date",
"Income",
"Expense",
"Loan",
"Category",
"Description"
]

];


transactions.forEach(t=>{

rows.push([

t.date,
t.income,
t.expense,
t.loan,
t.category,
t.description

]);

});


const ws=
XLSX.utils.aoa_to_sheet(
rows
);

const wb=
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Transactions"
);

XLSX.writeFile(
wb,
"Transactions_Report.xlsx"
);

}



const input={

width:"100%",
padding:"15px",
border:"1px solid #ddd",
borderRadius:"18px",
fontSize:"16px",
marginTop:"10px"

};



return(

<div style={{
background:"#F4F6FB",
padding:"30px",
minHeight:"100vh",
fontFamily:"Arial"
}}>

<div style={{
background:"#081326",
padding:"35px",
borderRadius:"25px",
color:"white"
}}>

<h1>
🤖 AI Saving Companion
</h1>

<p>
Track • Analyze • Predict • Improve
</p>

</div>



<div style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px",
marginTop:"25px"
}}
>

{[

{
title:"💼 Income",
value:`£${totalIncome}`
},

{
title:"💸 Expenses",
value:`£${totalExpenses}`
},

{
title:"🏦 Loan",
value:`£${totalLoan}`
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
padding:"30px",
borderRadius:"25px",
boxShadow:
"0 4px 10px rgba(0,0,0,.08)"
}}
>

<h2>
{card.title}
</h2>

<h1>
{card.value}
</h1>

</div>

))

}

</div>



<div style={{
background:"white",
padding:"30px",
marginTop:"30px",
borderRadius:"25px"
}}
>

<h1>
⚡ Daily Transaction Entry
</h1>


<div style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px"
}}
>


<div>

<h3>💼 Income</h3>

<input
placeholder="Base Income (£)"
value={income}
onChange={(e)=>
setIncome(
e.target.value
)}
style={input}
/>


<select
value={incomeType}
onChange={(e)=>
setIncomeType(
e.target.value
)}
style={input}
>

<option>Salary</option>
<option>Project</option>
<option>Allowance</option>

</select>

</div>



<div>

<h3>💸 Expenses</h3>

<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)}
style={input}
>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Shopping</option>

</select>


<input
placeholder="Expense (£)"
value={expense}
onChange={(e)=>
setExpense(
e.target.value
)}
style={input}
/>

</div>



<div>

<h3>🏦 Loan</h3>

<select
value={loanType}
onChange={(e)=>
setLoanType(
e.target.value
)}
style={input}
>

<option>Student Loan</option>
<option>Mortgage</option>
<option>Credit Card</option>

</select>


<input
placeholder="Loan (£)"
value={loanAmount}
onChange={(e)=>
setLoanAmount(
e.target.value
)}
style={input}
/>

</div>



<div>

<h3>💰 Goal</h3>

<input
placeholder="Savings Goal (£)"
value={savingGoal}
onChange={(e)=>
setSavingGoal(
e.target.value
)}
style={input}
/>


<input
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)}
style={input}
/>

</div>

</div>



<div style={{
display:"flex",
gap:"20px",
marginTop:"25px"
}}
>

<input
type="date"
value={selectedDate}
onChange={(e)=>
setSelectedDate(
e.target.value
)}
style={{
...input,
flex:1
}}
/>


<button
onClick={addTransaction}
style={{
background:"#081326",
color:"white",
border:"none",
padding:"15px 45px",
borderRadius:"20px",
cursor:"pointer",
fontWeight:"bold"
}}
>

+ Add Transaction

</button>

</div>

</div>



<div style={{
background:"#081326",
color:"white",
padding:"30px",
marginTop:"30px",
borderRadius:"25px"
}}
>

<h2>
🤖 AI Forecast & Recommendation
</h2>

<p>
Trend:
Expenses increasing from recent activity
</p>

<p>
Prediction:
Projected monthly spending £{projected}
</p>

<p>
Recommendation:
{recommendation}
</p>

<p>
Savings Goal:
{
months==="Unknown"

?

"Need more history"

:

`Estimated completion ${months} months`
}
</p>

<p>
AI Confidence:
{confidence}%
</p>

</div>



<div style={{
background:"white",
padding:"25px",
marginTop:"30px",
borderRadius:"25px"
}}
>

<button
onClick={exportExcel}
>

⬇ Download Report

</button>

<table
width="100%"
cellPadding="10"
style={{
marginTop:"20px"
}}
>

<thead>

<tr>

<th>Date</th>
<th>Expense</th>
<th>Category</th>
<th>Description</th>

</tr>

</thead>

<tbody>

{

transactions.length===0

?

<tr>

<td colSpan="4">

No records

</td>

</tr>

:

transactions.map(t=>(

<tr key={t.id}>

<td>{t.date}</td>
<td>£{t.expense}</td>
<td>{t.category}</td>
<td>{t.description}</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}
