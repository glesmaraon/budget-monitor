import React from "react";

export default function ReportingDashboard({

records,
totalIncome,
totalExpenses,
balance

}){

return(

<div>

<h2>
📄 Financial Report
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
Net Cashflow:
£{balance}
</p>

<br/>

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

{

records.length===0

?

<tr>

<td
colSpan="4"
>

No financial records yet

</td>

</tr>

:

records.map(

(item,index)=>(

<tr
key={index}
>

<td>
{item.date}
</td>

<td>
{item.category}
</td>

<td>
£{item.expense}
</td>

<td>
{item.description}
</td>

</tr>

)

)

}

</tbody>

</table>

</div>

)

}
