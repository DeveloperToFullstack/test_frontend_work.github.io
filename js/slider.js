class slider {

    slidesX = [];
    currentPosition = 0;
    movePosition = 0

    constructor (main) {
        this.getChildren(main.parent);
        this.type = main.type;
        this.createNavigation();
        this.calculate(main.slideWidth);
        this.transformNavigation();

        main.parent.addEventListener('touchstart', (event) => {this.touchStart(event)});
        main.parent.addEventListener('touchmove', (event) => {this.touchMove(event)});
        main.parent.addEventListener('touchend', () => {this.touchEnd()});
    }
    touchStart(event) {
        this.startPosition = event.touches[0].pageX;
        this.touchFlag = true;
    }
    touchMove(event) {
        if (this.touchFlag) {
            this.movePosition = event.touches[0].pageX - this.startPosition;
            if (this.currentPosition >= -this.sliderWidth) {
                this.movePosition+=this.currentPosition;
            }
            this.transformTrack(this.movePosition);
            this.transformNavigation();
        }
    }
    touchEnd() {
        this.touchFlag = false;
        this.currentPosition = -this.sliderBody.style.transform.replace(/[^\d.]/g, '');
        if (this.movePosition < -this.sliderWidth) {
            this.currentPosition = -this.sliderWidth;
        }
        if (this.movePosition > 0) {
            this.currentPosition = 0;
        }
        this.transformTrack(this.currentPosition);
        this.transformNavigation();
    }
    calculate (width) {
        for(let i = 0; i < this.slides.length; i++) {
            this.slidesX.push((width * i));
        }
        this.sliderWidth = this.slides.length * (parseInt(getComputedStyle(this.sliderBody).gap) + width) - document.documentElement.clientWidth;
        this.slides.forEach(el => {
            el.style.width = `${width}px`;
        });
        this.sliderBody.style.transform = `translateX(0px)`;
    }
    transformNavigation() {
        if (this.type == 'count') {
            let activeIndex;
            let lastIndex;
            for (let i = 0; i < this.slidesX.length-1;i++) {
                if (-this.movePosition >= this.slidesX[i] && -this.movePosition < this.slidesX[i + 1]) {
                    activeIndex = i;
                    break;
                }
                if (-this.movePosition >= this.slidesX[i + 1]) {
                    activeIndex = i + 1;
                }
            }
            if (lastIndex != activeIndex) {
                this.navChildren.forEach(child => {
                    if (child.classList.contains('active')) {
                        child.classList.remove('active')
                    }
                })
                this.navChildren[activeIndex].classList.add('active');
                lastIndex = activeIndex;
            }
        }
        if (this.type == 'range') {
            this.navChildren[0].style.width = `${-this.movePosition / this.sliderWidth * 100}%`;
        }
    }
    createNavigation() {
        if (this.type == 'count') {
            for (let i = 0; i < this.slides.length; i++) {
                this.navBlock.insertAdjacentHTML('beforeend',
                `<div class="slides__element"></div>`);
            }
        }
        if (this.type == 'range') {
            this.navBlock.insertAdjacentHTML('beforeend',
                `<div class="slides__element"></div>`);
        }
        if (this.type != null) {
            this.navChildren = this.navBlock.querySelectorAll('div');
        }
    }
    getChildren(parent) {
        this.sliderBody = parent.querySelector('.slider__body');
        this.slides = parent.querySelectorAll('.slide');
        this.navBlock = parent.querySelector('.slider__slides');
    }
    transformTrack (x) {
        this.sliderBody.style.transform = `translateX(${x}px)`;
    }

}