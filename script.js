document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if(form){

        form.addEventListener("submit", function(event){

            event.preventDefault();

            alert("Thank you! Your message has been submitted successfully.");

            form.reset();

        });

    }


});
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
} 
// OpenWeatherMap API Key
const API_KEY = "038f327ef6e19b7c2d6b13c7a1dc89ec"; // <-- Apni OpenWeatherMap API Key yahan dalein

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loadingText = document.getElementById('loading-text');
const errorMsg = document.getElementById('error-msg');
const weatherInfo = document.getElementById('weather-info');

const cityName = document.getElementById('city-name');
const weatherDesc = document.getElementById('weather-desc');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeatherData(city);
  } else {
    showError("Please enter a city name.");
  }
});

// Async Function to Fetch Weather Data
async function getWeatherData(city) {
  // Reset UI Status
  resetUI();
  loadingText.classList.remove('hidden');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);

    // Check if network request failed (e.g., 404 City Not Found)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check spelling.");
      } else {
        throw new Error("Unable to fetch weather data. Try again later.");
      }
    }

    // Parsing complex nested JSON
    const data = await response.json();
    
    // Dynamically render data to DOM
    renderWeather(data);

  } catch (error) {
    // Handle errors dynamically
    showError(error.message);
  } finally {
    loadingText.classList.add('hidden');
  }
}

// Render Data Function
function renderWeather(data) {
  // Extracting data from nested JSON structure
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDesc.textContent = data.weather[0].description;
  temp.textContent = `${Math.round(data.main.temp)} °C`;
  humidity.textContent = `${data.main.humidity} %`;
  wind.textContent = `${data.wind.speed} m/s`;

  weatherInfo.classList.remove('hidden');
}

// Show Error Function
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}

// Reset UI
function resetUI() {
  loadingText.classList.add('hidden');
  errorMsg.classList.add('hidden');
  weatherInfo.classList.add('hidden');
}