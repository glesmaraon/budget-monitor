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
📄 Reporting
</h2>

<div
style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px",
marginBottom:"20px"
}}
>

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

</div>

<table
style={{

width:"100%",
borderCollapse:"collapse"

}}
border="1"
>

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
style={{
padding:"15px",
textAlign:"center"
}}
>

No records available

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
