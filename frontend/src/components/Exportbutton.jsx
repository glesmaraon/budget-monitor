import React from "react";

export default function ExportButton({

records

}){

const exportCSV=()=>{

let csv=

"Date,Category,Expense,Description\n";

records.forEach(r=>{

csv+=

`${r.date},
${r.category},
${r.expense},
${r.description}\n`

});

const blob=

new Blob(
[csv]
);

const link=

document.createElement(
"a"
);

link.href=
URL.createObjectURL(
blob
);

link.download=
"budget-report.csv";

link.click();

};

return(

<button
onClick={exportCSV}
>

Export Spreadsheet

</button>

)

}
