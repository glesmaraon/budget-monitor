import React, { useState } from "react";

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [category, setCategory] = useState("Food");

  const [loanTotal, setLoanTotal] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);

  const [savingsGoal, setSavingsGoal] = useState(0);

  const remainingLoan =
    Number(loanTotal || 0) - Number(loanPaid || 0);

  const balance =
    Number(income || 0) -
    Number(expense || 0) -
    Math.max(remainingLoan,0);

  let projection = "";
  let risk = "";

  if(balance < 0){
    projection="Projected deficit next month";
    risk="🔴 High";
  }
  else if(balance < 500){
    projection="Moderate financial pressure";
    risk="🟠 Medium";
  }
  else{
    projection="Stable projected balance";
    risk="🟢 Low";
  }

  return (
    <div style={{
      maxWidth:"900px",
      margin:"auto",
      padding:"30px",
      fontFamily:"Arial"
    }}>

      <h1>💰 AI Financial Companion V3</h1>

      <hr />

      <h2>Money Received</h2>

      <input
        type="number"
        placeholder="Income (£)"
        value={income}
        onChange={(e)=>setIncome(e.target.value)}
      />

      <hr />

      <h2>Expense Entry</h2>

      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Transportation</option>
        <option>Bills</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Conference</option>
        <option>Emergency</option>
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
        placeholder="Loan total (£)"
        value={loanTotal}
        onChange={(e)=>setLoanTotal(e.target.value)}
      />

      <br/><br/>

      <input
        type="number"
        placeholder="Loan paid (£)"
        value={loanPaid}
        onChange={(e)=>setLoanPaid(e.target.value)}
      />

      <p>
        Status:
        {remainingLoan<=0
        ? " CLOSED ✅"
        : " ACTIVE 🔴"}
      </p>

      <hr/>

      <h2>Savings Goal</h2>

      <input
        type="number"
        placeholder="Savings goal (£)"
        value={savingsGoal}
        onChange={(e)=>setSavingsGoal(e.target.value)}
      />

      <hr/>

      <h2>Dashboard Summary</h2>

      <p>Category: {category}</p>

      <p>
        Remaining Loan:
        £{Math.max(remainingLoan,0)}
      </p>

      <p>
        Current Balance:
        £{balance}
      </p>

      <p>
        Savings Goal:
        £{savingsGoal}
      </p>

      <hr/>

      <h2>🤖 Prediction Engine</h2>

      <p>30-day Projection: {projection}</p>

      <p>Risk: {risk}</p>

      <p>
        Recommendation:
        {balance<500
          ? "Reduce transportation and travel expenses"
          : "Current spending looks manageable"}
      </p>

    </div>
  );
}
