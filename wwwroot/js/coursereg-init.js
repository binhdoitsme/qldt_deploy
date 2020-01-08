// initialization
let changesArray = [];
const studentId = document.querySelector('.course-catalog-container').id;
disableBtn();

function disableBtn() {
    const saveRegBtn = document.querySelector('#save-reg');
    if (changesArray.length !== 0) {
        saveRegBtn.disabled = false;
    } else {
        saveRegBtn.disabled = true;
    }
}

const abandonRegBtn = document.querySelector('#abandon-reg');
abandonRegBtn.addEventListener('click', () => {
    // navigate 1 page up
    window.location.href = '/';
})

// submission script
const saveRegBtn = document.querySelector('#save-reg');
saveRegBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await fetch('/course/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(changesArray)
    });
    const result = await response.json();
    if (result.status) {
        showCompletionModal(result.message);
    } else {
        showCompletionModal(result.message);
    }
});

const addBtns = document.querySelectorAll('.course-pick-button');
addBtns.forEach(e => e.addEventListener('click', classModalView));

const modifyBtns = document.querySelectorAll('.modify-btn');
modifyBtns.forEach(e => e.addEventListener('click', classModalView));

const deleteBtns = document.querySelectorAll('.remove-btn');
deleteBtns.forEach(e => e.addEventListener('click', (event) => {
    event.preventDefault();
    const registration = event.currentTarget.parentNode;

    // show confirmation modal
    showConfirmationModal("Bạn có thực sự muốn loại bỏ đăng kí này?", null, "Có", "Không", deleteRegistration.bind(null, registration));
    disableBtn();
}));