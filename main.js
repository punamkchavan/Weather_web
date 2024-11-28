 
async function fetchWeatherData(city) {
  const apiKey = "fcc8de7015bbb202209bbf0261babf4c";  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      updateWeatherUI(data);
      updateBackgroundByWeather(data.weather[0].main);
  } catch (error) {
      console.error("Error fetching weather data:", error.message);
      alert("Unable to fetch weather data. Please check the city name or try again later.");
  }
}

 
function updateBackgroundByWeather(weatherCondition) {
    const weatherApp = document.querySelector(".weather-app");

    let backgroundImage;
    switch (weatherCondition.toLowerCase()) {
        case "clear":
            backgroundImage = "url('images/clearday.jpg')";  
            break;
        case "clouds":
            backgroundImage = "url('images/cloudy.jpg')"; 
            break;
        case "rain":
        case "drizzle":
            backgroundImage = "url('images/rainy.jpg')"; 
            break;
        case "thunderstorm":
            backgroundImage = "url('images/thunderstorm.jpg')"; // Thunderstorm image
            break;
        case "snow":
            backgroundImage = "url('images/snow.jpg')"; // Snow image
            break;
        default:
            backgroundImage = "url('images/sunny.jpg')"; // Default image
            break;
    }

    // Apply the background image
    weatherApp.style.backgroundImage = backgroundImage;
    weatherApp.style.backgroundSize = "cover";
    weatherApp.style.backgroundPosition = "center";
    weatherApp.style.transition = "background 0.5s ease-in-out";
}

// Update the weather UI (unchanged from your existing code)
function updateWeatherUI(data) {
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}&#176`;
    document.querySelector(".name").textContent = data.name;
    document.querySelector(".condition").textContent = data.weather[0].description;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
    document.querySelector(".cloud").textContent = `${data.clouds.all}%`;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector(".icon").setAttribute("src", iconUrl);
    const now = new Date();
    document.querySelector(".time").textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelector(".date").textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
}

document.querySelector("#locationInput").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector(".search").value.trim();
  if (city) {
      fetchWeatherData(city);
      document.querySelector(".search").value = "";
  } else {
      alert("Please enter a city name!");
  }
});

document.querySelectorAll(".cities .city").forEach(cityButton => {
  cityButton.addEventListener("click", () => {
      const city = cityButton.textContent.trim();
      fetchWeatherData(city);
  });
});

 
fetchWeatherData("London");
