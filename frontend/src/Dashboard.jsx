import React from "react";

export default function ReportingDashboard({

records=[],
totalIncome,
totalExpenses,
balance

}){

const exportCSV=()=>{

if(records.length===0){

alert(
"No records available"
);

return;

}

const headers=[
"Date",
"Category",
"Expense",
"Description"
];

const rows=

records.map(

r=>

[
r.date,
r.category,
r.expense,
r.description

].join(",")

);

const csv=

[
headers.join(","),
...rows

].join("\n");


const blob=

new Blob(

[csv],

{

type:
"text/csv;charset=utf-8;"

}

);


const url=

URL.createObjectURL(
blob
);


const link=
document.createElement(
"a"
);

link.href=url;

link.download=
"Financial_Report.csv";

document.body.appendChild(
link
);

link.click();

document.body.removeChild(
link);

};


const mae=

records.length===0

?0

:

Math.abs(
balance
)*0.1;


const rmse=

Math.sqrt(
mae
).toFixed(2);


const completeness=

Math.min(

records.length*10,

100

);



return(

<div>

<h2>

📄 Reporting & Analytics

</h2>


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap:"15px",
marginBottom:"20px"
}}
>

<div style={{
padding:"20px",
borderRadius:"15px",
boxShadow:
"0 2px 8px rgba(0,0,0,.1)"
}}>

<h3>
💼 Income
</h3>

<h1>
£{totalIncome}
</h1>

</div>



<div style={{
padding:"20px",
borderRadius:"15px",
boxShadow:
"0 2px 8px rgba(0,0,0,.1)"
}}>

<h3>
💸 Expenses
</h3>

<h1>
£{totalExpenses}
</h1>

</div>


<div style={{
padding:"20px",
borderRadius:"15px",
boxShadow:
"0 2px 8px rgba(0,0,0,.1)"
}}>

<h3>
💰 Cashflow
</h3>

<h1>
£{balance}
</h1>

</div>

</div>



<h3>

📈 Validation Metrics

</h3>

<p>
MAE:
{mae.toFixed(2)}
</p>

<p>
RMSE:
{rmse}
</p>

<p>
Data Completeness:
{completeness}%
</p>


<button

style={{

padding:"12px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

}}

onClick={exportCSV}

>

⬇ Download Spreadsheet

</button>


<br/><br/>


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

<td>{item.date}</td>

<td>{item.category}</td>

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
