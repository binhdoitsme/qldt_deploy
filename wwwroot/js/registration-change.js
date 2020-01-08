function deleteRegistration(registration) {
    // check if the deletion has already been in the change list
    let foundIndex = -1;
    let changeObj;
    const regCourseId = registration.dataset.courseId;
    for (let i = 0; i < changesArray.length; i++) {
        // find a change that is new in this session and has the same courseid as the selected one
        if (parseInt(changesArray[i].obj.courseId) === parseInt(regCourseId)) {
            foundIndex = i;
            break;
        }
    }
    if (foundIndex === -1) {
        // case: registration persisted from the last session
        changeObj = new ChangeObject('delete', registration.dataset.courseId,
            registration.dataset.registeredClass, studentId);
        changesArray.push(changeObj);
    } else {
        // case: newly added registration that needs to be deleted
        if (changesArray[foundIndex].type === "add") {
            changeObj = changesArray[foundIndex];
            changeObj.type = "delete"
            changesArray.splice(foundIndex, 1);
        } else {
            // case: a registration persisted from the last session but was just modified
            changesArray[foundIndex].type = "delete";
            changeObj = changesArray[foundIndex];
        }
    }
    registration.classList.remove('selected');
    registration.dataset.registeredClass = -1;
    document.querySelector('.modal-container').remove();
    updatePreviewTimetable(changeObj);
    disableBtn();
}

function classSelectModalHandle(modalContainer, courseId, courseView) {
    // pre-fill the form
    const form = document.querySelector('.modal-form');
    const options = form.querySelectorAll('input');
    const initialRegistered = parseInt(courseView.dataset.initialRegister);
    const currentRegistered = parseInt(courseView.dataset.registeredClass);

    if (currentRegistered !== -1) {
        options.forEach(e => {
            if (e.value === courseView.dataset.registeredClass) {
                e.checked = true;
            }
        });
    }

    const initialSelected = getSelectedRadioValue(form);
    const yesBtn = modalContainer.querySelector('.yes');
    yesBtn.disabled = true;

    document.querySelectorAll('input[name="classId"]').forEach(e => {
        e.addEventListener('change', (ev) => {
            ev.preventDefault();
            if (getSelectedRadioValue(form) !== initialSelected) {
                yesBtn.disabled = false;
            } else {
                yesBtn.disabled = true;
            }
        });
    });

    yesBtn.addEventListener('click', async (evt) => {
        evt.preventDefault();
        const classId = document.querySelector('.modal-form > div > input[name="classId"]:checked').value;

        // create object
        let changeObj; // for updating the preview timetable

        // update view
        if (form.reportValidity()) {
            console.log(`initially chose ${initialRegistered}, now chose ${currentRegistered}`)
            if (initialRegistered === -1 && currentRegistered === -1) {
                // case: add a new course registration
                changeObj = new ChangeObject('add', courseId, classId, studentId);
                changesArray.push(changeObj);
                console.log('case1');
            } else {
                let foundIndex = -1;
                for (let i = 0; i < changesArray.length; i++) {
                    if (changesArray[i].obj.courseId === courseId) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex !== -1) {
                    // case: modify a registration that has been made in the same session
                    if (changesArray[foundIndex].type === 'modify') {
                        // case: modification restores the initial state
                        if (parseInt(classId) === parseInt(initialRegistered)) {
                            changeObj = changesArray[foundIndex];
                            changeObj.type = 'delete';
                            await updatePreviewTimetable(changeObj);
                            changesArray.splice(foundIndex, 1);
                            changeObj.type = 'add';
                            changeObj.obj.courseClassId = classId;
                        }

                        // case: modification creates new state
                        else {
                            changesArray[foundIndex].obj.courseClassId = classId;
                            changeObj = changesArray[foundIndex];
                            changeObj.type = 'add';
                            console.log('case2');
                        }
                    }

                    // case: add a deleted registration that has been performed in the same session
                    else {
                        if (changesArray[foundIndex].type == 'delete') {
                            changesArray[foundIndex].type = 'modify';
                        }
                        changesArray[foundIndex].obj.courseClassId = classId;
                        changeObj = changesArray[foundIndex];
                    }
                }
                else {
                    // case: modify an existing registration pulled from DB
                    console.log('case3')
                    changeObj = new ChangeObject('modify', courseId, classId, studentId);
                    changesArray.push(changeObj);
                }
            }

            courseView.classList.add('selected');
            courseView.dataset.registeredClass = classId;
            modalContainer.remove();
            await updatePreviewTimetable(changeObj);
            disableBtn();
        }
    });

    modalContainer.querySelector('.no').addEventListener('click', (evt) => {
        evt.preventDefault();
        modalContainer.remove();
    });
}