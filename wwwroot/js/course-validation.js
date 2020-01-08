function validateCourseName(coursename) {
    const name = coursename.value.trim();
    /*console.log(name.trim().length === 0 || parseInt(name.trim()) !== NaN)*/
    return name.trim().length === 0 || !isNaN(parseInt(name.trim()));
}
//function validateCourseNameWithoutNum(coursename) {
//    const name = coursename.value;
//    const checkName = parseInt(name)
//    return checkName === undefined; 
//}




function validateCourseCode(coursecode) {
    const code = coursecode.value; 
    const courseCodeRegex = /[a-zA-Z0-9]+/;
    return courseCodeRegex.test(code); 
}
