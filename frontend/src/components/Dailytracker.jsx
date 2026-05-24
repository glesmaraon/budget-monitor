import React from "react";

export default function DailyTracker({

records=[]

}){

const today=

new Date()
.toISOString()
.split("T")[0];


const dailyRecords=

records.filter(

r=>r.date===today

);


const dailyTotal=

dailyRecords.reduce(

(sum,item)=>

sum+

Number(
item.expense||0
),

0

);


return(

<div
style={{
padding:"20px",
borderRadius:"16px",
boxShadow:
"0 2px 10px rgba(0,0,0,.1)"
}}
>

<h2>

📅 Daily Tracker

</h2>

<h3>

Today's Spend:
£{dailyTotal}

</h3>

{

dailyRecords.length===0

?

<p>

No expenses today

</p>

:

dailyRecords.map(

(item,index)=>(

<div
key={index}
style={{
borderBottom:
"1px solid #eee",
padding:"8px"
}}
>

<strong>

{item.category}

</strong>

 — £{item.expense}

<br/>

{item.description}

</div>

)

)

}

</div>

)

}
