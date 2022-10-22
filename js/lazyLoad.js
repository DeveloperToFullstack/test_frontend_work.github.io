
let frameblock = document.querySelector('.map__iframe');
const windowHeight = document.documentElement.clientHeight;

window.addEventListener('scroll', scrollFrame);

function scrollFrame () {
    if (frameblock.dataset.src) {
        getFrame();
    }
}

function getFrame () {
    const heightBlock = frameblock.getBoundingClientRect().top + scrollY;
    if (scrollY > heightBlock - windowHeight) {
        let dataFrame = frameblock.dataset.src;
        if (dataFrame) {
            frameblock.insertAdjacentHTML('beforeend',
            `<iframe src="${dataFrame}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)
        }
        frameblock.removeAttribute('data-src');
    }
}