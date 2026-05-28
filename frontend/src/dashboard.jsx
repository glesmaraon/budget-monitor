```jsx
import React, {
useEffect,
useMemo,
useState
} from "react";

import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell
} from "recharts";

export default function Dashboard(){

const [records,setRecords]=useState([]);

const [page,setPage]=useState(1);

const recordsPerPage=10;

const [form,setForm]=useState({

date:"",
type:"Expense",
category:"",
amount:""

});

useEffect(()=>{

const savedRecords=
localStorage.getItem(
"financialRecords"
);

if(savedRecords){

setRecords(
JSON.parse(savedRecords)
);

}

},[]);

useEffect(()=>{

localStorage.setItem(

"financialRecords",

JSON.stringify(records)

);

},[records]);

function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}

function addTransaction(){

if(

!form.date ||
!form.category ||
!form.amount

){

alert("Please complete all fields.");

return;

}

if(Number(form.amount)<=0){

alert("Amount must be greater than zero.");

return;

}

const duplicate=records.find(item=>

item.date===form.date &&
item.category===form.category &&
Number(item.amount)===Number(form.amount)

);

if(duplicate){

const proceed=window.confirm(

"Potential duplicate transaction detected. Save anyway?"

);

if(!proceed){

return;

}

}

const newRecord={

id:Date.now(),

...form,

amount:Number(form.amount)

};

setRecords([newRecord,...records]);

setForm({

date:"",
type:"Expense",
category:"",
amount:""

});

}

function deleteTransaction(id){

const confirmDelete=window.confirm(

"Delete this transaction?"

);

if(!confirmDelete){

return;

}

setRecords(

records.filter(item=>item.id!==id)

);

}

const totalIncome=useMemo(()=>{

return records

.filter(item=>item.type==="Income")

.reduce((a,b)=>a+b.amount,0);

},[records]);

const totalExpenses=useMemo(()=>{

return records

.filter(item=>item.type==="Expense")

.reduce((a,b)=>a+b.amount,0);

},[records]);

const balance=totalIncome-totalExpenses;

const yearlyGoal=10000;

const currentMonth=new Date().getMonth()+1;

const remainingMonths=12-currentMonth || 1;

const averageMonthlyExpenses=

totalExpenses/(currentMonth || 1);

const goalRemaining=

yearlyGoal-balance;

const recommendedSavings=

Math.max(

Math.round(

(goalRemaining/remainingMonths)
+
(averageMonthlyExpenses*0.10)

),

0

);

const confidence=

records.length>=30
?88
:records.length>=15
?78
:65;

const monthlyMap={};

records

.filter(item=>item.type==="Expense")

.forEach(item=>{

const month=item.date.slice(0,7);

if(!monthlyMap[month]){

monthlyMap[month]=0;

}

monthlyMap[month]+=item.amount;

});

const expenseTrendData=

Object.keys(monthlyMap).map(key=>({

month:key,

expenses:monthlyMap[key]

}));

const categoryMap={};

records

.filter(item=>item.type==="Expense")

.forEach(item=>{

if(!categoryMap[item.category]){

categoryMap[item.category]=0;

}

categoryMap[item.category]+=item.amount;

});

const pieData=

Object.keys(categoryMap).map(key=>({

name:key,

value:categoryMap[key]

}));

const COLORS=[

"#1e3a8a",
"#f59e0b",
"#0f766e",
"#dc2626",
"#9333ea"

];

const currentPageRecords=

records.slice(

(page-1)*recordsPerPage,

page*recordsPerPage

);

const totalPages=Math.ceil(

records.length/recordsPerPage

);

return(

<div className="min-h-screen bg-slate-100 p-4">

<div className="max-w-7xl mx-auto">

<h1 className="text-3xl font-bold text-blue-900 mb-6">

AI Financial Habit Intelligence Platform

</h1>

<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

<Card
title="Income"
value={`£${totalIncome}`}
color="text-green-600"
/>

<Card
title="Expenses"
value={`£${totalExpenses}`}
color="text-red-600"
/>

<Card
title="Balance"
value={`£${balance}`}
color="text-blue-700"
/>

<Card
title="Goal"
value={`£${yearlyGoal}`}
color="text-amber-600"
/>

<Card
title="Confidence"
value={`${confidence}%`}
color="text-purple-600"
/>

</div>

<div className="grid md:grid-cols-2 gap-6 mb-6">

<div className="bg-white rounded-2xl shadow p-5">

<h2 className="text-xl font-bold mb-4">

Monthly Expense Trend

</h2>

<div className="h-72">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={expenseTrendData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

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

<div className="bg-white rounded-2xl shadow p-5">

<h2 className="text-xl font-bold mb-4">

Expense Categories

</h2>

<div className="h-72">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>

{pieData.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

</div>

<div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl shadow p-6 mb-6">

<h2 className="text-2xl font-bold mb-4">

AI Financial Insight

</h2>

<p className="mb-2">

Recommended Monthly Savings:
£{recommendedSavings}

</p>

<p className="mb-2">

Forecast Confidence:
{confidence}%

</p>

<p className="mb-2">

Average Monthly Expenses:
£{Math.round(averageMonthlyExpenses)}

</p>

<p>

Based on your financial trend,
maintaining controlled discretionary spending
may improve yearly savings achievement.

</p>

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

{currentPageRecords.map(item=>(

<tr
key={item.id}
className="border-b hover:bg-slate-50"
>

<td className="p-2">{item.date}</td>

<td className="p-2">{item.type}</td>

<td className="p-2">{item.category}</td>

<td className="p-2">£{item.amount}</td>

<td className="p-2">

<button

onClick={()=>deleteTransaction(item.id)}

className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"

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

disabled={page===1}

onClick={()=>setPage(page-1)}

className="bg-slate-200 px-4 py-2 rounded-xl disabled:opacity-40"

>

Previous

</button>

<p>

Page {page} of {totalPages || 1}

</p>

<button

disabled={page===totalPages || totalPages===0}

onClick={()=>setPage(page+1)}

className="bg-slate-200 px-4 py-2 rounded-xl disabled:opacity-40"

>

Next

</button>

</div>

</div>

</div>

</div>

);

}

function Card({title,value,color}){

return(

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
