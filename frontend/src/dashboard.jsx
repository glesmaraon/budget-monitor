import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Dashboard() {

const [type,setType]=useState("Expense");
const [category,setCategory]=useState("");
const [amount,setAmount]=useState("");

const [records,setRecords]=useState([]);

const addTransaction=()=>{

if(!amount || !category) return;

const transaction={

date:new Date().toLocaleDateString(),

type,

category,

amount:Number(amount)

};

setRecords([
...records,
transaction
]);

setCategory("");
setAmount("");

};

const totalIncome=
records
.filter(x=>x.type==="Income")
.reduce(
(sum,x)=>sum+x.amount,
0
);

const totalExpense=
records
.filter(x=>x.type==="Expense")
.reduce(
(sum,x)=>sum+x.amount,
0
);

const totalSavings=
records
.filter(x=>x.type==="Savings")
.reduce(
(sum,x)=>sum+x.amount,
0
);

const financialHealth=Math.max(
0,
Math.min(
100,
Math.round(
((totalIncome-totalExpense)
/(totalIncome||1))*100
)
)
);

const confidence=
records.length>=20
?90
:records.length>=10
?80
:60;

const realityScore=
records.length>=20
?90
:70;

const validation=
records.length;

const predictedSavings=
Math.max(
0,
(totalIncome-totalExpense)+totalSavings
);

const recommendation=
predictedSavings<100
? "Try saving £5/day"
: "You're on track 🎉";

const downloadReport=()=>{

const worksheet=
XLSX.utils.json_to_sheet(records);

const workbook=
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Transactions"
);

const excelBuffer=
XLSX.write(
workbook,
{
bookType:"xlsx",
type:"array"
}
);

saveAs(
new Blob([excelBuffer]),
"Gliza_Financial_Report.xlsx"
);

};

return(

<div style={{
padding:"30px",
fontFamily:"Arial"
}}>

<h1>
💰 Gliza Personal Financial Monitoring System
</h1>

<h3>
Welcome back! Build healthy financial habits.
</h3>

<hr/>

<h2>
⚡ Daily Tracker
</h2>

<select
value={type}
onChange={(e)=>
setType(e.target.value)
}
>

<option>Income</option>
<option>Expense</option>
<option>Savings</option>
<option>Loan</option>

</select>

<input
placeholder="Category"

value={category}

onChange={(e)=>
setCategory(e.target.value)
}
/>

<input

placeholder="Amount (£)"

value={amount}

onChange={(e)=>
setAmount(e.target.value)
}
/>

<button onClick={addTransaction}>
Add
</button>

<hr/>

<h2>
📊 Financial Overview
</h2>

<p>
Income: £{totalIncome}
</p>

<p>
Expenses: £{totalExpense}
</p>

<p>
Savings: £{totalSavings}
</p>

<p>
Financial Health:
{financialHealth}/100
</p>

<hr/>

<h2>
🤖 Forecast & Recommendation
</h2>

<p>
Success Chance:
{financialHealth}%
</p>

<p>
AI Confidence:
{confidence}%
</p>

<p>
Reality Score:
{realityScore}%
</p>

<p>
Validation:
{validation}
transactions analyzed
</p>

<p>
Predicted Savings:
£{predictedSavings}/month
</p>

<p>
Time Horizon:
Next 30 days
</p>

<p>
Recommendation:
{recommendation}
</p>

<hr/>

<h2>
📄 Daily Spend Records
</h2>

<table border="1"
cellPadding="10">

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

<td>
£{item.amount}
</td>

</tr>

)

)}

</tbody>

</table>

<br/>

<button
onClick={downloadReport}
>

⬇ Download Financial Report

</button>

</div>

)

}
