const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    // prevent page refresh
    event.preventDefault();

    // check login credentials
    const alertLbl = document.querySelector('#alert');
    const username = document.querySelector('#username').value;
    
    if (username.includes("'")) {
        const message = { message: "Tên đăng nhập hoặc mật khẩu không đúng" };
        alertLbl.textContent = message.message;
        alertLbl.classList.remove('invisible');
    }
    else {
        showLoadingModal();
        const bodyMsg =
        {
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value
        }
        const response = await fetch('/login/validate',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(bodyMsg)
            });
        if (response.redirected) { // if no JSON is received
            window.location.href = response.url;
        } else { // if JSON is received
            document.querySelector('.modal-container').remove();
            const rcvd = await response.json();
            if (rcvd.message) {
                alertLbl.textContent = rcvd.message;
                alertLbl.classList.remove('invisible');
            } else {
                alertLbl.textContent = "";
                alertLbl.classList.add('invisible');
            }
        }
    }
});