```jsx
import React, { useState } from "react";

export default function App() {

  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    date: "",
    type: "Expense",
    category: "",
    amount: ""
  });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  function addTransaction() {

    if (
      !form.date ||
      !form.category ||
      !form.amount
    ) {

      alert("Please complete all fields.");
      return;

    }

    const duplicate = transactions.find(
      item =>
        item.date === form.date &&
        item.category === form.category &&
        Number(item.amount) === Number(form.amount)
    );

    if (duplicate) {

      const proceed = window.confirm(
        "Potential duplicate transaction detected. Continue?"
      );

      if (!proceed) return;

    }

    const newTransaction = {
      id: Date.now(),
      ...form
    };

    setTransactions([
      newTransaction,
      ...transactions
    ]);

    setForm({
      date: "",
      type: "Expense",
      category: "",
      amount: ""
    });

  }

  function deleteTransaction(id) {

    const confirmDelete =
      window.confirm("Delete transaction?");

    if (!confirmDelete) return;

    setTransactions(
      transactions.filter(
        item => item.id !== id
      )
    );

  }

  const totalIncome = transactions
    .filter(item => item.type === "Income")
    .reduce(
      (a, b) => a + Number(b.amount),
      0
    );

  const totalExpenses = transactions
    .filter(item => item.type === "Expense")
    .reduce(
      (a, b) => a + Number(b.amount),
      0
    );

  const balance =
    totalIncome - totalExpenses;

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#1e3a8a",
          marginBottom: "20px"
        }}
      >

        AI Financial Habit Intelligence Platform

      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "25px"
        }}
      >

        <Card
          title="Income"
          value={`£${totalIncome}`}
          color="#16a34a"
        />

        <Card
          title="Expenses"
          value={`£${totalExpenses}`}
          color="#dc2626"
        />

        <Card
          title="Balance"
          value={`£${balance}`}
          color="#2563eb"
        />

      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "25px"
        }}
      >

        <h2 style={{ marginBottom: "15px" }}>
          Add Transaction
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "10px"
          }}
        >

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >

            <option>Income</option>
            <option>Expense</option>

          </select>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

        </div>

        <button
          onClick={addTransaction}
          style={{
            marginTop: "15px",
            background: "#1e3a8a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >

          Add Transaction

        </button>

      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px"
        }}
      >

        <h2 style={{ marginBottom: "15px" }}>
          Transaction History
        </h2>

        <table
          width="100%"
          cellPadding="10"
        >

          <thead>

            <tr
              style={{
                background: "#e2e8f0"
              }}
            >

              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map(item => (

              <tr key={item.id}>

                <td>{item.date}</td>

                <td>{item.type}</td>

                <td>{item.category}</td>

                <td>£{item.amount}</td>

                <td>

                  <button
                    onClick={() =>
                      deleteTransaction(item.id)
                    }
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

function Card({
  title,
  value,
  color
}) {

  return (

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px"
      }}
    >

      <h3
        style={{
          color: "#64748b"
        }}
      >

        {title}

      </h3>

      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: color
        }}
      >

        {value}

      </p>

    </div>

  );

}
```
