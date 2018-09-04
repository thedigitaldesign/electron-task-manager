const ResponseCodes = require('../utilities/ResponseCodes');

class ResponseHandler {
    constructor(){}

    static handleHttp(httpRes){
        let response = {};
        try{
            if(httpRes.status){
                switch(response.status){
                    case 200:
                        response.rc = ResponseCodes.PROCESS_OK;
                        response.msg = ResponseCodes.PROCESS_OK_MSG;
                        response.bean = response.data;

                        break;
                    default:
                        response.rc = ResponseCodes.INTERNAL_SERVER_ERROR;
                        response.msg = ResponseCodes.INTERNAL_SERVER_ERROR_MSG;
                        break;
                }
            }
        }catch(err){
            console.log('[!] Error handling http response: ' + err);
            response = this.buildError();
        }

        return response;
    }

    static buildError(){
        return {
            rc: ResponseCodes.INTERNAL_FRONT_ERROR,
            msg: ResponseCodes.INTERNAL_FRONT_ERROR_MSG
        }
    }
}

module.exports = ResponseHandler;