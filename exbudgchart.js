const transactions_ = JSON.parse(localStorage.getItem("transactions"));
let expenses_ = [];
let budgets_ = [];
const onlyExpenses = transactions_.map((tx) => {
  if (tx.type == "expense") {
    expenses_.push(tx.amount);
  }
});

const onlyBudgets = transactions_.map((tx) => {
  if (tx.type == "budget") {
    budgets_.push(tx.amount);
  }
});

console.log(expenses_);

const labels = [
  "Rent",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Miscellaneous",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Budget",
      data: budgets_,
      fill: false,
      borderColor: "#1DBABF",
      tension: 0.1,
    },
    {
      label: "Expenses",
      data: expenses_,
      fill: false,
      borderColor: "red",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
};

const budgetExpenseChart = new Chart(
  document.getElementById("budgetExpenseChart"),
  config
);
