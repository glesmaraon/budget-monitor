import React, { useState } from "react";

export default function Dashboard() {
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [records, setRecords] = useState([]);

  const addTransaction = () => {
    if (!amount || !category) return;

    const finalCategory =
      category === "Other"
        ? customCategory
        : category;

    const newRecord = {
      date,
      type,
      category: finalCategory,
      amount: Number(amount)
    };

    setRecords([...records, newRecord]);

    setCategory("");
    setCustomCategory("");
    setAmount("");
  };

  const totalIncome = records
    .filter(x => x.type === "Income")
    .reduce((s,x)=>s+x.amount,0);

  const totalExpense = records
    .filter(x => x.type === "Expense")
    .reduce((s,x)=>s+x.amount,0);

  const totalSavings = records
    .filter(x => x.type === "Savings")
    .reduce((s,x)=>s+x.amount,0);

  const validation=records.length;

  const financialHealth=Math.max(
    0,
    Math.min(
      100,
      Math.round(
        ((totalIncome-totalExpense)/
        (totalIncome||1))*100
      )
    )
  );

  const confidence=
    validation>=20 ? 90 :
    validation>=10 ? 80 : 60;

  const predictedSavings=
    totalIncome-totalExpense+
    totalSavings;

  const weeklySpend=
    Math.round(totalExpense/4);

  const downloadReport=()=>{

    const report=`

GLIZA FINANCIAL REPORT

Income: £${totalIncome}

Expense: £${totalExpense}

Savings: £${totalSavings}

Health:
${financialHealth}/100

Confidence:
${confidence}%

Predicted Savings:
£${predictedSavings}

Transactions:
${validation}

`;

    const blob=new Blob(
      [report],
      {type:"text/plain"}
    );

    const link=
    document.createElement("a");

    link.href=
    URL.createObjectURL(blob);

    link.download=
    "Financial_Report.txt";

    link.click();
  };

  return(
    <div style={{
      maxWidth:"1000px",
      margin:"auto",
      padding:"30px",
      fontFamily:"Arial"
    }}>

<h1>
💰 Financial Monitoring System
</h1>

<p>
Track daily spending smarter
</p>

<hr/>

<h2>
⚡ Daily Tracker
</h2>

<select
value={type}
onChange={(e)=>
setType(e.target.value)}
>
<option>Expense</option>
<option>Income</option>
<option>Savings</option>
<option>Loan</option>
</select>

<select
value={category}
onChange={(e)=>
setCategory(e.target.value)}
>

<option value="">
Select Category
</option>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Shopping</option>
<option>Health</option>
<option>Education</option>
<option>Other</option>

</select>

{category==="Other" && (

<input
placeholder="Custom category"
value={customCategory}
onChange={(e)=>
setCustomCategory(
e.target.value
)}
/>

)}

<input
type="date"
value={date}
onChange={(e)=>
setDate(e.target.value)}
/>

<input
type="number"
placeholder="Amount (£)"
value={amount}
onChange={(e)=>
setAmount(e.target.value)}
/>

<button
onClick={addTransaction}
>
Add
</button>

<hr/>

<h2>
📊 Financial Overview
</h2>

<p>Income: £{totalIncome}</p>
<p>Expense: £{totalExpense}</p>
<p>Savings: £{totalSavings}</p>

<p>
Financial Health:
{financialHealth}/100
</p>

<hr/>

<h2>
🤖 Forecast
</h2>

<p>
AI Confidence:
{confidence}%
</p>

<p>
Validation:
{validation}
transactions
</p>

<p>
Predicted Savings:
£{predictedSavings}/month
</p>

<hr/>

<h2>
📈 Trends
</h2>

<p>
Weekly Spend:
£{weeklySpend}
</p>

<hr/>

<h2>
📄 Transactions
</h2>

<table
border="1"
width="100%"
cellPadding="10"
>

<thead>
<tr>
<th>Date</th>
<th>Type</th>
<th>Category</th>
<th>Amount</th>
</tr>
</thead>

<tbody>

{records.map(
(item,index)=>(

<tr key={index}>
<td>{item.date}</td>
<td>{item.type}</td>
<td>{item.category}</td>
<td>£{item.amount}</td>
</tr>

))}

</tbody>

</table>

<br/>

<button
onClick={downloadReport}
>

⬇ Download Report

</button>

</div>
)}
