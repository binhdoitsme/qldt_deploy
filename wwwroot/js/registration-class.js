async function createClassSelectView(courseId) {
    // fetch and create class select modal view
    const response = await fetch('/course/fetchclass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId: courseId })
    });
    if (response.redirected) {
        window.location.href = response.url;
    }
    else {
        const returnedHTML = await response.text();

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = returnedHTML;
        modalContainer.classList.add('modal-container');
        document.body.appendChild(modalContainer);
        return modalContainer;
    }
}