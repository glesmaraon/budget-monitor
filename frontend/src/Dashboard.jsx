import React, { useEffect, useState } from "react";

import IncomeTracker from "./components/IncomeTracker";
import ExpenseTracker from "./components/ExpenseTracker";
import LoanTracker from "./components/LoanTracker";
import PredictionEngine from "./components/PredictionEngine";
import ReportingDashboard from "./components/ReportingDashboard";

export default function Dashboard() {

  // Income
  const [incomeType, setIncomeType] =
  useState("Salary");

  const [incomeAmount, setIncomeAmount] =
  useState("");

  const [incomeRecords, setIncomeRecords] =
  useState([]);


  // Expenses

  const [category,setCategory] =
  useState("Transportation");

  const [expense,setExpense] =
  useState("");

  const [description,setDescription] =
  useState("");

  const [date,setDate] =
  useState("");

  const [records,setRecords] =
  useState([]);


  // Loan

  const [loanTotal,setLoanTotal] =
  useState("");

  const [loanPaid,setLoanPaid] =
  useState("");


  // Savings

  const [savingGoal,setSavingGoal] =
  useState("");



  useEffect(()=>{

    const savedIncome =

    localStorage.getItem(
      "income_records"
    );

    const savedExpenses =

    localStorage.getItem(
      "finance_records"
    );

    if(savedIncome){

      setIncomeRecords(
        JSON.parse(
          savedIncome
        )
      )

    }

    if(savedExpenses){

      setRecords(
        JSON.parse(
          savedExpenses
        )
      )

    }

  },[]);



  const saveIncome=()=>{

    if(!incomeAmount)
    return;


    const item={

      type:
      incomeType,

      amount:
      Number(
        incomeAmount
      ),

      date:
      new Date()
      .toLocaleDateString()

    }


    const updated=[

      ...incomeRecords,
      item

    ]


    setIncomeRecords(
      updated
    )


    localStorage.setItem(

      "income_records",

      JSON.stringify(
        updated
      )

    )


    setIncomeAmount("")

  }



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

    }


    const updated=[

      ...records,
      item

    ]


    setRecords(
      updated
    )


    localStorage.setItem(

      "finance_records",

      JSON.stringify(
        updated
      )

    )


    setExpense("")
    setDescription("")

  }



const totalIncome=

incomeRecords.reduce(

(sum,item)=>

sum+
Number(
item.amount||0
),

0

)



const totalExpenses=

records.reduce(

(sum,item)=>

sum+
Number(
item.expense||0
),

0

)


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

)


const balance=

totalIncome
-
totalExpenses
-
remainingLoan


const confidence=

records.length>=10

?95

:records.length>=5

?88

:75



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
💰 AI Financial Companion
</h1>

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
{(e)=>

setSavingGoal(
e.target.value
)

}

/>


<hr/>


<h2>
📊 Financial Dashboard
</h2>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"15px"

}}
>

<div style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px"
}}>

<h3>
💼 Income
</h3>

<h1>
£{totalIncome}
</h1>

</div>


<div style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px"
}}>

<h3>
💸 Expenses
</h3>

<h1>
£{totalExpenses}
</h1>

</div>


<div style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px"
}}>

<h3>
🏦 Loan
</h3>

<h1>
£{remainingLoan}
</h1>

</div>


<div style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px"
}}>

<h3>
💰 Balance
</h3>

<h1>
£{balance}
</h1>

</div>

</div>


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
