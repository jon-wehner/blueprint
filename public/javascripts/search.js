const searchButton = document.getElementById("search-btn");
const searchBar = document.getElementById("searchbar");
const searchResultDiv = document.getElementById("searchResults");
const resultsList = document.getElementById("searchResultList");
const accordionArea = document.getElementById("accordion-area");

const postSearch = async (payload) => {
  const response = await fetch("/home/search", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload
    });
    if (response.ok) {
      return response
    }
};

const displayResults = html => {
  resultsList.innerHTML = html;
  accordionArea.classList.add("hidden-form")
  searchResultDiv.style.display === block
  return
}

searchButton.addEventListener("click", async (e) => {
  const query = searchBar.value
  const payload = JSON.stringify({query : query});
  const response = await postSearch(payload);
  displayResults(response);
  })
