import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [transactions,setTransactions]=useState([]);

const [type,setType]=useState("Expense");
const [category,setCategory]=useState("Transportation");

const [amount,setAmount]=useState("");
const [description,setDescription]=
useState("");

const [loanType,setLoanType]=
useState("Student Loan");

const [loanAmount,setLoanAmount]=
useState("");

const [income,setIncome]=
useState("");

const [savingGoal,setSavingGoal]=
useState("");

const [selectedDate,setSelectedDate]=
useState(
new Date()
.toISOString()
.split("T")[0]
);



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

if(!amount)return;


const item={

id:Date.now(),

date:selectedDate,

time:
new Date()
.toLocaleTimeString(),

type,

category,

amount:
Number(amount),

description,

loanType

};


const updated=[

item,
...transactions

];


setTransactions(updated);

localStorage.setItem(

"ai_transactions",

JSON.stringify(updated)

);

setAmount("");

setDescription("");

}



const totalIncome=

Number(income||0)

+

transactions

.filter(

t=>

t.type==="Income"

)

.reduce(

(sum,t)=>

sum+t.amount,

0

);



const totalExpense=

transactions

.filter(

t=>

t.type==="Expense"

)

.reduce(

(sum,t)=>

sum+t.amount,

0

);



const balance=

totalIncome
-
totalExpense
-
Number(
loanAmount||0
);



function topHabit(){

const habits={};

transactions.forEach(t=>{

if(
t.type==="Expense"
){

habits[
t.category
]

=

(
habits[
t.category
]||0
)

+t.amount;

}

});

const top=

Object.entries(
habits
)

.sort(
(a,b)=>
b[1]-a[1]
)[0];

return top

?top[0]

:"No trend";

}



function forecast(){

if(
transactions.length<5
){

return "AI needs more diary entries";

}

const average=

totalExpense/
transactions.length;


return

`Predicted monthly spending:
£${Math.round(
average*30
)}`;

}



function recommendation(){

if(balance<0){

return "⚠ Spending exceeds available balance.";

}

if(

topHabit()==

"Transportation"

){

return "🚇 Transportation dominates your diary spending.";

}

if(

topHabit()==

"Food"

){

return "🍜 Food spending trend increasing.";

}

if(

Number(
savingGoal
)

>

balance

){

return "🎯 Goal may require increased savings.";

}

return "📈 Spending behavior currently stable.";

}



const confidence=

transactions.length>15

?95

:transactions.length>7

?88

:70;



function exportExcel(){

const rows=[

[
"Date",
"Time",
"Type",
"Category",
"Amount",
"Description",
"Loan Type"
]

];


transactions.forEach(t=>{

rows.push([

t.date,

t.time,

t.type,

t.category,

t.amount,

t.description,

t.loanType

]);

});


const ws=

XLSX.utils
.aoa_to_sheet(
rows
);

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
"MyDiaryHabitReport.xlsx"
);

}



return(

<div
style={{
background:"#F4F7FB",
padding:"30px",
minHeight:"100vh",
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

📔 My Diary Habit Spending Analyzer

</h1>

<p>

Track → Learn → Analyze → Predict

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
value:`£${totalIncome}`
},

{
title:"💸 Expenses",
value:`£${totalExpense}`
},

{
title:"🏦 Loan",
value:`£${loanAmount||0}`
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
padding:"25px",
marginTop:"20px",
borderRadius:"20px"
}}
>

<h2>

⚡ Transaction Entry

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap:"12px"
}}
>

<input
type="date"
value={selectedDate}
onChange={(e)=>
setSelectedDate(
e.target.value
)}
/>

<select
value={type}
onChange={(e)=>
setType(
e.target.value
)}
>

<option>
Expense
</option>

<option>
Income
</option>

</select>


<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)}
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
Shopping
</option>

<option>
Salary
</option>

<option>
Project
</option>

</select>


<input
type="number"
placeholder="Amount (£)"
value={amount}
onChange={(e)=>
setAmount(
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


<select
value={loanType}
onChange={(e)=>
setLoanType(
e.target.value
)}
>

<option>
Student Loan
</option>

<option>
Credit Card
</option>

<option>
Mortgage
</option>

<option>
Personal Loan
</option>

</select>


<input
type="number"
placeholder="Loan (£)"
value={loanAmount}
onChange={(e)=>
setLoanAmount(
e.target.value
)}
/>


<input
type="number"
placeholder="Savings Goal (£)"
value={savingGoal}
onChange={(e)=>
setSavingGoal(
e.target.value
)}
/>


<input
type="number"
placeholder="Base Income (£)"
value={income}
onChange={(e)=>
setIncome(
e.target.value
)}
/>


<button
onClick={addTransaction}
>

Add Transaction

</button>

</div>

</div>



<div
style={{
background:"white",
padding:"25px",
marginTop:"20px",
borderRadius:"20px"
}}
>

<h2>

🤖 AI Analysis

</h2>

<p>
Habit:
{topHabit()}
</p>

<p>
Forecast:
{forecast()}
</p>

<p>
Recommendation:
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
marginTop:"20px",
borderRadius:"20px"
}}
>

<button
onClick={exportExcel}
>

⬇ Download Report

</button>

<table
width="100%"
border="1"
style={{
marginTop:"15px"
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

transactions.map(

t=>(

<tr key={t.id}>

<td>{t.date}</td>
<td>{t.type}</td>
<td>{t.category}</td>
<td>£{t.amount}</td>
<td>{t.description}</td>

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
