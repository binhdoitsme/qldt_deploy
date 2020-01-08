const scrollTopBtn = document.querySelector('.scroll-top');
document.addEventListener('scroll', () => {
    if (window.pageYOffset <= 40) {
        scrollTopBtn.classList.add('hidden');
    } else {
        scrollTopBtn.classList.remove('hidden');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
});
const moreBtn = document.querySelector('.sidebar-toggle');
moreBtn.addEventListener('click', () => {
    const t = document.querySelector('.sidebar > ul');
    t.classList.toggle('active');
    t.classList.toggle('inactive');
});