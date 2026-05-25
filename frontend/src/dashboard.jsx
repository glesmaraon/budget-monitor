import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Transportation");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [income, setIncome] = useState("");
  const [loanType, setLoanType] = useState("Student Loan");
  const [loanAmount, setLoanAmount] = useState("");
  const [savingGoal, setSavingGoal] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ai_transactions");

    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  function addTransaction() {
    if (!amount) return;

    const newItem = {
      id: Date.now(),
      date: selectedDate,
      type,
      category,
      amount: Number(amount),
      description
    };

    const updated = [newItem, ...transactions];

    setTransactions(updated);

    localStorage.setItem(
      "ai_transactions",
      JSON.stringify(updated)
    );

    setAmount("");
    setDescription("");
  }

  const totalIncome =
    Number(income || 0) +
    transactions
      .filter(t => t.type === "Income")
      .reduce((a, b) => a + b.amount, 0);

  const totalExpenses =
    transactions
      .filter(t => t.type === "Expense")
      .reduce((a, b) => a + b.amount, 0);

  const balance =
    totalIncome -
    totalExpenses -
    Number(loanAmount || 0);

  function topHabit() {
    const groups = {};

    transactions.forEach(t => {
      if (t.type === "Expense") {
        groups[t.category] =
          (groups[t.category] || 0)
          + t.amount;
      }
    });

    const sorted =
      Object.entries(groups)
      .sort((a,b)=>b[1]-a[1]);

    return sorted.length
      ? sorted[0][0]
      : "No data";
  }

  function forecast() {

    if(transactions.length<5){

      return "AI needs more diary entries";
    }

    const average =
      totalExpenses /
      transactions.length;

    return `Predicted monthly spending: £${Math.round(
      average * 30
    )}`;
  }

  function recommendation(){

    if(balance<0){

      return "⚠ Overspending detected. Reduce optional spending.";

    }

    if(topHabit()==="Transportation"){

      return "🚇 Transportation is your strongest spending habit.";

    }

    if(topHabit()==="Food"){

      return "🍜 Food spending trend increasing.";

    }

    if(Number(savingGoal)>balance){

      return "🎯 Current savings goal may be difficult at present spending.";

    }

    return "📈 Spending behavior currently stable.";
  }

  function exportExcel(){

    const rows=[
      [
        "Date",
        "Type",
        "Category",
        "Amount",
        "Description"
      ]
    ];

    transactions.forEach(item=>{

      rows.push([

        item.date,
        item.type,
        item.category,
        item.amount,
        item.description

      ]);

    });

    const ws =
      XLSX.utils.aoa_to_sheet(rows);

    const wb =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      wb,
      ws,
      "Transactions"
    );

    XLSX.writeFile(
      wb,
      "Diary_Report.xlsx"
    );

  }

  return (
    <div
      style={{
        background:"#F3F6FB",
        minHeight:"100vh",
        padding:"25px",
        fontFamily:"Arial"
      }}
    >

      <div
        style={{
          background:"#111827",
          color:"white",
          padding:"30px",
          borderRadius:"20px"
        }}
      >

        <h1>
          📔 My Diary Habit Spending Analyzer
        </h1>

        <p>
          Track • Analyze • Predict • Improve
        </p>

      </div>


      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(4,1fr)",
          gap:"20px",
          marginTop:"25px"
        }}
      >

      {[
        {
          title:"💼 Income",
          value:`£${totalIncome}`
        },
        {
          title:"💸 Expenses",
          value:`£${totalExpenses}`
        },
        {
          title:"🏦 Loan",
          value:`£${loanAmount||0}`
        },
        {
          title:"💰 Balance",
          value:`£${balance}`
        }

      ].map((card,index)=>(

      <div
      key={index}
      style={{
        background:"white",
        padding:"35px",
        borderRadius:"20px",
        boxShadow:
        "0 4px 12px rgba(0,0,0,.08)"
      }}
      >

      <h2>{card.title}</h2>

      <h1>
      {card.value}
      </h1>

      </div>

      ))}

      </div>


      <div
      style={{
        background:"white",
        marginTop:"25px",
        padding:"30px",
        borderRadius:"20px"
      }}
      >

      <h1>
      ⚡ Transaction Entry
      </h1>


      <div
      style={{
      display:"grid",
      gridTemplateColumns:
      "repeat(4,1fr)",
      gap:"15px",
      marginTop:"20px"
      }}
      >

      <input
      type="date"
      value={selectedDate}
      onChange={(e)=>
      setSelectedDate(
      e.target.value
      )}
      />

      <select
      value={type}
      onChange={(e)=>
      setType(
      e.target.value
      )}
      >
      <option>Expense</option>
      <option>Income</option>
      </select>


      <select
      value={category}
      onChange={(e)=>
      setCategory(
      e.target.value
      )}
      >
      <option>Transportation</option>
      <option>Food</option>
      <option>Bills</option>
      <option>Shopping</option>
      <option>Salary</option>
      <option>Project</option>
      </select>


      <input
      type="number"
      placeholder="Amount (£)"
      value={amount}
      onChange={(e)=>
      setAmount(
      e.target.value
      )}
      />


      <input
      placeholder="Description"
      value={description}
      onChange={(e)=>
      setDescription(
      e.target.value
      )}
      />


      <select
      value={loanType}
      onChange={(e)=>
      setLoanType(
      e.target.value
      )}
      >
      <option>Student Loan</option>
      <option>Mortgage</option>
      <option>Credit Card</option>
      <option>Personal Loan</option>
      </select>


      <input
      placeholder="Loan (£)"
      value={loanAmount}
      onChange={(e)=>
      setLoanAmount(
      e.target.value
      )}
      />


      <input
      placeholder="Savings Goal (£)"
      value={savingGoal}
      onChange={(e)=>
      setSavingGoal(
      e.target.value
      )}
      />

      </div>


      <input
      style={{
      width:"100%",
      marginTop:"15px",
      padding:"12px"
      }}
      placeholder="Base Income (£)"
      value={income}
      onChange={(e)=>
      setIncome(
      e.target.value
      )}
      />


      <div
      style={{
      display:"flex",
      justifyContent:"center",
      marginTop:"20px"
      }}
      >

      <button
      onClick={addTransaction}
      style={{
      background:"#111827",
      color:"white",
      border:"none",
      borderRadius:"12px",
      padding:"15px 50px",
      cursor:"pointer"
      }}
      >

      + Add Transaction

      </button>

      </div>

      </div>


      <div
      style={{
      background:"white",
      marginTop:"25px",
      padding:"25px",
      borderRadius:"20px"
      }}
      >

      <h2>🤖 AI Analysis</h2>

      <p><b>Habit:</b> {topHabit()}</p>

      <p><b>Forecast:</b> {forecast()}</p>

      <p><b>Recommendation:</b> {recommendation()}</p>

      </div>


      <div
      style={{
      background:"white",
      marginTop:"25px",
      padding:"25px",
      borderRadius:"20px"
      }}
      >

      <button
      onClick={exportExcel}
      style={{
      background:"#0F766E",
      color:"white",
      border:"none",
      padding:"12px",
      borderRadius:"10px"
      }}
      >

      ⬇ Download Report

      </button>


      <table
      width="100%"
      border="1"
      cellPadding="10"
      style={{
      marginTop:"20px"
      }}
      >

      <thead>

      <tr>
      <th>Date</th>
      <th>Type</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Description</th>
      </tr>

      </thead>

      <tbody>

      {transactions.length===0?

      <tr>

      <td colSpan="5">
      No records available
      </td>

      </tr>

      :

      transactions.map(item=>(

      <tr key={item.id}>

      <td>{item.date}</td>
      <td>{item.type}</td>
      <td>{item.category}</td>
      <td>£{item.amount}</td>
      <td>{item.description}</td>

      </tr>

      ))

      }

      </tbody>

      </table>

      </div>

    </div>
  );
}
