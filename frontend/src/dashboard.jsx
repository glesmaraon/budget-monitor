import { useState } from "react";

export default function Dashboard() {

const [category,setCategory]=useState("");
const [amount,setAmount]=useState("");

const [expenses,setExpenses]=useState([]);

const addExpense=()=>{

if(!amount) return;

const newExpense={

date:new Date().toLocaleDateString(),

category,

amount

};

setExpenses([
...expenses,
newExpense
]);

setCategory("");
setAmount("");

};

return(

<div style={{padding:"30px"}}>

<h1>
💰 Gliza Personal Financial Monitoring System
</h1>

<h2>⚡ Daily Tracker</h2>

<select
value={category}
onChange={(e)=>
setCategory(e.target.value)}
>

<option>
Transportation
</option>

<option>
Food
</option>

<option>
Shopping
</option>

<option>
Bills
</option>

</select>

<input

placeholder="Expense (£)"

value={amount}

onChange={(e)=>
setAmount(e.target.value)}

 />

<button onClick={addExpense}>
Add Expense
</button>

<hr/>

<h2>🤖 Forecast & Recommendation</h2>

<p>
Validation:
{expenses.length}
transactions analyzed
</p>

<p>
Confidence:
70%
</p>

<p>
Predicted Savings:
£260/month
</p>

<hr/>

<h2>
📄 Daily Spend Records
</h2>

<table border="1">

<thead>

<tr>

<th>Date</th>

<th>Category</th>

<th>Expense</th>

</tr>

</thead>

<tbody>

{expenses.map(
(item,index)=>(

<tr key={index}>

<td>{item.date}</td>

<td>{item.category}</td>

<td>
£{item.amount}
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}
