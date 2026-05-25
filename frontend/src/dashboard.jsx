import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [transactions,setTransactions]=useState([]);

const today=
new Date()
.toISOString()
.split("T")[0];

const [date,setDate]=useState(today);

const [income,setIncome]=useState("");
const [incomeType,setIncomeType]=useState("Salary");

const [expense,setExpense]=useState("");
const [category,setCategory]=useState("Transportation");

const [loan,setLoan]=useState("");
const [loanType,setLoanType]=useState("Student Loan");

const [goal,setGoal]=useState("");
const [description,setDescription]=useState("");


useEffect(()=>{

const saved=
localStorage.getItem(
"ai_finance_records"
);

if(saved){

setTransactions(
JSON.parse(saved)
);

}

},[]);



function addTransaction(){

const item={

id:Date.now(),

date,

income:Number(income||0),
incomeType,

expense:Number(expense||0),
category,

loan:Number(loan||0),
loanType,

goal:Number(goal||0),

description

};

const updated=[
item,
...transactions
];

setTransactions(updated);

localStorage.setItem(
"ai_finance_records",
JSON.stringify(updated)
);

setIncome("");
setExpense("");
setLoan("");
setDescription("");

}



const totalIncome=

transactions.reduce(
(a,b)=>a+b.income,
0
);


const totalExpenses=

transactions.reduce(
(a,b)=>a+b.expense,
0
);


const totalLoan=

transactions.reduce(
(a,b)=>a+b.loan,
0
);


const balance=

totalIncome-
totalExpenses-
totalLoan;



const avgSpend=

transactions.length

?

totalExpenses/
transactions.length

:0;



const projected=

Math.round(
avgSpend*30
);



const confidence=

transactions.length>20
?95
:transactions.length>10
?90
:transactions.length>5
?82
:60;



let trend="";

if(
transactions.length<3
){

trend=
"Learning spending behavior";

}else if(
projected>
(totalIncome*.7)
){

trend=
"Expenses increasing from recent activity";

}else{

trend=
"Stable spending pattern detected";

}



let recommendation="";

if(balance<0){

recommendation=
"Reduce daily spending by £5";

}

else if(
projected>
(totalIncome*.8)
){

recommendation=
"Reduce transport and optional spending";

}

else{

recommendation=
"Current financial pattern is healthy";

}



const months=

goal && balance>0

?

Math.ceil(
goal/
balance
)

:"Need more data";



function exportExcel(){

const rows=[

[
"Date",
"Income",
"Income Type",
"Expense",
"Category",
"Loan",
"Loan Type",
"Savings Goal",
"Description"
]

];


transactions.forEach(t=>{

rows.push([

t.date,
t.income,
t.incomeType,
t.expense,
t.category,
t.loan,
t.loanType,
t.goal,
t.description

]);

});


const ws=
XLSX.utils
.aoa_to_sheet(rows);

const wb=
XLSX.utils
.book_new();

XLSX.utils
.book_append_sheet(
wb,
ws,
"Transactions"
);

XLSX.writeFile(
wb,
"AI_Financial_Report.xlsx"
);

}



const input={

width:"100%",
padding:"15px",
border:"1px solid #ddd",
borderRadius:"15px",
marginTop:"10px",
fontSize:"15px"

};



return(

<div
style={{
background:"#F3F6FB",
padding:"30px",
minHeight:"100vh",
fontFamily:"Arial"
}}
>

<div
style={{
background:"#07152D",
padding:"40px",
borderRadius:"25px",
color:"white"
}}
>

<h1>
🤖 AI Saving Companion
</h1>

<p>
Track • Analyze • Predict • Improve
</p>

</div>



<div
style={{
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
"0 4px 12px rgba(0,0,0,.08)"
}}
>

<h2>{card.title}</h2>
<h1>{card.value}</h1>

</div>

))

}

</div>



<div
style={{
background:"white",
padding:"30px",
marginTop:"30px",
borderRadius:"25px"
}}
>

<h1>
⚡ Daily Transaction Entry
</h1>


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px"
}}
>

<div>

<h3>💼 Income</h3>

<input
placeholder="Income (£)"
value={income}
onChange={(e)=>setIncome(e.target.value)}
style={input}
/>

<select
value={incomeType}
onChange={(e)=>setIncomeType(e.target.value)}
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
onChange={(e)=>setCategory(e.target.value)}
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
onChange={(e)=>setExpense(e.target.value)}
style={input}
/>

</div>



<div>

<h3>🏦 Loan</h3>

<select
value={loanType}
onChange={(e)=>setLoanType(e.target.value)}
style={input}
>

<option>Student Loan</option>
<option>Mortgage</option>
<option>Credit Card</option>

</select>


<input
placeholder="Loan (£)"
value={loan}
onChange={(e)=>setLoan(e.target.value)}
style={input}
/>

</div>



<div>

<h3>💰 Goal</h3>

<input
placeholder="Savings Goal (£)"
value={goal}
onChange={(e)=>setGoal(e.target.value)}
style={input}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={input}
/>

</div>

</div>



<div
style={{
display:"flex",
gap:"20px",
marginTop:"25px"
}}
>

<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
style={{
...input,
flex:1
}}
/>


<button
onClick={addTransaction}
style={{
background:"#07152D",
color:"white",
padding:"15px 50px",
border:"none",
borderRadius:"20px",
cursor:"pointer",
fontWeight:"bold"
}}
>

+ Add Transaction

</button>

</div>

</div>



<div
style={{
background:"#07152D",
color:"white",
padding:"30px",
borderRadius:"25px",
marginTop:"30px"
}}
>

<h2>
🤖 AI Forecast & Recommendation
</h2>

<p><b>Trend:</b><br/>{trend}</p>

<p><b>Prediction:</b><br/>
Projected monthly spending £{projected}
</p>

<p><b>Recommendation:</b><br/>
{recommendation}
</p>

<p><b>Savings Goal:</b><br/>
Estimated completion: {months}
</p>

<p><b>AI Confidence:</b><br/>
{confidence}%
</p>

</div>



<div
style={{
background:"white",
padding:"25px",
borderRadius:"25px",
marginTop:"30px"
}}
>

<button
onClick={exportExcel}
style={{
background:"#0F766E",
color:"white",
padding:"12px 20px",
border:"none",
borderRadius:"10px"
}}
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
<th>Income</th>
<th>Expense</th>
<th>Loan</th>
<th>Goal</th>
<th>Category</th>
<th>Description</th>

</tr>

</thead>


<tbody>

{
transactions.length===0

?

<tr>

<td colSpan="7">

No records available

</td>

</tr>

:

transactions.map(t=>(

<tr key={t.id}>

<td>{t.date}</td>
<td>£{t.income}</td>
<td>£{t.expense}</td>
<td>£{t.loan}</td>
<td>£{t.goal}</td>
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
