const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const alertLbl = document.querySelector('#alert');

    // check old password correctness
    const oldPass = document.querySelector('#old-password').value;
    const correctOldPass = (await (await fetch('/checkoldpass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPass: oldPass })
    })).json()).correct;

    if (correctOldPass) {
        // check if new password is the same as old password
        const newPass = document.querySelector('#new-password').value;
        if (oldPass === newPass) {
            alertLbl.textContent = "Mật khẩu mới không thể giống mật khẩu cũ!";
            alertLbl.classList.remove('invisible');
        } else if (newPass.includes("'") || newPass.includes("\"")) {
            alertLbl.textContent = "Mật khẩu mới không hợp lệ!";
            alertLbl.classList.remove('invisible');
        } else if (newPass !== document.querySelector('#new-password-confirm').value) {
            alertLbl.textContent = "Mật khẩu mới không khớp nhau!";
            alertLbl.classList.remove('invisible');
        } else {
            const returnJson = await (await fetch('/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPass: newPass })
            })).json();

            alertLbl.classList.add('invisible');

            // create modal view
            const _modal = `
                <div class="modal-content">
                    <p>${returnJson.message}</p>
                    <div>
                    <button>OK</button>
                    </div>
                </div>
            `;
            const div = document.createElement('div');
            div.classList.add('modal-container');
            document.body.appendChild(div);
            div.innerHTML = _modal;
            div.querySelector('button').addEventListener('click', () => {
                div.remove();
                window.location.href = "/";
            });
        }
    } else {
        alertLbl.textContent = "Mật khẩu cũ không đúng!";
        alertLbl.classList.remove('invisible');
    }

});