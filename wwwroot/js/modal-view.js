function createModalHtml(message, alert, yesLbl, noLbl) {
    if (alert) {
        if (message) {
            return `
            <div class="modal-content">
                <p>${message}</p>
                <p class="alert">${alert}</p>
                <div>
                    <button class="yes modal-button">${yesLbl}</button>
                    <button class="no modal-button">${noLbl}</button>
                </div>
            </div>
            `;
        } else {
            return `
            <div class="modal-content">
                <p class="alert">${alert}</p>
                <div>
                    <button class="yes modal-button">${yesLbl}</button>
                    <button class="no modal-button">${noLbl}</button>
                </div>
            </div>
            `;
        }
    }
    else {
        if (!noLbl) {
            return `
            <div class="modal-content">
                <p>${message}</p>
                <div>
                    <button class="yes modal-button">${yesLbl}</button>
                </div>
            </div>
        `;
        }
        return `
            <div class="modal-content">
                <p>${message}</p>
                <div>
                    <button class="yes modal-button">${yesLbl}</button>
                    <button class="no modal-button">${noLbl}</button>
                </div>
            </div>
        `;
    }

}

function showLoadingModal() {
    const modal = `<img src="/loading-gif-transparent-4.gif" style="width: 16rem">`;
    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = modal;
    document.body.appendChild(div);
}

function removeModal() {
    document.querySelector('.modal-container').remove();
}

function showCompletionModal(message) {
    const modal = createModalHtml(message, null, "OK", null);

    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = modal;
    document.body.appendChild(div);

    const yesBtn = div.querySelector('.yes');

    // if no then dispose this modal view and do nothing else
    yesBtn.addEventListener('click', () => {
        div.remove();
        window.location.reload();
    });
}

function showCompletionModal(message, redirectURL) {
    const modal = createModalHtml(message, null, "OK", null);

    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = modal;
    document.body.appendChild(div);

    const yesBtn = div.querySelector('.yes');

    // if no then dispose this modal view and do nothing else
    yesBtn.addEventListener('click', () => {
        div.remove();
        if (redirectURL) {
            window.location.href = redirectURL;
        } else {
            window.location.reload();
        }
    });

}
function showAlertModal(message) {
    const modal = createModalHtml(null, message, "OK", null);

    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = modal;
    document.body.appendChild(div);

    const yesBtn = div.querySelector('.yes');

    // if no then dispose this modal view and do nothing else
    yesBtn.addEventListener('click', () => {
        div.remove();
        window.location.reload();
    });
}

function showConfirmationModal(message, alert, yesLbl, noLbl, yesBtnCallback) {
    const modal = createModalHtml(message, null, yesLbl, noLbl);

    const div = document.createElement('div');
    div.classList.add('modal-container');
    div.innerHTML = modal;
    document.body.appendChild(div);

    const yesBtn = div.querySelector('.yes');
    const noBtn = div.querySelector('.no');

    // if no then dispose this modal view and do nothing else
    noBtn.addEventListener('click', (event) => {
        event.preventDefault();
        div.remove();
    });

    yesBtn.addEventListener('click', yesBtnCallback);
}