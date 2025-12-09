// Анимация подчеркивания в шапке
class HeaderAnimation {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.navList = document.querySelector('.nav-list');
        this.navIndicator = document.querySelector('.nav-indicator');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        this.currentSection = '';
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (!this.navIndicator) return;
        
        // Инициализация индикатора
        this.setInitialIndicatorPosition();
        
        // Обработчики для десктопных ссылок
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e, link));
            link.addEventListener('mouseenter', () => this.handleLinkHover(link));
        });
        
        // Обработчики для мобильных ссылок
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleMobileLinkClick(e, link));
        });
        
        // Следим за скроллом для обновления активного раздела
        window.addEventListener('scroll', () => this.updateActiveSection());
        
        // Обработка ресайза окна
        window.addEventListener('resize', () => {
            this.updateIndicatorPosition();
            this.updateActiveSection();
        });
        
        // Инициализация при загрузке
        setTimeout(() => {
            this.updateActiveSection();
        }, 500);
    }
    
    setInitialIndicatorPosition() {
        const firstLink = this.navLinks[0];
        if (firstLink) {
            this.moveIndicatorToLink(firstLink);
            firstLink.classList.add('active');
        }
    }
    
    moveIndicatorToLink(link) {
        if (!this.navIndicator || !link) return;
        
        const linkRect = link.getBoundingClientRect();
        const navRect = this.navList.getBoundingClientRect();
        
        const indicatorWidth = linkRect.width * 0.7; // 70% ширины ссылки
        const leftPosition = linkRect.left - navRect.left + (linkRect.width - indicatorWidth) / 2;
        
        this.navIndicator.style.width = `${indicatorWidth}px`;
        this.navIndicator.style.left = `${leftPosition}px`;
        this.navIndicator.style.opacity = '1';
    }
    
    handleLinkClick(e, link) {
        e.preventDefault();
        
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // Анимация индикатора
        this.animateIndicatorToLink(link);
        
        // Обновляем активную ссылку
        this.updateActiveLink(link);
        
        // Плавный скролл к секции
        this.scrollToSection(targetSection, () => {
            this.isAnimating = false;
        });
        
        // Закрываем мобильное меню, если оно открыто
        this.closeMobileMenu();
    }
    
    handleMobileLinkClick(e, link) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (!targetSection) return;
        
        // Обновляем активную ссылку
        this.updateActiveLink(link);
        
        // Плавный скролл к секции
        this.scrollToSection(targetSection);
        
        // Закрываем мобильное меню
        this.closeMobileMenu();
    }
    
    handleLinkHover(link) {
        if (this.isAnimating || !this.navIndicator) return;
        
        const linkRect = link.getBoundingClientRect();
        const navRect = this.navList.getBoundingClientRect();
        
        const indicatorWidth = linkRect.width * 0.7;
        const leftPosition = linkRect.left - navRect.left + (linkRect.width - indicatorWidth) / 2;
        
        // Временное смещение индикатора при наведении
        this.navIndicator.style.transition = 'all 0.2s ease';
        this.navIndicator.style.width = `${indicatorWidth}px`;
        this.navIndicator.style.left = `${leftPosition}px`;
        this.navIndicator.style.opacity = '0.7';
        
        // Возвращаем нормальную скорость анимации
        setTimeout(() => {
            this.navIndicator.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 200);
    }
    
    animateIndicatorToLink(link) {
        const linkRect = link.getBoundingClientRect();
        const navRect = this.navList.getBoundingClientRect();
        
        const indicatorWidth = linkRect.width * 0.7;
        const leftPosition = linkRect.left - navRect.left + (linkRect.width - indicatorWidth) / 2;
        
        this.navIndicator.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.navIndicator.style.width = `${indicatorWidth}px`;
        this.navIndicator.style.left = `${leftPosition}px`;
        this.navIndicator.style.opacity = '1';
    }
    
    updateActiveLink(activeLink) {
        // Удаляем класс active со всех ссылок
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Добавляем класс active к активной ссылке
        activeLink.classList.add('active');
        
        // Находим соответствующую мобильную ссылку
        const linkHref = activeLink.getAttribute('href');
        const mobileLink = Array.from(this.mobileNavLinks).find(link => 
            link.getAttribute('href') === linkHref
        );
        
        if (mobileLink) {
            mobileLink.classList.add('active');
        }
    }
    
    scrollToSection(section, callback = null) {
        const headerHeight = this.header ? this.header.offsetHeight : 80;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
        
        if (callback) {
            setTimeout(callback, 1000); // Время анимации скролла
        }
    }
    
    updateActiveSection() {
        if (this.isAnimating) return;
        
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + (this.header ? this.header.offsetHeight + 100 : 100);
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Если текущая секция изменилась
        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            
            // Находим соответствующую ссылку
            const activeLink = Array.from(this.navLinks).find(link => 
                link.getAttribute('href') === `#${currentSection}`
            );
            
            if (activeLink) {
                this.updateActiveLink(activeLink);
                this.moveIndicatorToLink(activeLink);
            }
        }
    }
    
    updateIndicatorPosition() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && this.navIndicator) {
            this.moveIndicatorToLink(activeLink);
        }
    }
    
    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        const closeBtn = document.querySelector('.close-menu-btn');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            
            // Анимация закрытия
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }
        
        // Также сбрасываем состояние кнопки бургер-меню
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn) {
            menuBtn.classList.remove('active');
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new HeaderAnimation();
});