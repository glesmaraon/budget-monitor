import React from "react";

export default function PredictionEngine({

balance,
remainingLoan,
totalIncome,
confidence

}){

let risk="";
let recommendation="";
let projection="";

if(balance<0){

risk="🔴 High";

recommendation=
"Spending exceeds income.";

projection=
"Deficit likely this month.";

}

else if(

remainingLoan>

totalIncome*.5

){

risk="🟠 Medium";

recommendation=
"Debt burden slowing savings.";

projection=
"Moderate financial pressure.";

}

else{

risk="🟢 Low";

recommendation=
"Financial status stable.";

projection=
"Goal achievable.";

}

return(

<div>

<h2>

🤖 AI Prediction

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

Recommendation:
{recommendation}

</p>

<p>

Projection:
{projection}

</p>

<p>

Confidence:
{confidence}%

</p>

</div>

</div>

)

}
