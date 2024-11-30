let api_key = "VqgJwtssV6Tul7N7EYqDVmMxdXicOIX6mNDdMEFY";

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
    });
}

function getPicture(data) {
  const copyright = data.copyright;
  const img = data.url;
  const date = data.date;
  const title = data.title;

  let todayDate = new Date().toISOString().split("T")[0];
  document.querySelector("body").innerHTML = `
  <img src=${img}>
  <h2>${title}</h2>
  <p>${copyright}</p>
  <p>${date}</p>


  <input type="date" class="date">
  `;

  let userdate = document.querySelector(".date");
  userdate.addEventListener("change", (event) => {
    const selectDate = event.target.value;
    fetchData(selectDate);
    console.log(selectDate);
  });
}

fetchData();
