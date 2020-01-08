const dropdown = document.querySelector('select');
const options = document.querySelectorAll('option');
const partialContainer = document.querySelector('.partial-container');
dropdown.onchange = updatePartial;
async function updatePartial() {
    const id = options[dropdown.value].id;
    const response = await fetch(`/useraccount/create/${id}`, { method: "POST" });
    const htmlPartial = await response.text();
    const partials = document.querySelectorAll('.partial');
    partials.forEach(e => e.remove());
    partialContainer.innerHTML = htmlPartial;
    const innerChildren = partialContainer.children;
    for (let i = innerChildren.length - 1; i >= 0; i--) {
        partialContainer.after(innerChildren[i]);
    }
    addDropdown();
}

function addDropdown() {
    const facultyDropdown = document.querySelector('#profile-faculty');
    if (facultyDropdown) {
        let i = 0;
        facultyList.forEach(e => {
            facultyDropdown.innerHTML += `<option id=${i} value=${e.facultyId}>${e.facultyName}</option>`;
            i++;
        });
    }

    const academicDropdown = document.querySelector('#profile-academic-year');
    if (academicDropdown) {
        let i = 0;
        academicList.forEach(e => {
            academicDropdown.innerHTML += `<option id=${i} value=${e.academicYearId}>${e.academicYearShort} (${e.academicYearDescription})</option>`;
            i++;
        });
    }

    const usernameInput = document.querySelector('#username');
    
    if (facultyDropdown && academicDropdown) {
        usernameInput.disabled = true;
        const sidInput = document.querySelector('#profile-sid');
        const onKeyUp = () => usernameInput.value = sidInput.value;
        sidInput.addEventListener('keyup', onKeyUp);
    } else {
        usernameInput.disabled = false;
    }
}
updatePartial();