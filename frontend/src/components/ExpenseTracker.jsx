import React from "react";

export default function ExpenseTracker({
category,
setCategory,
expense,
setExpense,
description,
setDescription,
date,
setDate,
saveExpense
}){

return(

<div>

<h2>💸 Expenses</h2>

<select
value={category}
onChange={(e)=>
setCategory(e.target.value)
}
>

<option>Transportation</option>
<option>Food</option>
<option>Bills</option>
<option>Travel</option>
<option>Shopping</option>

</select>

<br/><br/>

<input
type="number"
placeholder="Expense (£)"
value={expense}
onChange={(e)=>
setExpense(e.target.value)
}
/>

<br/><br/>

<input
placeholder="Description"
value={description}
onChange={(e)=>
setDescription(e.target.value)
}
/>

<br/><br/>

<input
type="date"
value={date}
onChange={(e)=>
setDate(e.target.value)
}
/>

<button onClick={saveExpense}>
Save Expense
</button>

</div>

)

}
