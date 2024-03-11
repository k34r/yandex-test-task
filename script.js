(function () {
    //-----------  slider  ------------
    let position = 0
    let cardToShow = 3
    const slider = document.querySelector('.slider')
    if (slider.offsetWidth < 900) cardToShow = 2
    if (slider.offsetWidth < 600) {
        cardToShow = 1
        const buttonDesktop = document.querySelector('.button-wrapper.desktop')
        buttonDesktop.remove()
        SliderMobile()
        document.querySelector('.mobile-crap__picture').remove()
    }
    let num = cardToShow
    const sliderTracker = document.querySelector('.slider-tracker')
    const cards = document.querySelectorAll('.card')
    const btnPrev = document.querySelector('.btn.prev')
    const btnNext = document.querySelector('.btn.next')
    const numOne = document.querySelector('.num-1')
    const cardWidth = Math.trunc(slider.offsetWidth / cardToShow)
    numOne.textContent = num
    document.querySelector('.num-2').textContent = cards.length




    cards.forEach(item => item.style.minWidth = cardWidth + 'px')

    const setPosition = (position) => sliderTracker.style.transform = `translateX(${position}px)`

    const checkBtn = () => {
        btnPrev.disabled = position === 0
        if (position === 0) {
            btnPrev.classList.remove('prev')
            btnPrev.classList.add('prev-disable')
        } else {
            btnPrev.classList.remove('prev-disable')
            btnPrev.classList.add('prev')
        }

        btnNext.disabled = position <= - (cards.length - cardToShow) * cardWidth
        if (num === cards.length) {
            btnNext.classList.remove('next')
            btnNext.classList.add('next-disable')
        } else {
            btnNext.classList.remove('next-disable')
            btnNext.classList.add('next')
        }
    }

    const ShowPrevCard = () => {
        const cardLeft = Math.abs(position) / cardWidth

        position += cardLeft >= cardToShow ? cardToShow * cardWidth : cardLeft * cardWidth
        num -= cardLeft >= cardToShow ? cardToShow : cardLeft
        numOne.textContent = num

        setPosition(position)
        checkBtn()
    }

    const ShowNextCard = () => {
        const cardRight = cards.length - (Math.abs(position) + cardToShow * cardWidth) / cardWidth

        position -= cardRight >= cardToShow ? cardToShow * cardWidth : cardRight * cardWidth
        num += cardRight >= cardToShow ? cardToShow : cardRight
        numOne.textContent = num

        setPosition(position)
        checkBtn()
    }

    const TimerShow = () => {
        if (num === cards.length) {
            position = 0
            num = cardToShow
            numOne.textContent = num
            setPosition(position)
            checkBtn()
        } else {
            ShowNextCard()
        }
    }

    let MoveCards = setInterval(TimerShow, 4000)
    let DeleteMoveCards = () => clearInterval(MoveCards)

    btnPrev.addEventListener('click', ShowPrevCard)
    btnPrev.addEventListener('click', DeleteMoveCards)
    btnNext.addEventListener('click', ShowNextCard)
    btnNext.addEventListener('click', DeleteMoveCards)

    checkBtn()


    function SliderMobile() {
       
        const sliderMobile = document.querySelector('.section-3__slider')
        const sliderTrackerMobile = document.querySelector('.section-3__tracker')
        const cardsMobile = document.querySelectorAll('.section-3__card')
        const btnPrevMobile = document.querySelector('.section-3__Prev')
        const btnNextMobile = document.querySelector('.section-3__Next')
        const ovals = document.querySelectorAll('.section-3__oval')
        let positionMobile = 0
    
        cardsMobile.forEach(item => item.style.minWidth = sliderMobile.offsetWidth + 'px')
    
        const setPositionMobile = (position) => sliderTrackerMobile.style.transform = `translateX(${position}px)`
    
        const checkBtnMobile = () => {
            btnPrevMobile.disabled = positionMobile === 0
            btnNextMobile.disabled = Math.abs(positionMobile) === sliderMobile.offsetWidth * (cardsMobile.length - 1)
    
            ovals.forEach(item => item.style.backgroundColor = '#D9D9D9')
            ovals[Math.abs(positionMobile / sliderMobile.offsetWidth)].style.backgroundColor = '#313131'
    
            if (positionMobile === 0) {
                btnPrevMobile.classList.remove('section-3__Prev')
                btnPrevMobile.classList.add('PrevDisableMobile')
            } else {
                btnPrevMobile.classList.remove('PrevDisableMobile')
                btnPrevMobile.classList.add('section-3__Prev')
            }
    
            if (Math.abs(positionMobile) === sliderMobile.offsetWidth * (cardsMobile.length - 1)) {
                btnNextMobile.classList.remove('section-3__Next')
                btnNextMobile.classList.add('NextDisableMobile')
            } else {
                btnNextMobile.classList.remove('NextDisableMobile')
                btnNextMobile.classList.add('section-3__Next')
            }
        }
    
        const ShowPrevCardMobile = () => {
            positionMobile += sliderMobile.offsetWidth
            setPositionMobile(positionMobile)
            checkBtnMobile()
        }
    
        const ShowNextCardMobile = () => {
            positionMobile -= sliderMobile.offsetWidth
            setPositionMobile(positionMobile)
            checkBtnMobile()
        }
    
        btnPrevMobile.addEventListener('click', ShowPrevCardMobile)
        btnNextMobile.addEventListener('click', ShowNextCardMobile)
    
        checkBtnMobile()
    }
    





    // -------- smooth scroll ------------
    const anchors = document.querySelectorAll('.header__button')

    for (let anchor of anchors) {
        anchor.addEventListener('click', (event) => {
            event.preventDefault()
            const blockHref = anchor.getAttribute('href')
            document.querySelector('' + blockHref).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
})()