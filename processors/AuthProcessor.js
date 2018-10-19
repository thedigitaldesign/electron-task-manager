// Made with ❤ by Gutty Mora

const axios = require('axios');
const crypto = require('crypto');
const ResponseHandler = require('./ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');
const appConfig = require('../app-config');

class AuthProcessor {
    constructor(){};

    static checkSession(){
        if(sessionStorage.getItem('user')){
            let user = JSON.parse(sessionStorage.getItem('user'));
            return Date.parse(new Date()) >= Date.parse(user.expiresAt);
        }
    }

    static async startSession(email, password){
        let response = {};
        try{
            const url = appConfig['auth-endpoints']['login'];
            const hash = crypto.createHmac('sha256', appConfig["encrypt-secret"]).update(password).digest('hex');
            const auth = {
                'email': email,
                'password': hash
            };
            let httpResponse = await axios.post(url, auth);
            response = {
                status: httpResponse.status,
                data: httpResponse.data
            };

            // Create session object
            let user = response.data;
            sessionStorage.setItem('expiresAt', Date.now() + appConfig['token-expiration-time']);
            sessionStorage.setItem('userId', user._id);
            sessionStorage.setItem('avatar', user.avatar);
            sessionStorage.setItem('firstName', user.firstName);
            sessionStorage.setItem('lastName', user.lastName);
            sessionStorage.setItem('email', user.email);

            return ResponseHandler.handleHttp(response);
        }catch(err){
            console.log('[!] Create session error: ' + err);
            if(!err.response){
                console.log('[!] Could not connect to server');
                response.rc = ResponseCodes.SERVER_CONNECTION_ERROR;
                response.msg = ResponseCodes.SERVER_CONNECTION_ERROR_MSG;

                return response;
            }

            return ResponseHandler.handleHttp(err.response);
        }
    }
}

module.exports = AuthProcessor;