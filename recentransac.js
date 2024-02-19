const transactionsList = document.getElementById("recentTransactionsList");
let firstFiveTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [];
console.log(firstFiveTransactions);

function declareExpenses() {
  transactionsList.innerHTML = "";

  let totalAmount = 0;
  const sortedTransactions = transactions.sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const recentTransactions = sortedTransactions.slice(-5);

  for (let i = 0; i < recentTransactions.length; i++) {
    const transaction = recentTransactions[i];
    const transactionRow = document.createElement("tr");
    transactionRow.innerHTML = ` 
	<td>${transaction.name}</td> 
	<td>₦ ${transaction.amount}</td>
    <td>${transaction.date}</td>
    <td>${transaction.time}</td> 
	<td>${transaction.type}</td>
	`;
    transactionsList.appendChild(transactionRow);
    totalAmount += transaction.amount;
  }

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

declareExpenses();
