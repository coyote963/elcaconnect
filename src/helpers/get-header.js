function getHeader () {
    var jwt = localStorage.getItem('jwt')
    if (jwt === null) {
        return null;
    }
    var headers =  { "Authorization" : jwt}
    return {headers : headers }
}

export default getHeader