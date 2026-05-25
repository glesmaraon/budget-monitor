import React,{useEffect,useState} from "react";
import * as XLSX from "xlsx";

export default function Dashboard(){

const [transactions,setTransactions]=useState([]);

const [type,setType]=useState("Expense");
const [category,setCategory]=useState("Transportation");
const [amount,setAmount]=useState("");
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

if(!amount)return;


const item={

id:Date.now(),

date:
new Date()
.toLocaleDateString(),

time:
new Date()
.toLocaleTimeString(),

type,

category,

amount:Number(amount),

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

"ai_transactions",

JSON.stringify(
updated)

);


setAmount("");
setDescription("");

}



const income=

transactions
.filter(
t=>t.type==="Income"
)
.reduce(
(sum,t)=>
sum+t.amount
,0
);


const expenses=

transactions
.filter(
t=>t.type==="Expense"
)
.reduce(
(sum,t)=>
sum+t.amount
,0
);


const balance=
income-expenses;



const topCategory=()=>{

const categories={};

transactions.forEach(t=>{

if(
t.type==="Expense"
){

categories[
t.category
]

=

(
categories[
t.category
]||0
)

+

t.amount;

}

});


const top=

Object.entries(
categories
)

.sort(
(a,b)=>

b[1]-a[1]

)[0];


return top

?top[0]

:"No data";

};



function recommendation(){

if(balance<0){

return "⚠ Spending exceeds income.";

}

if(

topCategory()==="Transportation"

){

return "🚇 Transportation is your highest spending category.";

}

if(expenses>income*.7){

return "📉 Spending is consuming most income.";

}

return "📈 Spending pattern currently stable.";

}



function forecast(){

if(
transactions.length<5
){

return
"Need more records";

}


const avg=

expenses/

transactions.length;


return

`Predicted monthly spending:
£${Math.round(
avg*30
)}`;

}



function exportExcel(){

const rows=[

[
"Date",
"Time",
"Type",
"Category",
"Amount",
"Description"
]

];


transactions.forEach(t=>{

rows.push([

t.date,

t.time,

t.type,

t.category,

t.amount,

t.description

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
"Transactions"
);

XLSX.writeFile(
wb,
"AI_Transactions.xlsx"
);

}



return(

<div
style={{
padding:"30px",
background:"#F5F7FB",
minHeight:"100vh"
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

🤖 AI Saving Companion

</h1>

<p>

Track → Analyze → Predict → Improve

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
value:`£${income}`
},

{
title:"💸 Expenses",
value:`£${expenses}`
},

{
title:"💰 Balance",
value:`£${balance}`
},

{
title:"🔥 Top Spend",
value:topCategory()
}

].map((card,i)=>(

<div
key={i}
style={{
background:"white",
padding:"25px",
borderRadius:"18px"
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
borderRadius:"20px",
marginTop:"20px"
}}
>

<h2>

⚡ Transaction Entry

</h2>

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
placeholder="Amount"
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


<button
onClick={addTransaction}
>

Add Transaction

</button>

</div>



<div
style={{
background:"white",
padding:"25px",
borderRadius:"20px",
marginTop:"20px"
}}
>

<h2>

🤖 AI Analysis

</h2>

<p>

Top habit:
{topCategory()}

</p>

<p>

Forecast:
{forecast()}

</p>

<p>

Recommendation:
{recommendation()}

</p>

</div>



<div
style={{
background:"white",
padding:"25px",
borderRadius:"20px",
marginTop:"20px"
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
