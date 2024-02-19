const totalExpensesAmount = parseFloat(
  localStorage.getItem("totalExpensesAmount") || "0"
);
const totalBudgetAmount = parseFloat(
  localStorage.getItem("totalBudgetAmount") || "0"
);

console.log("Total Expenses:", totalExpensesAmount);
console.log("Total Budget:", totalBudgetAmount);

const totalSavings = totalBudgetAmount - totalExpensesAmount;
console.log(totalSavings);

const newData = {
  labels: ["Savings", "Expenses"],
  datasets: [
    {
      label: "amount",
      data: [totalSavings, totalExpensesAmount],
      backgroundColor: ["#1DBABF", "red"],
      hoverOffset: 4,
    },
  ],
};

const newConfig = {
  type: "doughnut",
  data: newData,
};

const ctx = document.getElementById("savings-chart").getContext("2d");
const myChart = new Chart(ctx, newConfig);
