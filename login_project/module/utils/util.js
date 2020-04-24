const util = {
    successTrue: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    successFalse: (status, message) => {
        return {
            status: status,
            success: false,
            message: message
        }
    }
};

module.exports = util;