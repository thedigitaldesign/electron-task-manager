// Made with ❤ by Gutty Mora

const axios = require('axios');
const crypto = require('crypto');
const ResponseHandler = require('../processes/ResponseHandler');
const ResponseCodes = require('../utilities/ResponseCodes');

class AuthorizationService {
    constructor(){};

    static checkSession(){
        if(sessionStorage.getItem('user')){
            let user = JSON.parse(sessionStorage.getItem('user'));
            return Date.parse(new Date()) >= Date.parse(user.expiresAt);
        }
    }

    static async startSession(user, password){
        let response = {};
        try{
            const url = 'https://fffa7a99-efe3-44ec-baeb-ec3568f20da1.mock.pstmn.io/auth';
            const hash = crypto.createHmac('sha256', '12345678').update(password).digest('hex');
            const auth = {
                'user': user,
                'password': hash
            };
            let httpResponse = await axios.post(url, auth);

            response = ResponseHandler.handleHttp(httpResponse);
        }catch(err){
            console.log('[!] Could not create session: ' + err);
            response.rc = ResponseCodes.ERROR_CREATING_SESSION;
            response.msg = ResponseCodes.ERROR_CREATING_SESSION_MSG;
        }

        return response;
    }
}

module.exports = AuthorizationService;