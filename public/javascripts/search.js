const searchButton = document.getElementById("search-btn")
const searchBar = document.getElementById("searchbar")

const postSearch = async (payload) => {
  const response = await fetch("/home/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload
    });
    return
};

searchButton.addEventListener("click", e => {
  const query = searchBar.value
  const payload = JSON.stringify({query : query})
  console.log(payload)

  postSearch(payload)
  })
