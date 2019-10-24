function isAuthorized(headers) {
    if(headers.authorization){
        const token = headers.authorization.replace("Bearer ", '').toLowerCase();
        return token === 'projecttwo'; 
    }
    return false;
}

module.exports = {
    isAuthorized,
}