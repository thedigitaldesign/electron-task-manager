// Made with ❤ by Gutty Mora

const axios = require('axios');
const crypto = require('crypto');
const ResponseHandler = require('../processors/ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');
const appConfig = require('../app-config');

class AuthorizationService {
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
            const url = appConfig["auth-services-url"];
            const hash = crypto.createHmac('sha256', appConfig["encrypt-secret"]).update(password).digest('hex');
            const auth = {
                'email': email,
                'password': hash
            };
            let httpResponse = await axios.post(url, auth);
            if(httpResponse.data.rc === ResponseCodes.PROCESS_OK){
                // Create session object
                let user = httpResponse.data.bean;
                user.expiresAt = Date.now() + appConfig["token-expiration-time"];
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            return ResponseHandler.handleHttp(httpResponse);
        }catch(err){
            console.log('[!] Create session error: ' + err);
            response.rc = ResponseCodes.ERROR_CREATING_SESSION;
            response.msg = ResponseCodes.ERROR_CREATING_SESSION_MSG;

            return ResponseHandler.handleHttp(err.response);
        }
    }
}

module.exports = AuthorizationService;