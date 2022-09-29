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
  const averagePointsDiv = document.createElement("div");
  averagePointsDiv.setAttribute("id", "average-points");

  const averagePointsHeaderDiv = document.createElement("div");
  averagePointsHeaderDiv.setAttribute("id", "average-points-header");
  averagePointsHeaderDiv.innerHTML = "Last 7 sprints:";

  const averagePointsCompletedDiv = document.createElement("div");
  averagePointsCompletedDiv.setAttribute("id", "average-points-completed");
  averagePointsCompletedDiv.innerHTML = `Average Points Completed: ${averagePointsCompleted()}`;

  const averagePointsCommittedDiv = document.createElement("div");
  averagePointsCommittedDiv.setAttribute("id", "average-points-committed");
  averagePointsCommittedDiv.innerHTML = `Average Points Committed: ${averagePointsCommitted()}`;

  averagePointsDiv.append(averagePointsHeaderDiv);
  averagePointsDiv.append(averagePointsCompletedDiv);
  averagePointsDiv.append(averagePointsCommittedDiv);

  // The header is currently empty on Jira, but has several segments,
  // so we're appending to the first one
  const chart_header = document.getElementById("ghx-chart-header-primary");
  chart_header.append(averagePointsDiv);
};

const averagePointsCompleted = () => {
  const rows = document
    .getElementById("ghx-chart-data")
    .querySelector("tbody")
    .querySelectorAll("tr");
  return Math.round(
    [...rows].reduce((sum, row) => {
      return sum + parseInt([...row.cells].at(2).innerHTML);
    }, 0) / rows.length
  );
};

const averagePointsCommitted = () => {
  const rows = document
    .getElementById("ghx-chart-data")
    .querySelector("tbody")
    .querySelectorAll("tr");
  return Math.round(
    [...rows].reduce((sum, row) => {
      return sum + parseInt([...row.cells].at(1).innerHTML);
    }, 0) / rows.length
  );
};

// Set configuration object:
const config = {
  subtree: true,
  childList: true,
  attributes: true,
};

// Start the observer
observer.observe(target, config);
