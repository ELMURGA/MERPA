// ================== MAIN JAVASCRIPT ==================

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todos los módulos
    initMobileMenu();
    initDropdowns();
    initScrollAnimations();
    initSmoothScroll();
    initNewsletterForm();
    initPhoneModal();
});

// ================== MODAL SELECTOR TELÉFONO ==================
function initPhoneModal() {
    // Crear el modal si no existe
    if (!document.getElementById('phoneModal')) {
        const modalHTML = `
            <div class="phone-modal-overlay" id="phoneModal">
                <div class="phone-modal">
                    <div class="phone-modal-header">
                        <h3>¿A qué tienda quieres llamar?</h3>
                        <p>Selecciona una de nuestras tiendas</p>
                    </div>
                    <a href="tel:+34955865715" class="phone-option">
                        <div class="phone-option-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div class="phone-option-info">
                            <h4>Tienda Torno</h4>
                            <span>955 865 715</span>
                        </div>
                    </a>
                    <a href="tel:+34955864705" class="phone-option">
                        <div class="phone-option-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div class="phone-option-info">
                            <h4>Tienda Ronda Zarzuelas</h4>
                            <span>955 864 705</span>
                        </div>
                    </a>
                    <button class="phone-modal-close" onclick="closePhoneModal()">Cancelar</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Cerrar al hacer clic en el overlay
        document.getElementById('phoneModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closePhoneModal();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closePhoneModal();
            }
        });
    }

    // Agregar evento a todos los triggers de teléfono en el footer
    document.querySelectorAll('.footer-phone-trigger').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            openPhoneModal();
        });
    });
}

function openPhoneModal() {
    const modal = document.getElementById('phoneModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ================== MENÚ MÓVIL ==================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    let navOverlay = document.querySelector('.nav-overlay');

    if (!mobileToggle || !nav) return;

    // Crear overlay si no existe en el HTML
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    // Marcar items que tienen dropdown para CSS (fallback para :has())
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.querySelector('.dropdown')) {
            item.classList.add('has-dropdown');
        }
    });

    // Toggle del menú
    mobileToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar al hacer clic en overlay
    navOverlay.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Manejo de dropdowns y links en móvil
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const parent = this.parentElement;
                // Si tiene dropdown, toggle open
                if (parent.querySelector('.dropdown')) {
                    e.preventDefault();
                    parent.classList.toggle('open');
                } else {
                    // Cerrar menú al navegar
                    mobileToggle.classList.remove('active');
                    nav.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ================== DROPDOWNS ==================
function initDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item');

    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (!dropdown) return;

        // Para dispositivos táctiles
        item.addEventListener('touchstart', function (e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
}

// ================== ANIMACIONES SCROLL ==================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para grupos de elementos
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar con reveal
    const animateElements = document.querySelectorAll(
        '.service-card, .category-card, .product-card, .store-card, .about-content, .about-image, .section-header'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        // Agregar delay escalonado dentro de cada grupo
        const parent = el.parentElement;
        const siblings = Array.from(parent.children).filter(child => child.classList.contains(el.className.split(' ')[0]));
        const siblingIndex = siblings.indexOf(el);
        el.dataset.delay = siblingIndex * 100;
        observer.observe(el);
    });

    // Animación especial para contadores
    initCounterAnimation();

    // Parallax suave para hero
    initParallax();
}

// ================== CONTADOR ANIMADO ==================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.about-experience strong');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const match = text.match(/(\d+)/);

                if (match) {
                    const finalValue = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    animateCounter(target, 0, finalValue, 2000, suffix);
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration, suffix) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (end - start) + start);
        element.textContent = current + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// ================== PARALLAX ==================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    }, { passive: true });
}


// ================== SMOOTH SCROLL ==================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================== NEWSLETTER FORM ==================
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;

        // Validación básica
        if (!validateEmail(email)) {
            showNotification('Por favor, introduce un email válido', 'error');
            return;
        }

        // Simulación de envío
        button.textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = '¡Suscrito!';
            showNotification('¡Gracias por suscribirte a nuestro newsletter!', 'success');
            this.reset();

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1000);
    });
}

// ================== UTILIDADES ==================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Eliminar notificación existente
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#00b894' : type === 'error' ? '#e63946' : '#1a4c7c',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease'
    });

    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
    `;

    document.body.appendChild(notification);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ================== HEADER SCROLL ==================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'var(--shadow-md)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'var(--shadow-lg)';
    }

    lastScroll = currentScroll;
});

// ================== LAZY LOADING IMAGES ==================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}
