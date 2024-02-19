const transactionsList = document.getElementById("transactionsList");
const totalAmountElement = document.getElementById("totalAmount");
const totalExpenses = document.getElementById("expenses");
const totalBudget = document.getElementById("budget");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// document.getElementsByClassName("amount-color").classList.add("red-text"); 

function declareExpenses() {
  transactionsList.innerHTML = "";

  let totalExpensesAmount = 0;
  let totalBudgetAmount = 0;

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const transactionRow = document.createElement("tr");
    transactionRow.innerHTML = ` 
	<td>${transaction.name}</td> 
	<td class="amount-color">₦${transaction.amount}</td>
    <td>${transaction.date}</td>
    <td>${transaction.time}</td> 
	<td>${transaction.type}</td>
	`;
    transactionsList.appendChild(transactionRow);

    if (transaction.type === "expense") {
      totalExpensesAmount += parseFloat(transaction.amount);
    } else if (transaction.type === "budget") {
      totalBudgetAmount += parseFloat(transaction.amount);
    }
  }
  totalExpenses.innerHTML = `₦ ${totalExpensesAmount.toFixed(2)}`;
  totalBudget.innerHTML = `₦ ${totalBudgetAmount.toFixed(2)}`;

  localStorage.setItem("totalExpensesAmount", totalExpensesAmount.toFixed(2));
  localStorage.setItem("totalBudgetAmount", totalBudgetAmount.toFixed(2));


}

declareExpenses();
