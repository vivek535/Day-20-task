document.addEventListener('DOMContentLoaded', () => {
    // Weather API
    const weatherForm = document.getElementById('weather-form');
    const weatherResult = document.getElementById('weather-result');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = document.getElementById('city-input').value;
        getWeather(city);
    });

    function getWeather(city) {
        const apiKey = '9ffb80031b142175f1ea0efdb135543c'; // Provided API key
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.main && data.weather) {
                    weatherResult.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                    `;
                } else {
                    throw new Error('Incomplete data received');
                }
            })
            .catch(error => {
                weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                console.error('Error:', error);
            });
    }

    // RestCountries API
    const countryButton = document.getElementById('get-country-info');
    const countryResult = document.getElementById('country-result');

    countryButton.addEventListener('click', () => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const randomCountry = data[Math.floor(Math.random() * data.length)];
                countryResult.innerHTML = `
                    <h3>${randomCountry.name.common}</h3>
                    <p>Capital: ${randomCountry.capital ? randomCountry.capital[0] : 'N/A'}</p>
                    <p>Population: ${randomCountry.population.toLocaleString()}</p>
                    <p>Region: ${randomCountry.region}</p>
                `;
            })
            .catch(error => {
                countryResult.innerHTML = `<p>Error fetching country data: ${error.message}</p>`;
                console.error('Error:', error);
            });
    });

    // TypeFit Quotes API
    const quoteButton = document.getElementById('get-quote');
    const quoteResult = document.getElementById('quote-result');

    quoteButton.addEventListener('click', () => {
        fetch('https://type.fit/api/quotes')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                quoteResult.innerHTML = `
                    <p>"${randomQuote.text}"</p>
                    <p>- ${randomQuote.author || 'Unknown'}</p>
                `;
            })
            .catch(error => {
                quoteResult.innerHTML = `<p>Error fetching quote: ${error.message}</p>`;
                console.error('Error:', error);
            });
    });
});