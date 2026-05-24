import React from "react";

export default function LoanTracker({
loanTotal,
setLoanTotal,
loanPaid,
setLoanPaid,
remainingLoan
}){

return(

<div>

<h2>🏦 Loan Tracker</h2>

<input
type="number"
placeholder="Loan Total"
value={loanTotal}
onChange={(e)=>
setLoanTotal(e.target.value)
}
/>

<input
type="number"
placeholder="Loan Paid"
value={loanPaid}
onChange={(e)=>
setLoanPaid(e.target.value)
}
/>

<p>
Remaining:
£{remainingLoan}
</p>

</div>

)

}
