import React, { useEffect, useState } from "react";
import IncomeTracker from "./components/IncomeTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import LoanTracker from "./components/LoanTracker";

export default function Dashboard() {

const [incomeType,setIncomeType]=useState("Salary");
const [incomeAmount,setIncomeAmount]=useState("");

const [incomeRecords,setIncomeRecords]=useState([]);

const [category,setCategory]=useState("Transportation");
const [expense,setExpense]=useState("");
const [description,setDescription]=useState("");
const [date,setDate]=useState("");

const [records,setRecords]=useState([]);

const [loanTotal,setLoanTotal]=useState("");
const [loanPaid,setLoanPaid]=useState("");

const [savingGoal,setSavingGoal]=useState("");

useEffect(()=>{

const expenses=
localStorage.getItem(
"finance_records"
);

const incomes=
localStorage.getItem(
"income_records"
);

if(expenses){

setRecords(
JSON.parse(expenses)
);

}

if(incomes){

setIncomeRecords(
JSON.parse(incomes)
);

}

},[]);


const saveIncome=()=>{

const item={

type:incomeType,
amount:incomeAmount,
date:new Date()
.toLocaleDateString()

};

const updated=[
...incomeRecords,
item
];

setIncomeRecords(updated);

localStorage.setItem(
"income_records",
JSON.stringify(updated)
);

setIncomeAmount("");

};


const saveExpense=()=>{

const item={

date,
category,
expense,
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


const totalIncome=
incomeRecords.reduce(
(sum,item)=>
sum+
Number(item.amount||0),
0
);

const totalExpenses=
records.reduce(
(sum,item)=>
sum+
Number(item.expense||0),
0
);

const remainingLoan=
Math.max(
Number(loanTotal||0)
-
Number(loanPaid||0),
0
);

const balance=
totalIncome-
totalExpenses-
remainingLoan;

const confidence=
records.length>=5
?92
:records.length>=3
?85
:70;


let risk="";
let recommendation="";
let projection="";

if(balance<0){

risk="🔴 High";

recommendation=
"Spending and debt exceed income.";

projection=
"Deficit projected this month.";

}

else if(
remainingLoan>
totalIncome*.5
){

risk="🟠 Medium";

recommendation=
"Debt burden affecting finances.";

projection=
"Slower savings growth projected.";

}

else{

risk="🟢 Low";

recommendation=
"Financial condition stable.";

projection=
"Savings goal achievable.";

}


return(

<div style={{
maxWidth:"1000px",
margin:"auto",
padding:"30px",
fontFamily:"Arial"
}}>

<h1>
💰 AI Financial Companion V4
</h1>

<hr/>

<h2>
💼 Income Sources
</h2>

<select
value={incomeType}
onChange={(e)=>
setIncomeType(
e.target.value
)}
>

<option>
Salary
</option>

<option>
Project
</option>

<option>
Freelance
</option>

<option>
Research
</option>

<option>
Allowance
</option>

</select>

<br/><br/>

<input
type="number"
placeholder="Income (£)"
value={incomeAmount}
onChange={(e)=>
setIncomeAmount(
e.target.value
)}
/>

<button
onClick={saveIncome}
>

Add Income

</button>

<p>
Total Income:
£{totalIncome}
</p>

<hr/>

<h2>
💸 Expenses
</h2>

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
Travel
</option>

<option>
Shopping
</option>

</select>

<br/><br/>

<input
type="number"
placeholder="Expense (£)"
value={expense}
onChange={(e)=>
setExpense(
e.target.value
)}
/>

<br/><br/>

<input
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(
e.target.value
)}
/>

<br/><br/>

<input
type="date"
value={date}
onChange={(e)=>
setDate(
e.target.value
)}
/>

<br/><br/>

<button
onClick={saveExpense}
>

Save Expense

</button>

<hr/>

<h2>
🏦 Loan
</h2>

<input
type="number"
placeholder="Loan total"
value={loanTotal}
onChange={(e)=>
setLoanTotal(
e.target.value
)}
/>

<input
type="number"
placeholder="Loan paid"
value={loanPaid}
onChange={(e)=>
setLoanPaid(
e.target.value
)}
/>

<p>

Remaining:
£{remainingLoan}

</p>

<hr/>

<h2>
📊 Dashboard Summary
</h2>

<p>Total Expenses: £{totalExpenses}</p>

<p>Current Balance: £{balance}</p>

<p>Savings Goal: £{savingGoal}</p>

<input
type="number"
placeholder="Savings Goal (£)"
value={savingGoal}
onChange={(e)=>
setSavingGoal(
e.target.value
)}
/>

<hr/>

<h2>
🤖 AI Prediction
</h2>

<p>
Risk:
{risk}
</p>

<p>
Recommendation:
{recommendation}
</p>

<p>
Projection:
{projection}
</p>

<p>
Confidence:
{confidence}%
</p>

<hr/>

<h2>
📄 Reporting
</h2>

<table border="1">

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
records.map((r,i)=>(

<tr key={i}>

<td>{r.date}</td>
<td>{r.category}</td>
<td>£{r.expense}</td>
<td>{r.description}</td>

</tr>

))
}

</tbody>

</table>

</div>

)

}
