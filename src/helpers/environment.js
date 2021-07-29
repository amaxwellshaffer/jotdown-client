let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3005'
        break
    case 'jotdownbook.herokuapp.com':
        APIURL = 'https://jotdown-server.herokuapp.com'
}

export default APIURL