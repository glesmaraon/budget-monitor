import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("Transportation");
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [loanTotal, setLoanTotal] = useState("");
  const [loanPaid, setLoanPaid] = useState("");
  const [savingGoal, setSavingGoal] = useState("");

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("finance_records");

    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  const saveRecord = () => {
    const item = {
      date,
      category,
      expense,
      description
    };

    const updated = [...records, item];

    setRecords(updated);

    localStorage.setItem(
      "finance_records",
      JSON.stringify(updated)
    );

    setExpense("");
    setDescription("");
    setDate("");
  };

  const totalExpenses = records.reduce(
    (sum, r) => sum + Number(r.expense || 0),
    0
  );

  const remainingLoan = Math.max(
    Number(loanTotal || 0) -
      Number(loanPaid || 0),
    0
  );

  const balance =
    Number(income || 0) -
    totalExpenses -
    remainingLoan;

  let risk = "";
  let recommendation = "";

  if (balance < 0) {
    risk = "🔴 High";
    recommendation =
      "Reduce transportation and optional spending.";
  } else if (balance < 500) {
    risk = "🟠 Medium";
    recommendation =
      "Monitor travel and transportation expenses.";
  } else {
    risk = "🟢 Low";
    recommendation =
      "Financial status appears stable.";
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial"
      }}
    >
      <h1>
        💰 AI Financial Companion V3
      </h1>

      <hr />

      <h2>Income</h2>

      <input
        id="income"
        name="income"
        type="number"
        placeholder="Income (£)"
        value={income}
        onChange={(e) =>
          setIncome(e.target.value)
        }
      />

      <hr />

      <h2>Expense Entry</h2>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option>Transportation</option>
        <option>Food</option>
        <option>Bills</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Conference</option>
        <option>Emergency</option>
      </select>

      <br />
      <br />

      <input
        id="expense"
        name="expense"
        type="number"
        placeholder="Expense amount (£)"
        value={expense}
        onChange={(e) =>
          setExpense(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={saveRecord}>
        Save Record
      </button>

      <hr />

      <h2>Loan Tracking</h2>

      <input
        type="number"
        placeholder="Loan Total (£)"
        value={loanTotal}
        onChange={(e) =>
          setLoanTotal(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Loan Paid (£)"
        value={loanPaid}
        onChange={(e) =>
          setLoanPaid(e.target.value)
        }
      />

      <p>
        Status:
        {remainingLoan === 0
          ? " CLOSED ✅"
          : " ACTIVE 🔴"}
      </p>

      <hr />

      <h2>Savings Goal</h2>

      <input
        type="number"
        placeholder="Savings Goal (£)"
        value={savingGoal}
        onChange={(e) =>
          setSavingGoal(e.target.value)
        }
      />

      <hr />

      <h2>Dashboard Summary</h2>

      <p>
        Total Expenses:
        £{totalExpenses}
      </p>

      <p>
        Remaining Loan:
        £{remainingLoan}
      </p>

      <p>
        Current Balance:
        £{balance}
      </p>

      <p>
        Savings Goal:
        £{savingGoal}
      </p>

      <hr />

      <h2>🤖 Prediction</h2>

      <p>Risk: {risk}</p>

      <p>
        Recommendation:
        {recommendation}
      </p>

      <hr />

      <h2>Reporting</h2>

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
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.category}</td>
              <td>£{r.expense}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
