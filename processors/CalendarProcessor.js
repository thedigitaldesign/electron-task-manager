const axios = require('axios');
const ResponseHandler = require('./ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');
const appConfig = require('../app-config');

// Made with ❤ by Gutty Mora

class CalendarProcessor {
    constructor(calendar){
        this.calendar = calendar || null;
    }

    static async getByDate(dateRange){
        let httpResponse;
        try{
            let url = appConfig['calendar-endpoints']['getEvents'];
            url += `?from=${dateRange.from}&to=${dateRange.to}`;
            let response = await axios.get(url);
            httpResponse = response;
        }catch(err){
            console.error('[!] Event processor error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }
}

module.exports = CalendarProcessor;