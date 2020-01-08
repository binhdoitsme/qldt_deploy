const form = document.querySelector('form');
const file = document.querySelector('#file');
let parsedContent;

file.addEventListener('change', (event) => {
    const f = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        parsedContent = e.currentTarget.result;
    }
    reader.readAsText(f, 'Unicode');
    reader.onloadend = () => parsedContent = reader.result;
})
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showLoadingModal();
    const userType = form.querySelector('select').value;
    const response = await fetch(fetchURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },
        body: JSON.stringify({
            userType: userType,
            content: parsedContent
        })
    });
    const json = await response.json();
    const message = json.message;
    removeModal();
    showCompletionModal(message);
});
