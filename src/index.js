function formatDate(date) {
  let dateIndex = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${dateIndex}, ${hours}:${minutes}`;
}
let currentTime = new Date();
let dateElement = document.querySelector(".current-date");
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  if (cityName.value) {
    h1.innerHTML = `${cityName.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
  let units = "metric";
  let apiKey = "a995a1036d517aa4d70c6226c85fcce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  console.log(position);
  let h1 = document.querySelector("#city");
  //h1.innerHTML = `Current City`; still looking over the bonus point
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a995a1036d517aa4d70c6226c85fcce8";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}mph`;
  let descriptionElement = document.querySelector("#description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = `Description: ${description}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}
