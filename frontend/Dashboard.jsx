<input
 id="income"
 name="income"
 type="number"
 placeholder="Income (£)"
 value={income}
 onChange={(e)=>setIncome(e.target.value)}
/>

<input
 id="expense"
 name="expense"
 type="number"
 placeholder="Expense amount (£)"
 value={expense}
 onChange={(e)=>setExpense(e.target.value)}
/>

<input
 id="loanTotal"
 name="loanTotal"
 type="number"
 placeholder="Loan total (£)"
 value={loanTotal}
 onChange={(e)=>setLoanTotal(e.target.value)}
/>

<input
 id="loanPaid"
 name="loanPaid"
 type="number"
 placeholder="Loan paid (£)"
 value={loanPaid}
 onChange={(e)=>setLoanPaid(e.target.value)}
/>

<input
 id="savingsGoal"
 name="savingsGoal"
 type="number"
 placeholder="Savings goal (£)"
 value={savingsGoal}
 onChange={(e)=>setSavingsGoal(e.target.value)}
/>
