const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define path for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Makene Neto'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Makene Neto'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Makene Neto'
    })
})

app.get('/help/:page', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Makene Neto'
    })
})

// JSON Page
app.get('/weather', (req, res) => {
    res.send({
        forecast: "It's snowing",
        location: "Philadelphia"
    })
})

// Catch-all route for 404 errors
app.use((req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Makene Neto'
    })
})

// Setup listening port
app.listen(3000, () => {
    console.log(`Server is up on port ${3000}`)
})