// Made with ❤ by Gutty Mora

const axios = require('axios');
const ResponseHandler = require('./ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');
const appConfig = require('../app-config');

class TaskProcessor {
    constructor(){}

    async getTasksByUser(){
        let httpResponse;
        try{
            let userId = JSON.parse(sessionStorage.getItem('user'))._id;
            let url = appConfig['task-endpoints']['getByUser'].replace('{user-id}', userId);
            let response = await axios.get(url);
            httpResponse = response;
        }catch(err){
            console.error('[!] Get tasks service error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }
}

module.exports = TaskProcessor;