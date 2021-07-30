let APIURL = ''

switch (window.location.hostname) {
    case 'localhost' || "127.0.0.1":
    //case '127.0.0.1':
        APIURL = 'https://jotdown-server.herokuapp.com'
        break
    case 'jotdownbook.herokuapp.com':
        APIURL = 'https://jotdown-server.herokuapp.com'
}

export default APIURL