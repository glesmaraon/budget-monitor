```jsx
import React, { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function App() {

  const [records, setRecords] = useState([]);

  const [page, setPage] = useState(1);

  const recordsPerPage = 10;

  const [form, setForm] = useState({
    date: "",
    type: "Expense",
    category: "",
    amount: ""
  });

  useEffect(() => {

    const saved =
      localStorage.getItem("financialRecords");

    if (saved) {
      setRecords(JSON.parse(saved));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "financialRecords",
      JSON.stringify(records)
    );

  }, [records]);

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

      alert("Complete all fields.");
      return;

    }

    if (Number(form.amount) <= 0) {

      alert("Invalid amount.");
      return;

    }

    const duplicate = records.find(
      item =>
        item.date === form.date &&
        item.category === form.category &&
        Number(item.amount) === Number(form.amount)
    );

    if (duplicate) {

      const proceed = window.confirm(
        "Potential duplicate detected. Continue?"
      );

      if (!proceed) return;

    }

    const newRecord = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount)
    };

    setRecords([newRecord, ...records]);

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

    setRecords(
      records.filter(item => item.id !== id)
    );

  }

  const totalIncome = useMemo(() => {

    return records
      .filter(item => item.type === "Income")
      .reduce((a, b) => a + b.amount, 0);

  }, [records]);

  const totalExpenses = useMemo(() => {

    return records
      .filter(item => item.type === "Expense")
      .reduce((a, b) => a + b.amount, 0);

  }, [records]);

  const balance =
    totalIncome - totalExpenses;

  const monthlyDataMap = {};

  records
    .filter(item => item.type === "Expense")
    .forEach(item => {

      const month =
        item.date.slice(0, 7);

      if (!monthlyDataMap[month]) {
        monthlyDataMap[month] = 0;
      }

      monthlyDataMap[month] += item.amount;

    });

  const chartData =
    Object.keys(monthlyDataMap).map(key => ({
      month: key,
      expenses: monthlyDataMap[key]
    }));

  const currentPageRecords =
    records.slice(
      (page - 1) * recordsPerPage,
      page * recordsPerPage
    );

  const totalPages =
    Math.ceil(records.length / recordsPerPage);

  return (

    <div className="min-h-screen bg-slate-100 p-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-900 mb-6">

          AI Financial Habit Intelligence Platform

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <SummaryCard
            title="Income"
            value={`£${totalIncome}`}
            color="text-green-600"
          />

          <SummaryCard
            title="Expenses"
            value={`£${totalExpenses}`}
            color="text-red-600"
          />

          <SummaryCard
            title="Balance"
            value={`£${balance}`}
            color="text-blue-700"
          />

        </div>

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Monthly Expense Trend

          </h2>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#1e3a8a"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Add Transaction

          </h2>

          <div className="grid md:grid-cols-4 gap-3">

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border rounded-xl p-3"
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
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="border rounded-xl p-3"
            />

          </div>

          <button
            onClick={addTransaction}
            className="mt-4 bg-blue-800 hover:bg-blue-900 text-white px-5 py-3 rounded-xl"
          >

            Add Transaction

          </button>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <h2 className="text-xl font-bold mb-4">

            Transaction History

          </h2>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Action</th>

                </tr>

              </thead>

              <tbody>

                {currentPageRecords.map(item => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-2">
                      {item.date}
                    </td>

                    <td className="p-2">
                      {item.type}
                    </td>

                    <td className="p-2">
                      {item.category}
                    </td>

                    <td className="p-2">
                      £{item.amount}
                    </td>

                    <td className="p-2">

                      <button
                        onClick={() =>
                          deleteTransaction(item.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="flex justify-between mt-5">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-slate-200 px-4 py-2 rounded-xl"
            >

              Previous

            </button>

            <p>

              Page {page} of {totalPages || 1}

            </p>

            <button
              disabled={
                page === totalPages ||
                totalPages === 0
              }
              onClick={() => setPage(page + 1)}
              className="bg-slate-200 px-4 py-2 rounded-xl"
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

function SummaryCard({
  title,
  value,
  color
}) {

  return (

    <div className="bg-white rounded-2xl shadow p-5">

      <h2 className="text-gray-500 text-sm">

        {title}

      </h2>

      <p className={`text-2xl font-bold ${color}`}>

        {value}

      </p>

    </div>

  );

}
```
