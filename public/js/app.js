console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const informationContainer = document.getElementById('information')
const locationMessage = document.getElementById('message-1')
const forecastMessage = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const apiName = async () => {
        const response = await fetch('http://localhost:3000/weather?address=' + location, {})

        if (response.ok) {
            const data = await response.json()
            return data
        }
        else {
            throw new Error('Unable to fetch country')
        }
    }

    apiName().then((weather) => {
        informationContainer.style.display = 'grid'
        locationMessage.innerHTML = weather.location
        forecastMessage.innerHTML = weather.forecast
    }).catch((err) => {
        console.error(err)
    })
})