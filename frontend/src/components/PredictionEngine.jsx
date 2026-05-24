import React from "react";

export default function PredictionEngine({

balance,
remainingLoan,
totalIncome,
confidence,
records=[]

}){

let risk="";
let recommendation="";
let projection="";
let nextDecision="";

const transportTotal=

records
.filter(
r=>
r.category==="Transportation"
)
.reduce(
(sum,r)=>
sum+
Number(
r.expense||0
),
0
);


if(balance<0){

risk="🔴 High";

projection=
"Negative cashflow expected.";

recommendation=
"Reduce non-essential expenses immediately.";

nextDecision=
"Delay large purchases and prioritize debt repayment.";

}

else if(
remainingLoan>
totalIncome*0.5
){

risk="🟠 Medium";

projection=
"Loan burden affecting growth.";

recommendation=
"Prioritize loan reduction over discretionary spending.";

nextDecision=
"Allocate 20–30% of available funds toward loans.";

}

else if(
transportTotal>
200
){

risk="🟡 Moderate";

projection=
"Transportation spending trend increasing.";

recommendation=
"Transportation costs exceed expected pattern.";

nextDecision=
"Reduce transport spending or combine trips.";

}

else{

risk="🟢 Low";

projection=
"Financial outlook stable.";

recommendation=
"Savings target remains achievable.";

nextDecision=
"Continue saving surplus funds.";

}


return(

<div>

<h2>

🤖 AI Forecast & Recommendation

</h2>

<div
style={{
padding:"15px",
border:"1px solid #ddd",
borderRadius:"10px"
}}
>

<p>

Risk:
{risk}

</p>

<p>

Forecast:
{projection}

</p>

<p>

Recommendation:
{recommendation}

</p>

<p>

Next Decision:
{nextDecision}

</p>

<p>

Confidence:
{confidence}%

</p>

</div>

</div>

)

}
