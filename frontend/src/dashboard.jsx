// Keep your existing imports
import React,{useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [transactions,setTransactions]=useState([]);

const [selectedDate,setSelectedDate]=useState(
new Date().toISOString().split("T")[0]
);

const [type,setType]=useState("Expense");
const [category,setCategory]=useState("Transportation");
const [amount,setAmount]=useState("");
const [description,setDescription]=useState("");

const [income,setIncome]=useState("");
const [loanType,setLoanType]=useState("Student Loan");
const [loanAmount,setLoanAmount]=useState("");
const [savingGoal,setSavingGoal]=useState("");

useEffect(()=>{

const saved=
localStorage.getItem("ai_transactions");

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
type,
category,
amount:Number(amount),
description

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
Number(income||0)+
transactions
.filter(t=>t.type==="Income")
.reduce((a,b)=>a+b.amount,0);


const totalExpenses=
transactions
.filter(t=>t.type==="Expense")
.reduce((a,b)=>a+b.amount,0);


const balance=
totalIncome-
totalExpenses-
Number(loanAmount||0);


function topHabit(){

const habits={};

transactions.forEach(t=>{

if(t.type==="Expense"){

habits[t.category]=
(habits[t.category]||0)
+t.amount;

}

});

const top=
Object.entries(habits)
.sort((a,b)=>b[1]-a[1])[0];

return top?top[0]:"No data";

}


function forecast(){

if(transactions.length<5){

return "AI needs more diary entries";

}

const avg=
totalExpenses/
transactions.length;

return `Monthly prediction: £${Math.round(avg*30)}`;

}


function recommendation(){

if(balance<0){

return "⚠ Spending exceeds balance";

}

if(topHabit()==="Transportation"){

return "🚇 Transportation dominates spending";

}

return "📈 Spending stable";

}


function exportExcel(){

const rows=[

["Date","Type","Category","Amount","Description"]

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
XLSX.utils.aoa_to_sheet(rows);

const wb=
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Diary"
);

XLSX.writeFile(
wb,
"MyDiaryReport.xlsx"
);

}


return(

<div style={{
padding:"30px",
background:"#F4F7FB",
minHeight:"100vh"
}}>

<h1>
📔 My Diary Habit Spending Analyzer
</h1>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}>

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
value:`£${loanAmount||0}`
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
padding:"25px",
borderRadius:"20px"
}}
>

<h3>{card.title}</h3>
<h1>{card.value}</h1>

</div>

))}

</div>


<div
style={{
background:"white",
padding:"30px",
marginTop:"20px",
borderRadius:"20px"
}}
>

<h2>
⚡ Daily Transaction Entry
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}
>

<div>

<h3>💼 Income</h3>

<input
placeholder="Income (£)"
value={income}
onChange={(e)=>setIncome(e.target.value)}
style={{width:"100%"}}
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
style={{width:"100%"}}
>

<option>Income</option>
<option>Expense</option>

</select>

</div>


<div>

<h3>💸 Expenses</h3>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={{width:"100%"}}
>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Shopping</option>

</select>

<input
placeholder="Expense (£)"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={{width:"100%"}}
/>

</div>


<div>

<h3>🏦 Loan</h3>

<select
value={loanType}
onChange={(e)=>setLoanType(e.target.value)}
style={{width:"100%"}}
>

<option>Student Loan</option>
<option>Credit Card</option>

</select>

<input
placeholder="Loan (£)"
value={loanAmount}
onChange={(e)=>setLoanAmount(e.target.value)}
style={{width:"100%"}}
/>

</div>


<div>

<h3>💰 Goal</h3>

<input
placeholder="Savings Goal"
value={savingGoal}
onChange={(e)=>setSavingGoal(e.target.value)}
style={{width:"100%"}}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={{width:"100%"}}
/>

</div>

</div>


<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:"25px"
}}>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
/>

<button
onClick={addTransaction}
>

+ Add Transaction

</button>

</div>

</div>


<div
style={{
background:"white",
padding:"25px",
marginTop:"20px"
}}
>

<h2>🤖 AI Analysis</h2>

<p>Habit: {topHabit()}</p>

<p>Forecast: {forecast()}</p>

<p>Recommendation: {recommendation()}</p>

<button
onClick={exportExcel}
>

⬇ Download Report

</button>

</div>

</div>

)

}
