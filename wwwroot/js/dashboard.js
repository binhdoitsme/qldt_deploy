function onClick(event) {
    if (event.currentTarget.textContent == "<<") {
        event.currentTarget.textContent = ">>";
        document.querySelector('.sidebar').classList.toggle('hidden-sidebar');
    } else {
        event.currentTarget.textContent = "<<";
        document.querySelector('.sidebar').classList.toggle('hidden-sidebar');
    }
}