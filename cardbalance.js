// localStorage.setItem("balanceData", JSON.stringify({ availableBalance: 0 }));

const addFundsButton = document.querySelector("#addBtn");
const popUpBox = document.querySelector("#popUp");
const closeIcon = document.querySelector("#close");
const availableBalance = document.querySelector("#availableBalance");
const balanceInput = document.querySelector("#amountInput");
const balanceForm = document.getElementById("addToAvailableBalance");
let savedData = JSON.parse(localStorage.getItem("balanceData"));
let initialBalance = savedData ? savedData.availableBalance : 0;
availableBalance.innerHTML = initialBalance.toFixed(2);
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

addFundsButton.addEventListener("click", (e) => {
  e.preventDefault();
  popUpBox.classList.toggle("hidden");
  popUpBox.classList.toggle("show");
});

closeIcon.addEventListener("click", (e) => {
  e.preventDefault();
  popUpBox.classList.add("hidden");
  popUpBox.classList.remove("show");
});

balanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newAmountToBeAdded = parseFloat(balanceInput.value) || 0;
  initialBalance += newAmountToBeAdded;
  availableBalance.innerHTML = initialBalance.toFixed(2);

  let balanceData = { availableBalance: initialBalance };
  localStorage.setItem("balanceData", JSON.stringify(balanceData));

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

  const budget = {
    name: "New budget",
    amount: newAmountToBeAdded,
    type: "budget",
    date: new Date().toLocaleDateString([], dateOptions),
    time: new Date().toLocaleTimeString([], timeOptions),
  };

  transactions.push(budget);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  balanceInput.value = "";
});
