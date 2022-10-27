window.addEventListener('scroll', scrollEvent, {passive:true});
//lazy load start

let frameblock = document.querySelector('.map__iframe');
let imgBlocks = document.querySelectorAll('img[data-src]');
let imgHeight = [];
const windowHeight = document.documentElement.clientHeight;

if (imgBlocks.length) {
    imgBlocks.forEach(img => {
        if (img.dataset.src) {
            imgHeight.push(img.getBoundingClientRect().top + scrollY);
        }
    })
    getImg();
}
function getImg () {
    let index = imgHeight.findIndex(img => scrollY > img - windowHeight);
    if (index >= 0) {
        imgBlocks[index].src = imgBlocks[index].dataset.src;
        imgBlocks[index].removeAttribute('data-src');
    }
    delete imgHeight[index];
}

function getFrame () {
    const heightBlock = frameblock.getBoundingClientRect().top + scrollY;
    if (scrollY > heightBlock - windowHeight) {
        let dataFrame = frameblock.dataset.src;
        if (dataFrame) {
            frameblock.insertAdjacentHTML('beforeend',
            `<iframe src="${dataFrame}" style="border:0;" allowfullscreen="" title="frame" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)
        }
        frameblock.removeAttribute('data-src');
    }
}

//lazy load end

function scrollEvent () {
    if (frameblock.dataset.src) {
        getFrame(); //get frame
    }
    if (document.querySelectorAll('img[data-src]').length) {
        getImg();
    }
    scrollHeader();
}
// header scroll
let titleBlockHeight = document.querySelector('.main__title').clientHeight;
let header = document.querySelector('header');

function scrollHeader () {
    if (titleBlockHeight - header.clientHeight < scrollY && !header.classList.contains('scroll')) {
        header.classList.add('scroll');
    }
    if (titleBlockHeight - header.clientHeight > scrollY && header.classList.contains('scroll')) {
        header.classList.remove('scroll');
    }
}
//back to top

let arrowBack = document.querySelector('.wrapper__arrow');
arrowBack.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

//click like

let catalogCards = document.querySelectorAll('.catalog__body, .catalog-cards');
catalogCards.forEach(el => {
    el.addEventListener('click', createLike);
})

function createLike () {
    if (event.target.parentNode.classList.contains('like')) {
        event.target.parentNode.classList.toggle('active');
    }
    if (event.target.parentNode.parentNode.classList.contains('like')) {
        event.target.parentNode.parentNode.classList.toggle('active');
    }
}

//click sort

let sortBlock = document.querySelector('.sort__visible');
sortBlock.addEventListener('click', sortOpen);

function sortOpen () {
    this.parentNode.classList.toggle('active')
}

//added sliders

let bannerSlider = new slider({
    slideWidth: 324,
    parent: document.querySelector('.banners__slider'),
    type: 'count',
})
let collectionSlider = new slider({
    slideWidth: 202,
    parent: document.querySelector('.collections__slider'),
    type: 'range',
})
let noveltySlider = new slider({
    slideWidth: 166,
    parent: document.querySelector('.novelty__slider'),
    type: 'range',
})
let newsSlider = new slider({
    slideWidth: 202,
    parent: document.querySelector('.news__slider'),
    type: 'range',
})

let categorySlider = new slider({
    slideWidth: 80,
    parent: document.querySelector('.category__slider'),
    type: null,
}) 
let updateSlider = new slider({
    slideWidth: 128,
    parent: document.querySelector('.update__slider'),
    type: null,
})