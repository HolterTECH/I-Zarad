// Инициализация 3D flip cards для мобильных устройств
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Для десктопов используем hover (уже есть в CSS)
        // Для мобильных добавляем обработчик touch/click
        card.addEventListener('click', function() {
            // На мобильных устройствах используем toggle класса active
            if (window.innerWidth <= 768) {
                // Закрываем все другие карточки
                flipCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                    }
                });
                
                // Открываем/закрываем текущую карточку
                this.classList.toggle('active');
            }
        });
    });
    
    // Закрытие карточек при клике вне их
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideCard = Array.from(flipCards).some(card => 
                card.contains(event.target)
            );
            
            if (!isClickInsideCard) {
                flipCards.forEach(card => {
                    card.classList.remove('active');
                });
            }
        }
    });
}

// Упрощенный слайдер для команды
function initTeamSlider() {
    const sliderTrack = document.querySelector('.team-slider-track');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dots = document.querySelectorAll('.slider-dot');
    const teamMembers = document.querySelectorAll('.team-member');
    
    if (!sliderTrack) {
        console.error('Слайдер не найден!');
        return;
    }
    
    let currentIndex = 0;
    let slideWidth = 0;
    let slidesPerView = getSlidesPerView();
    
    // Определяем количество слайдов
    function getSlidesPerView() {
        if (window.innerWidth >= 1600) return 4;
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Обновляем ширину слайда
    function updateSlideWidth() {
        const container = document.querySelector('.team-slider-container');
        if (!container) return;
        
        const containerWidth = container.offsetWidth - 120;
        const gap = 30;
        slideWidth = (containerWidth - (gap * (slidesPerView - 1))) / slidesPerView;
        
        teamMembers.forEach(member => {
            member.style.minWidth = slideWidth + 'px';
            member.style.maxWidth = slideWidth + 'px';
        });
    }
    
    // Обновляем позицию
    function updatePosition() {
        const offset = -currentIndex * (slideWidth + 30);
        sliderTrack.style.transform = `translateX(${offset}px)`;
        updateDots();
    }
    
    // Обновляем точки
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
        });
    }
    
    // Далее
    function nextSlide() {
        const maxIndex = teamMembers.length - slidesPerView;
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updatePosition();
    }
    
    // Назад
    function prevSlide() {
        const maxIndex = teamMembers.length - slidesPerView;
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updatePosition();
    }
    
    // К конкретному слайду
    function goToSlide(index) {
        currentIndex = index * slidesPerView;
        const maxIndex = teamMembers.length - slidesPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updatePosition();
    }
    
    // Инициализация
    function init() {
        console.log('Инициализация слайдера...');
        
        slidesPerView = getSlidesPerView();
        updateSlideWidth();
        updatePosition();
        
        // Кнопки
        if (prevBtn) prevBtn.onclick = prevSlide;
        if (nextBtn) nextBtn.onclick = nextSlide;
        
        // Точки
        dots.forEach((dot, index) => {
            dot.onclick = () => goToSlide(index);
        });
        
        // Ресайз
        window.addEventListener('resize', () => {
            slidesPerView = getSlidesPerView();
            updateSlideWidth();
            updatePosition();
        });
        
        console.log('Слайдер готов!');
    }
    
    // Запускаем
    setTimeout(init, 100); // Небольшая задержка для полной загрузки
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Открытие меню
    menuBtn.addEventListener('click', () => {
        mobileMenu.style.display = 'block';
        setTimeout(() => {
            mobileMenu.classList.add('active');
            menuBtn.classList.add('active');
        }, 10);
    });
    
    // Закрытие меню
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Закрытие по клику на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрытие по клику вне меню
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initFlipCards();
    initTeamSlider();
    initMobileMenu(); // Добавлено
});