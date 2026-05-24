import { useState } from 'react'

export default function Dashboard(){

const [income,setIncome]=useState("")
const [category,setCategory]=useState("Food")
const [expense,setExpense]=useState("")
const [loan,setLoan]=useState("")
const [savingGoal,setSavingGoal]=useState("")
const [paidLoan,setPaidLoan]=useState("")

const totalExpenses=Number(expense||0)
const remainingLoan=Math.max(
Number(loan||0)-Number(paidLoan||0),
0
)

const balance=
Number(income||0)
-totalExpenses
-remainingLoan

let prediction=""
let risk=""

if(balance<0){
prediction="High risk next month"
risk="🔴 High"
}
else if(balance<500){
prediction="Moderate spending pressure"
risk="🟠 Medium"
}
else{
prediction="Financial status stable"
risk="🟢 Low"
}

return(

<div
style={{
padding:"30px",
fontFamily:"Arial",
maxWidth:"900px",
margin:"auto"
}}
>

<h1>
💰 AI Financial Companion
</h1>

<hr/>

<h2>Money Received</h2>

<input
type="number"
placeholder="Salary / income (£)"
value={income}
onChange={(e)=>setIncome(e.target.value)}
/>

<hr/>

<h2>Expense Entry</h2>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option>Food</option>

<option>Transportation</option>

<option>Bills</option>

<option>Shopping</option>

<option>Conference</option>

<option>Emergency</option>

<option>Travel</option>

</select>

<br/><br/>

<input
type="number"
placeholder="Expense amount (£)"
value={expense}
onChange={(e)=>setExpense(e.target.value)}
/>

<hr/>

<h2>Loan Tracking</h2>

<input
type="number"
placeholder="Total loan (£)"
value={loan}
onChange={(e)=>setLoan(e.target.value)}
/>

<br/><br/>

<input
type="number"
placeholder="Amount already paid (£)"
value={paidLoan}
onChange={(e)=>setPaidLoan(e.target.value)}
/>

<h3>

Status:

{
remainingLoan===0
?

" CLOSED ✅"

:

" ACTIVE 🔴"
}

</h3>

<hr/>

<h2>Savings Goal</h2>

<input
type="number"
placeholder="Savings target (£)"
value={savingGoal}
onChange={(e)=>setSavingGoal(e.target.value)}
/>

<hr/>

<h1>

Dashboard Summary

</h1>

<p>

💵 Current Balance:

£{balance}

</p>

<p>

📌 Category:

{category}

</p>

<p>

💳 Remaining Loan:

£{remainingLoan}

</p>

<p>

🎯 Savings Goal:

£{savingGoal||0}

</p>

<hr/>

<h1>

🤖 Prediction Engine

</h1>

<p>

30-day Projection:

{prediction}

</p>

<p>

Risk:

{risk}

</p>

<p>

Recommendation:

{
balance<500

?

"Reduce transportation/travel spending this month"

:

"Current spending looks manageable"
}

</p>

</div>

)

}
