const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
search.focus();
const message = document.querySelector(".description");
const area = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const feelslike = document.querySelector(".feelslike");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  search.value = "";
  fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.message) {
        message.innerHTML = data.message;
        area.innerHTML = "";
        temperature.innerHTML = "";
        feelslike.innerHTML = "";
      } else {
        message.innerHTML = data.result.description;
        area.innerHTML = data.result.location;
        temperature.innerHTML =
          "Current temperature is <strong>" +
          data.result.temperature +
          " degree celcius</strong>.";
        feelslike.innerHTML =
          "But it feels like <strong>" +
          data.result.feelslike +
          " degree celcius</strong>.";
        return;
      }
    });
  });
});
