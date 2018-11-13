class URI {
    constructor(){}

    static addQueryParams(url, params){
        let keys = Object.keys(params), values = Object.values(params), separator = null;
        for(let i=0; i < keys.length; i++){
            separator = (i === 0) ? '?' : '&';
            url += `${separator}${keys[i]}=${values[i]}`;
        }

        return url;
    }
}

module.exports = URI;