// match for username
function validateUsername(username) {
    const content = username.value;
    const usernameRegex = /\W/;
    return usernameRegex.test(content);
}

function validatePhone(phoneNumber) {
    if (!parseInt(phoneNumber)) {
        return false;
    } else {
        return true;
    }
}

function showAlert(message) {
    const alertLbl = document.querySelector('#alert');
    alertLbl.textContent = message;
    alertLbl.classList.remove('invisible');
}