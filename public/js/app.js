const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userLocation = searchElement.value;
  document.querySelector("#message1").textContent = "Loading...";

  fetch("/weather?address=" + userLocation).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.querySelector("#message1").textContent = data.error;
        document.querySelector("#message2").textContent = " ";
      } else {
        document.querySelector("#message1").textContent =
          "Location: " + data.location;
        document.querySelector("#message2").textContent = data.forecast;
      }
    });
  });
});
