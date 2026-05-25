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
const [amount,setAmount]=useState("");

const [loanType,setLoanType]=useState("Student Loan");
const [loanAmount,setLoanAmount]=useState("");

const [savingGoal,setSavingGoal]=useState("");
const [description,setDescription]=useState("");

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
incomeType,
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
Number(income||0);

const totalExpenses=

transactions.reduce(

(sum,item)=>
sum+item.amount

,0);


const balance=

totalIncome-
totalExpenses-
Number(
loanAmount||0
);



function exportExcel(){

const rows=[

[
"Date",
"Income Type",
"Category",
"Expense",
"Description"
]

];


transactions.forEach(t=>{

rows.push([

t.date,
t.incomeType,
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
"MyDiaryReport.xlsx"
);

}



const avg=

transactions.length

?

totalExpenses/
transactions.length

:0;


const monthly=
Math.round(avg*30);


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

monthly>

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

:"Unknown";



const inputStyle={

width:"100%",
padding:"16px",
borderRadius:"18px",
border:"1px solid #d1d5db",
fontSize:"18px"

};



return(

<div style={{
background:"#F3F4F6",
minHeight:"100vh",
padding:"30px",
fontFamily:"Arial"
}}>

<div style={{
background:"#091428",
color:"white",
padding:"35px",
borderRadius:"25px"
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
value:`£${loanAmount||0}`
},

{
title:"💰 Balance",
value:`£${balance}`
}

].map((item,i)=>(

<div
key={i}

style={{
background:"white",
padding:"30px",
borderRadius:"25px"
}}
>

<h2>{item.title}</h2>

<h1>{item.value}</h1>

</div>

))

}

</div>



<div style={{
background:"white",
padding:"30px",
borderRadius:"25px",
marginTop:"30px"
}}>

<h1>

⚡ Daily Transaction Entry

</h1>


<div style={{
display:"grid",
gridTemplateColumns:
"repeat(4,1fr)",
gap:"20px",
marginTop:"20px"
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
style={inputStyle}
/>


<select
value={incomeType}
onChange={(e)=>
setIncomeType(
e.target.value
)}
style={{
...inputStyle,
marginTop:"10px"
}}
>

<option>
Salary
</option>

<option>
Project
</option>

<option>
Allowance
</option>

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
style={inputStyle}
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
placeholder="Expense (£)"
value={amount}
onChange={(e)=>
setAmount(
e.target.value
)}
style={{
...inputStyle,
marginTop:"10px"
}}
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
style={inputStyle}
>

<option>
Student Loan
</option>

<option>
Mortgage
</option>

<option>
Credit Card
</option>

</select>


<input
placeholder="Loan (£)"
value={loanAmount}
onChange={(e)=>
setLoanAmount(
e.target.value
)}
style={{
...inputStyle,
marginTop:"10px"
}}
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
style={inputStyle}
/>


<input
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)}
style={{
...inputStyle,
marginTop:"10px"
}}
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
...inputStyle,
flex:1
}}
/>

<button
onClick={addTransaction}

style={{
background:"#07152D",
color:"white",
padding:"15px 50px",
borderRadius:"20px",
border:"none",
fontWeight:"bold",
fontSize:"18px",
cursor:"pointer"
}}
>

+ Add Transaction

</button>

</div>

</div>



<div style={{
background:"#091428",
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
Projected monthly spending £{monthly}
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

</div>

</div>

)

}
