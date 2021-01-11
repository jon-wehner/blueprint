const searchButton = document.getElementById("search-btn");
const searchBar = document.getElementById("searchbar");
const searchResultDiv = document.getElementById("searchResults");
const resultsList = document.getElementById("searchResults");
const accordionArea = document.querySelector(".accordion-area");

const postSearch = async (payload) => {
  const response = await fetch("/home/search", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload
    });
    if (response.ok) {
      return await response.text()
    }
};

const displayResults = html => {
  resultsList.innerHTML = html;
  accordionArea.style.display= "none"
  searchResultDiv.style.display === "block"
  return
}

searchButton.addEventListener("click", async (e) => {
  const query = searchBar.value
  const payload = JSON.stringify({query : query});
  const response = await postSearch(payload);
  displayResults(response);
  })
