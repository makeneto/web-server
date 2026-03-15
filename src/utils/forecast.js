const request = require('request')

function weathercodeToText(code) {
    const map = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Snow fall',
        80: 'Rain showers',
        95: 'Thunderstorm'
    }
    return map[code] || 'Weather data'
}

function forecast(latitude, longitude, callback) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`

    request({ url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            return callback('Unable to connect to weather service!')
        }

        if (!response || response.statusCode !== 200) {
            return callback(`Weather service error (${response ? response.statusCode : 'unknown'}). Tente novamente mais tarde.`)
        }

        const body = response.body
        if (!body || !body.current_weather) {
            return callback('Unable to get weather data!')
        }

        const { temperature, windspeed, weathercode } = body.current_weather
        const description = weathercodeToText(weathercode)
        callback(undefined, `${description}. It is currently ${temperature}°C with wind speed ${windspeed} km/h.`)
    })
}

module.exports = forecast 