 // Get element / reference
 const headingEl = document.querySelector("#headingTotal");
 const inputDescEl = document.querySelector("#inputDesc");
 const inputEl = document.querySelector("#inputAmount");
 const expenseTableEl = document.querySelector("#expenseTable");
 const element = document.querySelector("#btnAddExpense");
 let totalExpense = 0;
 headingEl.textContent = `Total: ${totalExpense}`;
 // callback-fun
 function addExpenseToTotal() {
   const expenseItem = {};
   const textAmount = inputEl.value;
   const textDesc = inputDescEl.value;
   const datetime= new Date();
   const expense = parseInt(textAmount, 10);
   if (textDesc !== "" && !isNaN(expense) && expense > 0) {
     expenseItem.desc = textDesc;
     expenseItem.amount = expense;
     expenseItem.moment = datetime;
    addExpenseOnFirestore(textDesc, expense, datetime);
    inputEl.value = "";
    inputDescEl.value = "";
   }
   totalExpense += expense;
   updateTotal();
 }
 // event-listner
 element.addEventListener("click", addExpenseToTotal, false);
 
 getDocuments();

 function myFunction() {
    db.collection("expenses").doc("total").get().then((doc) => {
        let someText = `Total: ${doc.data().total}`;
        headingEl.textContent = someText;
       })
}

window.onload = myFunction();


 // functions
 function getDateString(momento) {
   return momento.toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric"
   });
 }

 function updateTotal() {
   let someText = `Total: ${totalExpense}`;
   headingEl.textContent = someText;
 }

 function deleteItem(docId, expense) {
    deleteFromFirebase(docId, expense);
    totalExpense -= expense;
    updateTotal();
 }

 function renderlist(arrOfList) {
   const allExpensesHTML = arrOfList.map(expense =>
     createListItem(expense)
   );
   const joinedAllExpenseHTML = allExpensesHTML.join("");
   expenseTableEl.innerHTML = joinedAllExpenseHTML;
//    allExpenses = arrOfList;
 }
 // view-layer-tabledetails
 function createListItem({
   desc,
   amount,
   docId,
 }) {
   return `
             <li class="list-group-item d-flex justify-content-between">
                     <div class="d-flex flex-column">
                             ${desc}
                            
                     </div>
                     <div>
                         <span class="px-5">
                                 ${amount}
                         </span>
                         <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteItem('${docId}', ${amount})">
                             <i class="fas fa-trash-alt"></i>
                         </button>
                     </div>
                 </li>
             `;
             
 }


//  <small class="text-muted">${
//     datetime
//   }</small>