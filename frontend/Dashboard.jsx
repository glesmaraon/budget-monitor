import { useState } from 'react';

export default function Dashboard() {
const [expense,setExpense]=useState("");
const [saving,setSaving]=useState("");
const [loan,setLoan]=useState("");

return(
<div style={{padding:"30px", fontFamily:"Arial"}}>
<h1>AI Financial Companion</h1>

<h2>💰 Expense</h2>
<input placeholder="Enter expense (£)" value={expense}
onChange={(e)=>setExpense(e.target.value)}/>

<h2>🎯 Savings</h2>
<input placeholder="Enter savings (£)" value={saving}
onChange={(e)=>setSaving(e.target.value)}/>

<h2>💳 Loan</h2>
<input placeholder="Enter loan (£)" value={loan}
onChange={(e)=>setLoan(e.target.value)}/>

<br/><br/>
<button>Save</button>

<hr/>

<h2>Dashboard Summary</h2>
<p>Expenses: £{expense||0}</p>
<p>Savings: £{saving||0}</p>
<p>Loans: £{loan||0}</p>

<h2>🤖 Prediction</h2>
<p>Recommendation: Save £30 this week</p>
<p>Bank Protection: ACTIVE 🛡️</p>

</div>
)}
