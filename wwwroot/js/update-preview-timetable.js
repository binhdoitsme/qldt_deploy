// update preview timetable
async function updatePreviewTimetable(changeObj) {
    const timetable = document.querySelector('.timetable');
    const html = await getTimetable(changeObj);
    const interactBtns = document.querySelector('.interact-buttons');
    interactBtns.insertAdjacentHTML('beforebegin', html);
    if (timetable) {
        // remove the existing timetable and append new one
        timetable.remove();
    }

    // add class to all the tds containing registration
    const subjectDivs = document.querySelectorAll('.subject');
    subjectDivs.forEach(e => {
        e.parentNode.classList.add('selected');
    })
}

// fetch timetable
async function getTimetable(changeObj) {
    if (!changeObj) {
        const result = await fetch('/course/updatetimetable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const html = await result.text();
        return html;
    } else {
        const result = await fetch('/course/updatetimetable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeObj)
        });
        const html = await result.text();
        return html;
    }
}
