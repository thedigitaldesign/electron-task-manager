let ResponseCodes = {
    PROCESS_OK: 0,
    PROCESS_OK_MSG: 'Process OK',
    SESSION_EXPIRED: -1,
    SESSION_EXPIRED_MSG: 'Session expired',
    ERROR_CREATING_SESSION: -2,
    ERROR_CREATING_SESSION_MSG: 'Error creating session object',
    INTERNAL_SERVER_ERROR: -3,
    INTERNAL_SERVER_ERROR_MSG: 'Internal server error',
    INTERNAL_FRONT_ERROR: -4,
    INTERNAL_FRONT_ERROR_MSG: 'Data front processing error',
};

module.exports = ResponseCodes;