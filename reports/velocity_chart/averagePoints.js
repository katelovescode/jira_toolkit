const target = document.querySelector("body");

const observer = new MutationObserver(function (mutations) {
  // The 'ghx-chart-data' id only loads ONCE in the mutation operations
  // as of 9/23/2022 - if that changes this will need to change or it will
  // append multiple times
  waitForChartData(mutations);
});

const waitForChartData = (mutations) => {
  const chartData = mutations.filter(
    (mutation) => mutation.target.id === "ghx-chart-data"
  );
  if (chartData.length > 0) {
    createAveragePointsDiv();
  }
};

const createAveragePointsDiv = () => {
  const average_points_div = document.createElement("div");
  average_points_div.setAttribute("id", "average-points");
  average_points_div.innerHTML = averagePoints();
  // The header is currently empty on Jira, but has several segments,
  // so we're appending to the first one
  const chart_header = document.getElementById("ghx-chart-header-primary");
  chart_header.append(average_points_div);
};

const averagePoints = () => {
  return "Test this guy";
};

// Set configuration object:
const config = {
  subtree: true,
  childList: true,
  attributes: true,
};

// Start the observer
observer.observe(target, config);
