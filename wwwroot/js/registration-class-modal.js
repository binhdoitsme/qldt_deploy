const classModalView = async (event) => {
    event.preventDefault();
    const courseView = event.currentTarget.parentNode;
    const courseId = courseView.dataset.courseId;

    const modalContainer = await createClassSelectView(courseId);
    document.onkeydown = () => false;
    classSelectModalHandle(modalContainer, courseId, courseView);
}