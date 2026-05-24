import React from "react";

export default function IncomeTracker({
incomeType,
setIncomeType,
incomeAmount,
setIncomeAmount,
saveIncome
}){

return(

<div>

<h2>💼 Income Sources</h2>

<select
value={incomeType}
onChange={(e)=>
setIncomeType(e.target.value)
}
>

<option>Salary</option>
<option>Project</option>
<option>Freelance</option>
<option>Research</option>
<option>Allowance</option>

</select>

<br/><br/>

<input
type="number"
placeholder="Income (£)"
value={incomeAmount}
onChange={(e)=>
setIncomeAmount(e.target.value)
}
/>

<button onClick={saveIncome}>
Add Income
</button>

</div>

)

}
