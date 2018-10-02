let ResponseCodes = {
    PROCESS_OK: 0,
    PROCESS_OK_MSG: 'Process OK',
    REQUIRED_FIELDS_MISSING: -1,
    REQUIRED_FIELDS_MISSING_MSG: 'Missing fields',
    INVALID_LOGIN: -2,
    INVALID_LOGIN_MSG: 'Invalid login',
    INTERNAL_FRONT_ERROR: -3,
    INTERNAL_FRONT_ERROR_MSG: 'Data front processing error',
    INTERNAL_SERVER_ERROR: -4,
    INTERNAL_SERVER_ERROR_MSG: 'Internal server error',
    SERVER_CONNECTION_ERROR: -5,
    SERVER_CONNECTION_ERROR_MSG: 'Server connection error',
    ERROR_CREATING_SESSION: -999,
    ERROR_CREATING_SESSION_MSG: 'Error creating user session',
};

module.exports = ResponseCodes;