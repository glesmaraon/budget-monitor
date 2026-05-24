import React from "react";

export default function PredictionEngine({

balance,
remainingLoan,
totalIncome,
confidence

}){

let risk="";
let recommendation="";

if(balance<0){

risk="🔴 High";

recommendation=
"Spending exceeds available resources.";

}

else if(
remainingLoan>
totalIncome*.5
){

risk="🟠 Medium";

recommendation=
"Loan burden slowing financial growth.";

}

else{

risk="🟢 Low";

recommendation=
"Financial pattern stable.";

}

return(

<div>

<h2>

🤖 AI Prediction

</h2>

<p>

Risk:
{risk}

</p>

<p>

Recommendation:
{recommendation}

</p>

<p>

Confidence:
{confidence}%

</p>

</div>

)

}
