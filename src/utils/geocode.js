const request = require('request')

function geocode(address, callback) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`

    request({ url: url, json: true, headers: { 'User-Agent': 'nodejs-weather-app' } }, (error, response) => {
        if (error) {
            return callback('Unable to connect to location service!')
        }

        if (!response || response.statusCode !== 200) {
            return callback(`Location service error (${response ? response.statusCode : 'unknown'}). Tente novamente mais tarde.`)
        }

        const body = response.body
        if (!Array.isArray(body) || body.length === 0) {
            return callback('Unable to find location! Verifique o nome do lugar e tente novamente.')
        }

        const { lat, lon, display_name } = body[0]

        callback(undefined, {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            location: display_name
        })
    })
}

module.exports = geocode
