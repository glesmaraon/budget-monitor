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
setTransactions(JSON.parse(saved));
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
.filter(
t=>t.type==="Income"
)
.reduce(
(a,b)=>a+b.amount,0
);

const totalExpenses=
transactions
.filter(
t=>t.type==="Expense"
)
.reduce(
(a,b)=>a+b.amount,0
);

const balance=
totalIncome-
totalExpenses-
Number(loanAmount||0);


function forecast(){

if(transactions.length<5){

return "AI is learning from your entries";

}

const avg=

totalExpenses/
transactions.length;

return `Projected monthly spending: £${Math.round(avg*30)}`;

}


function aiRecommendation(){

const projected=
Math.round(
(totalExpenses/
Math.max(
transactions.length,1
))*30
);

if(balance<0){

return "Reduce optional expenses immediately.";

}

if(
projected>
totalIncome*.8
){

return "Spending trend consuming most income.";

}

return "Current spending trend is stable.";

}


const confidence=

transactions.length>20

?95

:transactions.length>10

?90

:transactions.length>5

?82

:65;



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
"Transactions"
);

XLSX.writeFile(
wb,
"AI_Diary_Report.xlsx"
);

}



const inputStyle={

width:"100%",
padding:"12px",
borderRadius:"12px",
border:"1px solid #d1d5db",
marginTop:"8px",
fontSize:"14px"

};


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
borderRadius:"24px",
color:"white",
marginBottom:"25px"
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
"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px"
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
borderRadius:"20px",
boxShadow:
"0 5px 15px rgba(0,0,0,.08)"
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
padding:"30px",
borderRadius:"20px",
marginTop:"25px",
boxShadow:
"0 5px 15px rgba(0,0,0,.08)"
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
gap:"20px",
marginTop:"20px"
}}
>

<div>

<h4>💼 Income</h4>

<input
placeholder="Base Income (£)"
value={income}
onChange={(e)=>setIncome(e.target.value)}
style={inputStyle}
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
style={inputStyle}
>

<option>Income</option>
<option>Expense</option>

</select>

</div>



<div>

<h4>💸 Expenses</h4>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={inputStyle}
>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Shopping</option>
<option>Travel</option>

</select>

<input
placeholder="Expense (£)"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={inputStyle}
/>

</div>



<div>

<h4>🏦 Loan</h4>

<select
value={loanType}
onChange={(e)=>setLoanType(e.target.value)}
style={inputStyle}
>

<option>Student Loan</option>
<option>Credit Card</option>
<option>Mortgage</option>
<option>Personal Loan</option>

</select>

<input
placeholder="Loan (£)"
value={loanAmount}
onChange={(e)=>setLoanAmount(e.target.value)}
style={inputStyle}
/>

</div>



<div>

<h4>💰 Goal</h4>

<input
placeholder="Savings Goal (£)"
value={savingGoal}
onChange={(e)=>setSavingGoal(e.target.value)}
style={inputStyle}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
style={inputStyle}
/>

</div>

</div>


<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:"25px"
}}
>

<input
type="date"
value={selectedDate}
onChange={(e)=>setSelectedDate(e.target.value)}
style={inputStyle}
/>


<button
onClick={addTransaction}
style={{
background:"#111827",
color:"white",
padding:"14px 40px",
border:"none",
borderRadius:"14px",
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
background:"white",
padding:"25px",
borderRadius:"20px",
marginTop:"25px",
boxShadow:
"0 5px 15px rgba(0,0,0,.08)"
}}
>

<h2>

🤖 AI Forecast & Recommendation

</h2>

<p>
Trend:
{forecast()}
</p>

<p>
Recommendation:
{aiRecommendation()}
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
borderRadius:"20px",
marginTop:"25px"
}}
>

<button
onClick={exportExcel}
style={{
background:"#0F766E",
color:"white",
padding:"12px",
border:"none",
borderRadius:"12px"
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
<th>Type</th>
<th>Category</th>
<th>Amount</th>
<th>Description</th>

</tr>

</thead>

<tbody>

{

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
