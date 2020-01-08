function selectChangeEvtHdlr(event) {
    const targetSelect = event.currentTarget;
    const value = targetSelect.value;
    let targetOption = undefined;
    targetSelect.querySelectorAll('option').forEach(o => {
        if (o.value === value) {
            targetOption = o;
        }
    });
    const removedIndex = selectedOptions
        .findIndex
        (o => o.value === targetSelect.dataset.elementValue);
    const removedOption = selectedOptions[removedIndex];
    selectedOptions.splice(removedIndex, 1);
    selectedOptions.push(targetOption);
    const allSelect = document.querySelectorAll('select');

    selectedOptions.forEach(op => {
        const selectArray = document.querySelectorAll('select');
        allSelect.forEach(sl => {
            const options = Array.from(sl.childNodes);
            removeOption(op, selectArray, null);
            addOption(removedOption, selectArray, null);
        });
    });
}

function deleteBtnEvtHdlr(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const targetRow = target.parentNode.parentNode;
    if (addedRows.findIndex(e => e === targetRow) !== -1) {
        targetRow.remove();
        addedRows.splice(addedRows.findIndex(e => e === targetRow), 1);
        selectedOptions.splice(selectedOptions.
            findIndex(e => e.value === targetRow.querySelector('select').value), 1);
        index--;
        disableAdd(addBtn, index, maxIndex);
    }
    disableSave();
}

function disableAdd(addBtn, index, maxIndex) {
    if (index > maxIndex) {
        addBtn.disabled = true;
    } else {
        addBtn.disabled = false;
    }
    let i = initialIndex + 1;
    addedRows.forEach(r => {
        r.querySelector('td').textContent = i;
        i++;
    });
    disableSave();
}

const addBtn = document.querySelector("#addpm");
const listCtn = document.querySelector('.list-container');
const initialIndex = index - 1;
let maxIndex = initialIndex;
let changeArr = [];
let possibleOptions = [];
let addedRows = [];
let selectedOptions = [];
let dropdownHTML = undefined;
const saveBtn = document.createElement('button');
saveBtn.id = "save-changes";
saveBtn.innerHTML = "Lưu thay đổi";
document.querySelectorAll('.delete-crud').forEach(btn => {
    btn.addEventListener('click', removePermission);
});
addBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!dropdownHTML) {
        const response = await fetch(`/role/permissiondropdown/${listCtn.id}`,
            {
                method: 'POST'
            });

        const innerHTML = await response.text();
        dropdownHTML = innerHTML;
    }
    const row = document.createElement('tr');
    row.innerHTML += `
                        <td>${index}</td>
                        <td></td>
                        <td>${dropdownHTML}</td>
                        <td><button class="delete-crud button" href="">Xóa</button></td>`;
    document.querySelector('tbody').appendChild(row);
    if (maxIndex === initialIndex) {
        maxIndex += row.querySelectorAll('option').length;
    }
    if (possibleOptions.length === 0) {
        row.querySelectorAll('option').forEach(o => possibleOptions.push(o));
    }
    addedRows.push(row);
    index++;
    disableAdd(addBtn, index, maxIndex);

    if (selectedOptions.length !== 0) {
        selectedOptions.forEach(op => {
            const selectArray = document.querySelectorAll('select');
            const sl = row.querySelector('select');
            const options = Array.from(row.querySelectorAll('option'));
            let i = 0;
            while (i < options.length && selectedOptions.find(opt => opt.value === options[i].value)) {
                i++;
            }
            sl.value = options[i].value;
            removeOption(op, selectArray, null);
        });
    }

    addSelectedOption(row, selectedOptions);
    disableSave();

    document.querySelectorAll('.delete-crud').forEach(d => {
        d.removeEventListener('click', deleteBtnEvtHdlr);
        d.addEventListener('click', deleteBtnEvtHdlr);
    });

    document.querySelectorAll('select').forEach(s => {
        s.removeEventListener('focus', onDropdownFocused);
        s.addEventListener('focus', onDropdownFocused);
    });

    document.querySelectorAll('select').forEach(s => {
        s.removeEventListener('change', selectChangeEvtHdlr);
        s.addEventListener('change', selectChangeEvtHdlr);
    });
});

saveBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    for (let opt of selectedOptions) {
        changeArr.push({
            PermissionId: opt.value,
            RoleId: document.querySelector('.list-container').id
        });
    }
    const response = await fetch('/addPm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(changeArr)
    });
    showCompletionModal((await response.json()).message);
});


function disableSave() {
    if (selectedOptions.length !== 0 && !document.querySelector('#save-changes')) {
        document.querySelector('.list-container').appendChild(saveBtn);
    } else {
        if (document.querySelector('#save-changes')) {
            document.querySelector('.list-container').removeChild(saveBtn);
        }
    }
}

function onDropdownFocused(event) {
    event.currentTarget.dataset.elementValue = event.currentTarget.value;
}

async function removePermission(event) {
    const pmId = event.currentTarget.dataset.pmVal;
    showConfirmationModal("Bạn có chắc chắn muốn loại bỏ quyền này?", null, "Có", "Không", async () => {
        const response = await fetch(`/role/deletepm/${pmId}/${document.querySelector('.list-container').id}`,
            { method: 'POST' });
        document.querySelector('.modal-container').remove();
        showCompletionModal((await response.json()).message);
    });

}

function addSelectedOption(row, selectedValues) {
    const selectedValue = row.querySelector('select').value;
    row.querySelectorAll('option').forEach(o => {
        if (o.value === selectedValue) {
            selectedValues.push(o);
            return;
        }
    });
}

function addOption(option, selectArray, eventTarget) {
    selectArray.forEach(s => {
        if (s !== eventTarget) {
            s.childNodes.forEach(o => {
                if (o.value === option.value) {
                    o.disabled = false;
                }
            });
        }
    });
}

function removeOption(option, selectArray, eventTarget) {
    selectArray.forEach(s => {
        if (s !== eventTarget) {
            s.childNodes.forEach(o => {
                if (o.value === option.value) {
                    o.disabled = true;
                }
                if (s.value === o.value) {
                    o.disabled = false;
                }
            });
        }
    });
}