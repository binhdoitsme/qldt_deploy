// object generalization script
class ChangeObject {
    constructor(type, courseId, courseClassId, studentId) {
        this.type = type;
        this.obj = {
            courseId: courseId,
            courseClassId: courseClassId,
            studentId: studentId
        };
    }
}