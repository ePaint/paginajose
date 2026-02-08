/**
 * Contractor Portfolio Site - JavaScript
 * Handles: Mobile navigation, form validation, smooth scrolling, and year update
 */

document.addEventListener('DOMContentLoaded', function () {
    // Update current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;

            // Clear previous errors
            contactForm.querySelectorAll('.form__error').forEach(function (error) {
                error.remove();
            });
            contactForm.querySelectorAll('.is-invalid').forEach(function (input) {
                input.classList.remove('is-invalid');
            });

            // Validate required fields
            const nombre = contactForm.querySelector('#nombre');
            const email = contactForm.querySelector('#email');
            const distrito = contactForm.querySelector('#distrito');
            const mensaje = contactForm.querySelector('#mensaje');

            if (!nombre.value.trim()) {
                showError(nombre, 'Por favor, introduce tu nombre');
                isValid = false;
            }

            if (!email.value.trim()) {
                showError(email, 'Por favor, introduce tu correo electrónico');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, introduce un correo electrónico válido');
                isValid = false;
            }

            if (!distrito.value) {
                showError(distrito, 'Por favor, selecciona tu distrito');
                isValid = false;
            }

            if (!mensaje.value.trim()) {
                showError(mensaje, 'Por favor, escribe tu mensaje');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Real-time validation feedback
        contactForm.querySelectorAll('.form__input').forEach(function (input) {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                // Remove error state on input
                this.classList.remove('is-invalid');
                const errorEl = this.parentNode.querySelector('.form__error');
                if (errorEl) {
                    errorEl.remove();
                }
            });

            // Handle select change event
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function () {
                    this.classList.remove('is-invalid');
                    const errorEl = this.parentNode.querySelector('.form__error');
                    if (errorEl) {
                        errorEl.remove();
                    }
                });
            }
        });
    }

    /**
     * Show error message for a form field
     */
    function showError(input, message) {
        input.classList.add('is-invalid');
        const errorEl = document.createElement('span');
        errorEl.className = 'form__error';
        errorEl.textContent = message;
        input.parentNode.appendChild(errorEl);
    }

    /**
     * Validate a single field on blur
     */
    function validateField(input) {
        const value = input.value.trim();

        // Remove existing error
        input.classList.remove('is-invalid');
        const existingError = input.parentNode.querySelector('.form__error');
        if (existingError) {
            existingError.remove();
        }

        // Only validate required fields
        if (!input.required && !value) {
            return;
        }

        if (input.required && !value) {
            showError(input, 'Este campo es obligatorio');
            return;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, 'Por favor, introduce un correo electrónico válido');
        }
    }

    /**
     * Email validation helper
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based header shadow
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});
