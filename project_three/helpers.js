const apiKey = require('./env');

function getAPI (searchTerm) {
    return `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=5`;
}

module.exports = {
    getAPI
}