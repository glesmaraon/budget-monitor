```jsx id="1rf8qk"
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
          padding: "20px"
        }}
      >

        <h2>Add Transaction</h2>

        <div
          style={{
            display: "grid",
            gap: "10px",
            marginTop: "15px"
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

          <button
            onClick={addTransaction}
            style={{
              background: "#1e3a8a",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "10px"
            }}
          >

            Add Transaction

          </button>

        </div>

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

      <h3>{title}</h3>

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
