import React, { useState, useEffect } from "react";

import ReportingDashboard from "./components/ReportingDashboard";

export default function Dashboard() {

const [incomeRecords,setIncomeRecords]=
useState([]);

const [records,setRecords]=
useState([]);

const [loanTotal,setLoanTotal]=
useState("");

const [loanPaid,setLoanPaid]=
useState("");

const [savingGoal,setSavingGoal]=
useState("");

const [expense,setExpense]=
useState("");

const [category,setCategory]=
useState("Transportation");

const [description,setDescription]=
useState("");



useEffect(()=>{

const savedIncome=

localStorage.getItem(
"income_records"
);

const savedExpenses=

localStorage.getItem(
"finance_records"
);

if(savedIncome){

setIncomeRecords(
JSON.parse(savedIncome)
);

}

if(savedExpenses){

setRecords(
JSON.parse(savedExpenses)
);

}

},[]);



const saveExpense=()=>{

if(!expense)
return;


const item={

id:Date.now(),

date:

new Date()
.toISOString()
.split("T")[0],

category,

expense:Number(
expense
),

description

};


const updated=[

...records,
item

];

setRecords(
updated
);

localStorage.setItem(

"finance_records",

JSON.stringify(
updated)

);

setExpense("");

setDescription("");

};



const totalIncome=

incomeRecords.reduce(

(sum,r)=>

sum+
Number(
r.amount||0
),

0

);



const totalExpenses=

records.reduce(

(sum,r)=>

sum+
Number(
r.expense||0
),

0

);



const remainingLoan=

Math.max(

Number(
loanTotal||0
)

-

Number(
loanPaid||0
),

0

);



const balance=

totalIncome
-
totalExpenses
-
remainingLoan;



const forecast=()=>{

if(balance<0){

return

"⚠ Overspending detected. Reduce optional expenses.";

}

if(

remainingLoan>

totalIncome*.5

){

return

"📉 Loan burden affecting savings growth.";

}

if(records.length>5){

return

"📈 Stable spending trend detected.";

}

return

"Need more daily records for stronger forecasting.";

};



return(

<div
style={{

maxWidth:"1200px",

margin:"auto",

padding:"25px",

background:"#f5f7fb",

minHeight:"100vh"

}}
>

<h1>

💰 AI Financial Companion

</h1>


<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(230px,1fr))",

gap:"20px",

marginTop:"20px"

}}
>


{[

{

title:"💼 Income",

value:`£${totalIncome}`,

sub:

`${incomeRecords.length} sources`

},

{

title:"💸 Daily Spend",

value:`£${totalExpenses}`,

sub:

`${records.length} transactions`

},

{

title:"🏦 Loan",

value:`£${remainingLoan}`,

sub:"Remaining"

},

{

title:"🎯 Goal",

value:

savingGoal

?

`${Math.max(

((balance/savingGoal)*100)

.toFixed(0),

0

)}%`

:"0%",

sub:"Progress"

}

].map(

(card,index)=>(

<div
key={index}
style={{

background:"white",

padding:"20px",

borderRadius:"20px",

boxShadow:
"0 3px 12px rgba(0,0,0,.08)"

}}
>

<h3>

{card.title}

</h3>

<h1>

{card.value}

</h1>

<p>

{card.sub}

</p>

</div>

)

)

}

</div>



<br/>


<div
style={{

background:"white",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 3px 12px rgba(0,0,0,.08)"

}}
>

<h2>

⚡ Daily Tracker

</h2>


<select

value={category}

onChange={(e)=>

setCategory(
e.target.value
)

}

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

placeholder="Expense (£)"

value={expense}

onChange={(e)=>

setExpense(
e.target.value
)

}

/>


<input

placeholder=
"Description"

value={description}

onChange={(e)=>

setDescription(
e.target.value
)

}

/>


<button
onClick={saveExpense}
>

Add Expense

</button>

</div>


<br/>


<div
style={{

background:"white",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 3px 12px rgba(0,0,0,.08)"

}}
>

<h2>

🤖 Forecast & Recommendation

</h2>

<p>

{forecast()}

</p>

<p>

Confidence:

{

records.length>10

?95

:records.length>5

?88

:65

}%

</p>

</div>


<br/>


<div
style={{

background:"white",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 3px 12px rgba(0,0,0,.08)"

}}
>

<h2>

🎯 Savings Goal

</h2>

<input

type="number"

placeholder=
"Savings Goal (£)"

value=
{savingGoal}

onChange={(e)=>

setSavingGoal(
e.target.value
)

}

/>

</div>


<br/>


<ReportingDashboard

records={records}

totalIncome={totalIncome}

totalExpenses={totalExpenses}

balance={balance}

/>


</div>

)

}
