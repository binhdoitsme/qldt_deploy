const prevBtn = document.querySelector('.interact-buttons > button:nth-of-type(1)');
const nextBtn = document.querySelector('.interact-buttons > button:nth-of-type(2)');
let highlightedValue = 0;
prevBtn.disabled = true;

const checkDisabledBtn = () => {
    if (highlightedValue == 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (highlightedValue == gradesTables.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

const nextTable = () => {
    if (highlightedValue < semesterOptions.length - 1) {
        highlightedValue++;
        changeTable(highlightedValue);
    }
}

const prevTable = () => {
    if (highlightedValue > 0) {
        highlightedValue--;
        changeTable(highlightedValue);
    }
}

const dropdownChange = () => {
    const semesterId = semesterDropdown.value;
    changeGradesTable(gradesTables, semesterId);
    highlightedValue = getIndex(semesterId);
    checkDisabledBtn();
}

const changeTable = (index) => {
    const semesterId = semesterOptions[index].value;
    semesterDropdown.value = semesterId;
    dropdownChange();
}

prevBtn.addEventListener('click', prevTable);
nextBtn.addEventListener('click', nextTable);