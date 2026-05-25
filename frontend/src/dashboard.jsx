import React, { useMemo, useState } from "react";

export default function Dashboard() {
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0,10)
  );
  const [time, setTime] = useState(
    new Date().toTimeString().slice(0,5)
  );

  const [records, setRecords] = useState([]);

  const categories = {
    Expense: [
      "Food",
      "Transportation",
      "Bills",
      "Shopping",
      "Health",
      "Education",
      "Entertainment",
      "Other"
    ],
    Income: [
      "Salary",
      "Allowance",
      "Freelance",
      "Bonus",
      "Other"
    ],
    Savings: [
      "Emergency Fund",
      "Travel",
      "Investment",
      "Other"
    ],
    Loan: [
      "Personal Loan",
      "Credit Card",
      "Mortgage",
      "Other"
    ]
  };

  function addTransaction() {
    if (!amount || !category) return;

    const finalCategory =
      category === "Other"
        ? customCategory
        : category;

    const item = {
      type,
      category: finalCategory,
      amount: Number(amount),
      date,
      time
    };

    setRecords(prev => [...prev, item]);

    setCategory("");
    setCustomCategory("");
    setAmount("");
  }

  const totals = useMemo(() => {
    return {
      income:
        records
          .filter(x=>x.type==="Income")
          .reduce((a,b)=>a+b.amount,0),

      expense:
        records
          .filter(x=>x.type==="Expense")
          .reduce((a,b)=>a+b.amount,0),

      savings:
        records
          .filter(x=>x.type==="Savings")
          .reduce((a,b)=>a+b.amount,0),

      loan:
        records
          .filter(x=>x.type==="Loan")
          .reduce((a,b)=>a+b.amount,0)
    };
  }, [records]);

  const health=Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (
        (totals.income-totals.expense)/
        (totals.income||1)
        )*100
      )
    )
  );

  const predicted =
    totals.income -
    totals.expense +
    totals.savings;

  const confidence =
    records.length >=20
      ?90
      :records.length>=10
      ?80
      :60;

  function downloadReport(){

    const text=`
Financial Report

Income: £${totals.income}
Expense: £${totals.expense}
Savings: £${totals.savings}
Loan: £${totals.loan}

Health: ${health}/100
Confidence:${confidence}%

Predicted:
£${predicted}

Transactions:
${records.length}
`;

    const blob=new Blob(
      [text],
      {type:"text/plain"}
    );

    const a=
      document.createElement("a");

    a.href=
      URL.createObjectURL(blob);

    a.download=
      "Financial_Report.txt";

    a.click();
  }

  function renderTable(label){

    const data=
      records.filter(
        x=>x.type===label
      );

    return(
      <>
      <h3>{label}</h3>

      <table
      border="1"
      width="100%"
      cellPadding="8">

      <thead>
      <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Category</th>
      <th>£</th>
      </tr>
      </thead>

      <tbody>

      {data.map(
      (x,i)=>(

      <tr key={i}>
      <td>{x.date}</td>
      <td>{x.time}</td>
      <td>{x.category}</td>
      <td>{x.amount}</td>
      </tr>

      ))}

      </tbody>
      </table>

      <br/>
      </>
    )
  }

  return(
<div
style={{
maxWidth:"1100px",
margin:"auto",
padding:"30px",
fontFamily:"Arial"
}}
>

<h1>
💰 Financial Monitoring System
</h1>

<hr/>

<h2>
Add Transaction
</h2>

<select
value={type}
onChange={(e)=>{
setType(e.target.value);
setCategory("");
}}
>

<option>Expense</option>
<option>Income</option>
<option>Savings</option>
<option>Loan</option>

</select>

<select
value={category}
onChange={(e)=>
setCategory(
e.target.value
)}
>

<option value="">
Select Category
</option>

{categories[type].map(
x=>(
<option key={x}>
{x}
</option>
)
)}

</select>

{category==="Other" && (

<input
placeholder="Other"
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
setDate(
e.target.value
)}
/>

<input
type="time"
value={time}
onChange={(e)=>
setTime(
e.target.value
)}
/>

<input
type="number"
placeholder="Amount £"
value={amount}
onChange={(e)=>
setAmount(
e.target.value
)}
/>

<button
onClick={addTransaction}
>

Add

</button>

<hr/>

<h2>Overview</h2>

<p>Income: £{totals.income}</p>
<p>Expense: £{totals.expense}</p>
<p>Savings: £{totals.savings}</p>
<p>Loan: £{totals.loan}</p>

<p>
Health:
{health}/100
</p>

<p>
Confidence:
{confidence}%
</p>

<p>
Predicted:
£{predicted}/month
</p>

<hr/>

{renderTable("Expense")}
{renderTable("Income")}
{renderTable("Savings")}
{renderTable("Loan")}

<button
onClick={downloadReport}
>

⬇ Download Report

</button>

</div>
)
}
