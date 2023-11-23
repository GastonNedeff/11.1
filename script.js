document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('consultButton');
    button.addEventListener('click', consultarTiempo);
  });
  
  function consultarTiempo() {
    const apiKey = '40ac0b74472e950cb5d429f0ee146341'; 
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
  
    if (!city) {
      alert('Por favor, ingrese el nombre de una ciudad.');
      return;
    }
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temperature = Math.round(data.main.temp);
        const description = traducirDescripcion(data.weather[0].description);
  
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
  
        temperatureElement.innerHTML = `Temperatura actual en ${city}: ${temperature}°C`;
        descriptionElement.innerHTML = `Descripción del clima: ${description}`;
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }
  
  function traducirDescripcion(description) {
    const traducciones = {
      'clear sky': 'cielo despejado',
      'few clouds': 'pocas nubes',
      'scattered clouds': 'nubes dispersas',
      'broken clouds': 'nubes rotas',
      'overcast clouds': 'cielo nublado',
      'light rain': 'lluvia ligera',
      'moderate rain': 'lluvia moderada',
      'heavy intensity rain': 'lluvia intensa',
      'very heavy rain': 'lluvia muy intensa',
      'extreme rain': 'lluvia extrema',
      'freezing rain': 'lluvia helada',
      'light snow': 'nieve ligera',
      'moderate snow': 'nieve moderada',
      'heavy snow': 'nieve intensa',
      'sleet': 'aguanieve',
      'shower rain': 'lluvia intensa',
      'thunderstorm with light rain': 'tormenta con lluvia ligera',
      'thunderstorm with rain': 'tormenta con lluvia',
      'thunderstorm with heavy rain': 'tormenta con lluvia intensa',
      'thunderstorm with drizzle': 'tormenta con llovizna',
      'thunderstorm with snow': 'tormenta con nieve',
      'thunderstorm with heavy snow': 'tormenta con nieve intensa'
    };
  
    return traducciones[description] || description;
  }
  