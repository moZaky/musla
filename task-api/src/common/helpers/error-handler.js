import fs from 'fs';
import path from 'path';



function respond(isError, isErrorLogged, data = null, errorCode = null, errorDetails = null, optionalMessage = null, location = null) {
    if (isError && !isErrorLogged) {
        logError(isError, isErrorLogged, errorCode, errorDetails, optionalMessage, location);
        return {
            error: isError,
            code: errorCode,
            message: optionalMessage,
            details: errorDetails,
            data: data,
            _l: true
        }
    }
    else
        return {
            error: isError,
            code: errorCode,
            message: optionalMessage,
            details: errorDetails,
            data: data,
            _l: isErrorLogged // Defines id the error has been already logged to the server.
        }
};


function logError(isError, isErrorLogged, errorCode, errorDetails, optionalMessage, location) {
    const errorMessage = `
        =============== ERROR STARTED AT ${new Date().toLocaleDateString()} =======================
        Error with code : ${errorCode} has been occurred at the ${location}.
        Error details (Programming exception) as following ==> ${errorDetails}.
        Additional Message from App server as following ==> ${optionalMessage}.
         =================================== ERROR ENDS ============================================= 
    `;

    const __dirname = path.resolve();
    console.error(errorMessage);
    fs.appendFile(path.join(__dirname, '/access.log'), errorMessage, function (err, data) {
        if (err)
            console.log("Error has been occured while trying to log! Such a shame! 🖐");
        else
            console.log("Error has been logged!");
    });
};


const actions = {
    respond,
    logError
};

export default actions;