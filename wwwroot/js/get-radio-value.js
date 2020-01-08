const getSelectedRadioValue = (form) => {
    const radio = form.querySelector("input[name=classId]:checked");
    if (radio) return radio.value;
    return undefined;
}