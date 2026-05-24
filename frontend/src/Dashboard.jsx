import React, { useEffect, useState } from "react";

import IncomeTracker from "./components/IncomeTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import LoanTracker from "./components/LoanTracker";
import PredictionEngine from "./components/PredictionEngine";
import ReportingDashboard from "./components/ReportingDashboard";

export default function Dashboard() {

  // -----------------------------
  // Income State
  // -----------------------------

  const [incomeType,setIncomeType]=useState("Salary");
  const [incomeAmount,setIncomeAmount]=useState("");
  const [incomeRecords,setIncomeRecords]=useState([]);

  // -----------------------------
  // Expense State
  // -----------------------------

  const [category,setCategory]=
  useState("Transportation");

  const [expense,setExpense]=
  useState("");

  const [description,setDescription]=
  useState("");

  const [date,setDate]=
  useState("");

  const [records,setRecords]=
  useState([]);

  // -----------------------------
  // Loan + Goal
  // -----------------------------

  const [loanTotal,setLoanTotal]=
  useState("");

  const [loanPaid,setLoanPaid]=
  useState("");

  const [savingGoal,setSavingGoal]=
  useState("");

  // -----------------------------
  // Load saved data
  // -----------------------------

  useEffect(()=>{

    const savedExpenses=
    localStorage.getItem(
      "finance_records"
    );

    const savedIncome=
    localStorage.getItem(
      "income_records"
    );

    if(savedExpenses){

      setRecords(
        JSON.parse(
          savedExpenses
        )
      );

    }

    if(savedIncome){

      setIncomeRecords(
        JSON.parse(
          savedIncome
        )
      );

    }

  },[]);


  // -----------------------------
  // Income Save
  // -----------------------------

  const saveIncome=()=>{

    if(!incomeAmount)
    return;

    const item={

      type:incomeType,

      amount:
      Number(
        incomeAmount
      ),

      date:
      new Date()
      .toLocaleDateString()

    };

    const updated=[

      ...incomeRecords,
      item

    ];

    setIncomeRecords(
      updated
    );

    localStorage.setItem(

      "income_records",

      JSON.stringify(
        updated
      )

    );

    setIncomeAmount("");

  };


  // -----------------------------
  // Expense Save
  // -----------------------------

  const saveExpense=()=>{

    if(
      !expense||
      !date
    )
    return;

    const item={

      date,

      category,

      expense:
      Number(
        expense
      ),

      description

    };

    const updated=[

      ...records,
      item

    ];

    setRecords(
      updated
    );

    localStorage.setItem(

      "finance_records",

      JSON.stringify(
        updated
      )

    );

    setExpense("");

    setDescription("");

  };


  // -----------------------------
  // Financial Stats
  // -----------------------------

  const totalIncome=

  incomeRecords.reduce(

    (sum,item)=>

    sum+
    Number(
      item.amount||0
    ),

    0

  );



  const totalExpenses=

  records.reduce(

    (sum,item)=>

    sum+
    Number(
      item.expense||0
    ),

    0

  );


  const remainingLoan=

  Math.max(

    Number(
      loanTotal||0
    )

    -

    Number(
      loanPaid||0
    ),

    0

  );


  const balance=

  totalIncome

  -

  totalExpenses

  -

  remainingLoan;


  const confidence=

  records.length>=10

  ?95

  :records.length>=5

  ?88

  :75;


  return(

<div
style={{

maxWidth:"1000px",

margin:"auto",

padding:"30px",

fontFamily:"Arial"

}}

>

<h1>

💰 AI Financial Companion V5

</h1>

<p>

Pragmatic Architecture +
Security +
Reporting +
Prediction

</p>

<hr/>


<IncomeTracker

incomeType=
{incomeType}

setIncomeType=
{setIncomeType}

incomeAmount=
{incomeAmount}

setIncomeAmount=
{setIncomeAmount}

saveIncome=
{saveIncome}

/>

<hr/>


<ExpenseTracker

category=
{category}

setCategory=
{setCategory}

expense=
{expense}

setExpense=
{setExpense}

description=
{description}

setDescription=
{setDescription}

date=
{date}

setDate=
{setDate}

saveExpense=
{saveExpense}

/>

<hr/>


<LoanTracker

loanTotal=
{loanTotal}

setLoanTotal=
{setLoanTotal}

loanPaid=
{loanPaid}

setLoanPaid=
{setLoanPaid}

remainingLoan=
{remainingLoan}

/>

<hr/>

<h2>

🎯 Savings Goal

</h2>

<input

type="number"

placeholder=
"Savings Goal (£)"

value=
{savingGoal}

onChange=
{

(e)=>

setSavingGoal(

e.target.value

)

}

/>

<hr/>

<h2>

📊 Dashboard Summary

</h2>

<p>
Total Income:
£{totalIncome}
</p>

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

<hr/>


<PredictionEngine

balance=
{balance}

remainingLoan=
{remainingLoan}

totalIncome=
{totalIncome}

confidence=
{confidence}

records=
{records}

/>

<hr/>


<ReportingDashboard

records=
{records}

totalIncome=
{totalIncome}

totalExpenses=
{totalExpenses}

balance=
{balance}

/>

</div>

)

}
