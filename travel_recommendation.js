// Global variable to store fetched data
let travelData = {};

// Fetch data from the JSON file
fetch("./travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    return response.json();
  })
  .then((data) => {
    travelData = data;

    console.log("Fetched Data:", data);
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayRecommendations() {
  const searchInput = document
    .getElementById("search")
    .value.toLowerCase()
    .trim();
  const resultsContainer = document.getElementById("recommendations-container");
  resultsContainer.innerHTML = "";

  if (!searchInput) {
    resultsContainer.textContent = "Please enter a keyword to search.";
    return;
  }

  // Map keywords to categories
  const keywordMappings = {
    beach: "beach",
    beaches: "beach",
    temple: "temple",
    temples: "temple",
    country: "country",
    countries: "country",
  };

  const category = keywordMappings[searchInput];
  if (!category || !travelData[category]) {
    resultsContainer.textContent = "No results found for the entered keyword.";
    return;
  }

  // Display at least two recommendations
  const recommendations = travelData[category].slice(0, 2); // Limit to 2 items
  recommendations.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    const img = document.createElement("img");
    img.src = `images/${item.imageUrl}`;
    img.alt = item.name;

    const name = document.createElement("h3");
    name.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    resultsContainer.appendChild(card);
  });

  if (item.timezone) {
    getTimeForCountry(item.timezone, item.name);
  } else {
    resultsContainer.style.display = "block";
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

function getTimeForCountry(timezone, countryName) {
  const timeUrl = `https://worldtimeapi.org/api/timezone/${timezone}`;

  fetch(timeUrl)
    .then((response) => response.json())
    .then((data) => {
      const timeElement = document.getElementById(`time-${countryName}`);
      const time = new Date(data.datetime);
      const hours = time.getHours();
      const minutes = time.getMinutes().toString().padStart(2, "0");
      const seconds = time.getSeconds().toString().padStart(2, "0");

      timeElement.innerHTML = `Current time in ${countryName}: ${hours}:${minutes}:${seconds}`;
    })
    .catch((error) => {
      console.error("Error fetching time:", error);
    });
}

function resetSearch() {
  document.getElementById("search").value = "";
  const resultsContainer = document.getElementById("recommendations-container");
  resultsContainer.innerHTML = "";
}

// Add event listeners to buttons
document
  .getElementById("searchButton")
  .addEventListener("click", displayRecommendations);
document.getElementById("resetButton").addEventListener("click", resetSearch);

//clear

document.getElementById("resetButton").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  console.log("Search cleared");
});
