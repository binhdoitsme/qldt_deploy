// define the buttons
//const detailBtns = document.querySelectorAll('.details-crud');
//const editBtns = document.querySelectorAll('.edit-crud');
//const deleteBtns = document.querySelectorAll('.delete-crud');

class ListViewBtns {
    constructor(entityName) {
        this.detailBtns = document.querySelectorAll('.details-crud');
        this.editBtns = document.querySelectorAll('.edit-crud');
        this.deleteBtns = document.querySelectorAll('.delete-crud');
        this.entityName = entityName;

        this.detailBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                // redirect to correct details view
                window.location.href = `./details/${event.currentTarget.dataset.elementId}`;
            });
        });

        // the details view also permits edit, so edit will redirect to /details too
        this.editBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                // redirect to correct details view
                window.location.href = `./edit/${event.currentTarget.dataset.elementId}`;
            });
        });

        // delete buttons first show modal views to get user's confirmation.
        // If user confirm delete, start fetching to delete route
        this.deleteBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                this.showModalView(event.currentTarget);
            });
        })
    }

    // show the modal view with the given message, the OK and Abort buttons.
    async showModalView(elm) {
        const modal = createModalHtml(`Bạn chắc chắn muốn xóa ${this.entityName} này?`, "Thay đổi sẽ không thể hoàn tác!", "Xác nhận xóa", "Hủy bỏ")

        const div = document.createElement('div');
        div.classList.add('modal-container');
        div.innerHTML = modal;
        document.body.appendChild(div);

        const yesBtn = div.querySelector('.yes');
        const noBtn = div.querySelector('.no');

        // if no then dispose this modal view and do nothing else
        noBtn.addEventListener('click', () => {
            div.remove();
        });

        // if yes, post the delete message to server and wait for response
        yesBtn.addEventListener('click', async () => {
            div.innerHTML = '<img src="/loading-gif-transparent-4.gif" style="width: 16rem">';
            // post message to server with this user's id
            const response = await fetch('./delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: elm.dataset.elementId })
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            // create new modal view
            const _modal = createModalHtml(jsonResponse.message, null, "OK", null);
            div.innerHTML = _modal;
            div.querySelector('.yes').addEventListener('click', () => {
                div.remove();
                window.location.reload();
            });
        });
    }
}