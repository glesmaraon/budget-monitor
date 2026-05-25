import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const today=
new Date()
.toISOString()
.split("T")[0];

const [transactions,setTransactions]=useState([]);

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
"finance_diary"
);

if(saved){

setTransactions(
JSON.parse(saved)
);

}

},[]);



function addTransaction(){

let type="";
let amount=0;
let label="";


if(Number(income)>0){

type="Income";
amount=Number(income);
label=incomeType;

}

else if(
Number(expense)>0
){

type="Expense";

amount=
Number(expense);

label=
category;

}

else if(
Number(loan)>0
){

type="Loan";

amount=
Number(loan);

label=
loanType;

}

else{

alert(
"Enter transaction first"
);

return;

}



const item={

id:Date.now(),

date,

type,

category:label,

amount,

goal:Number(goal||0),

description

};



const updated=[

item,
...transactions

];


setTransactions(
updated
);


localStorage.setItem(

"finance_diary",

JSON.stringify(
updated
)

);


setIncome("");
setExpense("");
setLoan("");
setDescription("");

}



const totalIncome=

transactions

.filter(
x=>x.type==="Income"
)

.reduce(
(a,b)=>a+b.amount,
0
);



const totalExpenses=

transactions

.filter(
x=>x.type==="Expense"
)

.reduce(
(a,b)=>a+b.amount,
0
);



const totalLoan=

transactions

.filter(
x=>x.type==="Loan"
)

.reduce(
(a,b)=>a+b.amount,
0
);



const balance=

totalIncome-
totalExpenses-
totalLoan;



const avgDaily=

transactions.length

?

totalExpenses/
transactions.length

:0;



const projected=

Math.round(
avgDaily*30
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
"Learning your spending pattern";

}

else if(
projected>
(totalIncome*.7)
){

trend=
"Expenses increasing from recent activity";

}

else{

trend=
"Stable spending pattern";

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
"Reduce transportation and optional spending";

}

else{

recommendation=
"Current financial behavior looks sustainable";

}



const months=

goal && balance>0

?

Math.ceil(
goal/
balance
)

:

"Need more data";



function exportExcel(){

const rows=[

[
"Date",
"Type",
"Category",
"Amount",
"Description"
]

];


transactions.forEach(t=>{

rows.push([

t.date,
t.type,
t.category,
t.amount,
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
"Diary"
);


XLSX.writeFile(
wb,
"AI_Financial_Report.xlsx"
);

}



const input={

width:"100%",
padding:"14px",
borderRadius:"16px",
border:"1px solid #D1D5DB",
marginTop:"10px",
fontSize:"15px"

};



return(

<div
style={{
background:"#F4F7FB",
minHeight:"100vh",
padding:"30px",
fontFamily:"Arial"
}}
>

<div
style={{
background:"#081326",
color:"white",
padding:"40px",
borderRadius:"25px"
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

].map((card,index)=>(

<div
key={index}

style={{
background:"white",
padding:"30px",
borderRadius:"20px",
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

))

}

</div>




<div
style={{
background:"white",
padding:"30px",
borderRadius:"20px",
marginTop:"30px"
}}
>

<h2>
⚡ Daily Transaction Entry
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px"
}}
>


<div>

<h4>💼 Income</h4>

<input
placeholder="Income (£)"
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

<h4>💸 Expenses</h4>

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
<option>Conference</option>
<option>Groceries</option>
<option>Sponsorship</option>
<option>LoanPayment</option>
<option>Others</option>
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

<h4>🏦 Loan</h4>

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
value={loan}
onChange={(e)=>
setLoan(
e.target.value
)}
style={input}
/>

</div>



<div>

<h4>💰 Goal</h4>

<input
placeholder="Savings Goal (£)"
value={goal}
onChange={(e)=>
setGoal(
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
onChange={(e)=>
setDate(
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
padding:"15px 50px",
border:"none",
borderRadius:"20px",
fontWeight:"bold",
cursor:"pointer"
}}
>

+ Add Transaction

</button>

</div>

</div>




<div
style={{
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
{trend}
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
Estimated completion {months}
</p>

<p>
AI Confidence:
{confidence}%
</p>

</div>




<div
style={{
background:"white",
padding:"25px",
marginTop:"30px",
borderRadius:"20px"
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
cellPadding="12"
style={{
marginTop:"20px"
}}
>

<thead>

<tr>

<th>Date</th>
<th>Type</th>
<th>Category</th>
<th>Amount</th>
<th>Description</th>

</tr>

</thead>


<tbody>

{

transactions.length===0

?

<tr>

<td colSpan="6">

No records available

</td>

</tr>

:

transactions.map(t=>(

<tr key={t.id}>

<td>{t.date}</td>
<td>{t.type}</td>
<td>{t.category}</td>
<td>£{t.amount}</td>
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
