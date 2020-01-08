function changeGradesTable(gradesTables, semesterId) {
    gradesTables.forEach(tbl => {
        if (tbl.dataset.semesterId !== semesterId) {
            if (!tbl.classList.contains('invisible')) {
                tbl.classList.add('invisible');
            }
        } else {
            tbl.classList.remove('invisible');
        }
    })
}

function getIndex(semesterId) {
    for (let i = 0; i < semesterOptions.length; i++) {
        if (semesterOptions[i].value == semesterId) {
            return i;
        }
    }
}

const semesterDropdown = document.querySelector('#semester');
const semesterOptions = document.querySelectorAll('#semester > option');
const gradesTablesContainer = document.querySelector('.grades-table-container');
const interactBtns = document.querySelector('.interact-buttons');
let gradesTables = [];

semesterOptions.forEach(async (op) => {
    const response = await fetch(`/grades/partial/${op.value}`);
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    const gradesTable = div.querySelector('table');
    gradesTable.dataset.semesterId = op.value;
    interactBtns.insertAdjacentElement('beforebegin', gradesTable);
    gradesTables.push(gradesTable);
    const initialSemesterValue = semesterDropdown.value;
    changeGradesTable(gradesTables, initialSemesterValue);
    displayStatus();
});

semesterDropdown.addEventListener('change', dropdownChange);