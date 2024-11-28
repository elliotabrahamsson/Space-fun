let api_key = "VqgJwtssV6Tul7N7EYqDVmMxdXicOIX6mNDdMEFY";
let link = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

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

    const copyright = data.copyright;
    const img = data.url;
    const date = data.date;

    document.querySelector("body").innerHTML = `
    <img src=${img}>
    <p>${copyright}</p>
    <p>${date}</p>


    <input type="date" class="date">
    `;

    let userdate = document.querySelector("#date").value;
    console.log(userdate);
  });
