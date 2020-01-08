const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value.trim();
    return data;
}, {});