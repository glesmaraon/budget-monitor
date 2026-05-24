import React,{useEffect,useState} from "react";

export default function Dashboard(){

const [records,setRecords]=useState([]);
const [income,setIncome]=useState("");
const [loan,setLoan]=useState("");
const [savingGoal,setSavingGoal]=useState("");

const [expense,setExpense]=useState("");
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



const addExpense=()=>{

if(!expense)return;

const item={

id:Date.now(),

date:
new Date()
.toLocaleDateString(),

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
JSON.stringify(updated)
);

setExpense("");
setDescription("");

};



const totalExpenses=

records.reduce(

(sum,item)=>

sum+
item.expense,

0

);


const balance=

Number(income||0)
-
totalExpenses
-
Number(loan||0);



const recommendation=()=>{

if(balance<0){

return
"Reduce optional spending and prioritize essential expenses.";

}

if(
Number(loan)>
Number(income)*0.5
){

return
"Loan repayment is impacting future savings.";

}

if(
records.length>5
){

return
"Spending trend stable. Continue monitoring daily usage.";

}

return
"Add more daily records for stronger forecasting.";

};



const confidence=

records.length>10

?95

:records.length>5

?88

:70;



return(

<div
style={{
fontFamily:"Arial",
background:"#F5F7FA",
minHeight:"100vh",
padding:"30px"
}}
>


<div
style={{
background:"#111827",
padding:"30px",
borderRadius:"20px",
color:"white",
marginBottom:"25px"
}}
>

<h1>

💰 AI Financial Companion

</h1>

<p>

Personal finance tracker with forecasting and reporting

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

title:"Income",

icon:"💼",

value:`£${income||0}`

},

{

title:"Expenses",

icon:"💸",

value:`£${totalExpenses}`

},

{

title:"Loan",

icon:"🏦",

value:`£${loan||0}`

},

{

title:"Balance",

icon:"💰",

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

{card.icon}
{" "}
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

marginTop:"25px",

background:"white",

padding:"25px",

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

placeholder=
"Income (£)"

value={income}

onChange={(e)=>
setIncome(
e.target.value
)}

style={{
margin:"5px"
}}

/>


<input

type="number"

placeholder=
"Loan (£)"

value={loan}

onChange={(e)=>
setLoan(
e.target.value
)}

style={{
margin:"5px"
}}

/>


<input

type="number"

placeholder=
"Savings Goal (£)"

value={savingGoal}

onChange={(e)=>
setSavingGoal(
e.target.value
)}

style={{
margin:"5px"
}}

/>


<br/><br/>


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

</select>


<input

type="number"

placeholder=
"Expense (£)"

value={expense}

onChange={(e)=>
setExpense(
e.target.value
)}

/>


<input

placeholder=
"Description"

value={description}

onChange={(e)=>
setDescription(
e.target.value
)}

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

marginTop:"25px",

background:"white",

padding:"25px",

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

marginTop:"25px",

background:"white",

padding:"25px",

borderRadius:"18px",

boxShadow:
"0 4px 12px rgba(0,0,0,.08)"

}}
>

<h2>

📄 Daily Spend Records

</h2>


<table
width="100%"
border="1"
cellPadding="8"
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

No records yet

</td>

</tr>

:

records.map(

r=>(

<tr
key={r.id}
>

<td>
{r.date}
</td>

<td>
{r.category}
</td>

<td>
£{r.expense}
</td>

<td>
{r.description}
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
