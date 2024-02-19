//localStorage.setItem("transactions", JSON.stringify([]));
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmountElement = document.getElementById("totalAmount");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let dateTime = JSON.parse(localStorage.getItem("dateTime")) || [];

function declareExpenses() {
  expenseList.innerHTML = "";
  let totalAmount = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const transactionRow = document.createElement("tr");
    transactionRow.innerHTML = ` 
      <td>${transaction.name}</td> 
      <td>₦ ${transaction.amount}</td>
      <td>${transaction.date}</td>
      <td>${transaction.time}</td>
      <td class="deleteBtn" data-id="₦{i}">Delete</td>`;
    expenseList.appendChild(transactionRow);
    totalAmount += transaction.amount;
  }
  totalAmountElement.innerHTML = totalAmount.toFixed(2);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addExpense(e) {
  e.preventDefault();
  const expenseNameInput = document.getElementById("expenseName");
  const expenseAmountInput = document.getElementById("expenseAmount");
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  if (expenseName === "" || isNaN(expenseAmount)) {
    alert("Please enter valid expense details.");
    return;
  }

  const dateOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const transaction = {
    name: expenseName,
    amount: expenseAmount,
    type: "expense",
    date: new Date().toLocaleDateString([], dateOptions),
    time: new Date().toLocaleTimeString([], timeOptions),
    timestamp: Date.now(),
  };

  transactions.push(transaction);
  declareExpenses();
  updateBalance(expenseAmountInput.value);

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
}

function deleteExpense(e) {
  if (e.target.classList.contains("deleteBtn")) {
    const expenseIndex = parseInt(e.target.getAttribute("data-id"));
    transactions.splice(expenseIndex, 1);
    declareExpenses();
  }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

declareExpenses();

function updateBalance(amount) {
  const newAmountToBeAdded = parseFloat(amount) || 0;
  const currentBalance = JSON.parse(localStorage.getItem("balanceData"));
  const newBalance = currentBalance.availableBalance - newAmountToBeAdded;
  let balanceData = { availableBalance: newBalance };
  //   console.log(balanceData);
  localStorage.setItem("balanceData", JSON.stringify(balanceData));
}
