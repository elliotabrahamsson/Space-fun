let api_key = "VqgJwtssV6Tul7N7EYqDVmMxdXicOIX6mNDdMEFY";
const oldestDate = "1995-06-16";

function fetchData(date = "") {
  let link = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
  if (date) {
    link += `&date=${date}`;
  }

  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error("kunde inte hämta data" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        console.error("ingen data från servern");
        return;
      }
      console.log(data);
      getPicture(data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function getPicture(data) {
  const copyright = data.copyright;
  const img = data.url;
  const date = data.date;
  const title = data.title;
  const bio = data.explanation;

  document.querySelector("body").innerHTML = `
  <img src=${img}>
  <h2>${title}</h2>
  <p>${copyright}</p>
  <p>${date}</p>
  <p>${bio}</p>

  <input type="date" class="date" min="${oldestDate}" value="${date}">
  `;

  let userdate = document.querySelector(".date");
  userdate.addEventListener("change", (event) => {
    const selectDate = event.target.value;
    fetchData(selectDate);
    localStorage.setItem("lastVisited", selectDate);
    console.log("Saved date to localStorage:", selectDate);
  });
}

// Check localStorage for the last visited date
const lastVisited = localStorage.getItem("lastVisited");
console.log("Last visited date from localStorage:", lastVisited);
if (lastVisited) {
  fetchData(lastVisited);
} else {
  fetchData();
}
