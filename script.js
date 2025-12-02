document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    const navLinks = document.querySelectorAll('.nav-list a');
    const downloadBtn = document.querySelector('.download-btn');
    
    // Открытие/закрытие мобильного меню
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Меняем иконку
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие мобильного меню при клике на ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Плавная прокрутка для всех ссылок навигации
    const allNavLinks = [...navLinks, ...mobileNavLinks];
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Добавляем класс при прокрутке для стилизации шапки
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu')) {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Обработка кнопки "Скачать"
    downloadBtn.addEventListener('click', function() {
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Здесь можно добавить логику для скачивания
        // Например, открытие модального окна или перенаправление на страницу загрузки
        
        // Временное сообщение
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Показать сообщение (в реальном проекте здесь будет редирект на скачивание)
            alert('В реальном проекте здесь начнётся скачивание файла. Вы можете заменить этот код на реальную ссылку для скачивания.');
        }, 1500);
    });
    
    // Анимация появления hero-секции
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Добавляем классы для анимации после загрузки страницы
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
    }, 300);
    
    // Изначальные стили для анимации
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateY(30px)';
    heroImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
});