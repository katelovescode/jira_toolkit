console.log("Hi I'm on a Jira Velocity Chart Report");

const target = document.querySelector("body");

const observer = new MutationObserver(function (mutations, observer) {
  const chartData = mutations.filter(
    (mutation) => mutation.target.id === "ghx-chart-data"
  );
  if (chartData.length > 0) {
    const avg_par = document.createElement("p");
    avg_par.innerHTML = "Test This Guy";
    const chart_header = document.getElementById("ghx-chart-header");
    chart_header.append(avg_par);
  }
});

// Set configuration object:
const config = {
  subtree: true,
  childList: true,
  attributes: true,
};

// Start the observer
observer.observe(target, config);
