function displayStatus() {
    const ovrList = document.querySelectorAll('.mark-row > td:nth-child(7)');

    ovrList.forEach(e => {
        const text = e.textContent;
        const parent = e.parentNode;
        if (text === 'N/A') {
            parent.classList.add('unmarked');
        }
        else if (parseFloat(text) < 5) {
            parent.classList.add('failed');
        } else {
            parent.classList.add('passed');
        }
    });
}