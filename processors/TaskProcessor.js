// Made with ❤ by Gutty Mora

const axios = require('axios');
const ResponseHandler = require('./ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');
const appConfig = require('../app-config');
const StringUtility = require('../utilities/StringUtility');
const URI = require('../ext/URI');

class TaskProcessor {
    constructor(task){
        this.task = task || null;
    }

    async getTasksByUser(filters){
        let httpResponse;
        try{
            let userId = sessionStorage.getItem('userId');
            let url = appConfig['task-endpoints']['getByUser'].replace('{user-id}', userId);
            if(filters){
                url = URI.addQueryParams(url, filters);
            }
            let response = await axios.get(url);
            httpResponse = response;
        }catch(err){
            console.error('[!] Get tasks service error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }

    async save(){
        let httpResponse;
        try{
            this.task.owner = sessionStorage.getItem('userId');
            let url = appConfig['task-endpoints']['create'];
            let response = await axios.post(url, this.task);
            httpResponse = response;
        }catch(err){
            console.error('[!] Save task service error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }

    async update(id){
        let httpResponse;
        try{
            let url = appConfig['task-endpoints']['specific'].replace('{task-id}', id);
            let response = await axios.put(url, this.task);
            httpResponse = response;
        }catch(err){
            console.error('[!] Put task service error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }

    async patch(id, attr){
        let httpResponse;
        try{
            let url = StringUtility.fmt(appConfig['task-endpoints']['patch'], {'task-id':id, 'attr-name': attr, 'attr-value': this.task[attr]});

            console.log('URL: ' + url);

            let response = await axios.patch(url);
            httpResponse = response;
        }catch(err){
            console.error('[!] Put task service error: ' + err);
            httpResponse = err.response;
        }

        return ResponseHandler.handleHttp(httpResponse);
    }
}

module.exports = TaskProcessor;