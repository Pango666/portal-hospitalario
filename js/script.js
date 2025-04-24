document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('fa-times');
        this.classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('fa-times');
            mobileMenuBtn.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Login Modal
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.querySelector('.login-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form submissions (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would handle form submission here
            // For demo purposes, we'll just show an alert
            const formName = this.id === 'contactForm' ? 'Contacto' : 'Ingreso';
            alert(`Formulario de ${formName} enviado (simulado para esta demo).`);
            
            // Reset form
            this.reset();
            
            // Close modal if it's the login form
            if (this.id === 'loginForm' && loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Doctor card animations
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .doctor-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .about-content, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// OpenStreetMap Integration
function initMap() {
    // Coordenadas del centro de La Paz, Bolivia
    const laPazLocation = [-16.4956, -68.1335]; // Plaza Murillo
    
    // Crea el mapa
    const map = L.map('hospital-map').setView(laPazLocation, 13); // Zoom 13 para ver la ciudad
    
    // Agrega los tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Agrega un marcador genérico
    L.marker(laPazLocation).addTo(map)
        .bindPopup('La Paz, Bolivia<br>Sede principal de nuestra institución');
}

// Llama a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initMap);

// Carrusel Hero
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    let currentSlide = 0;
    let slideInterval;

    // Crear puntos de navegación
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Función para cambiar de slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reiniciar el temporizador al cambiar manualmente
        resetTimer();
    }

    // Función para siguiente slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Iniciar temporizador
    function startTimer() {
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    // Reiniciar temporizador
    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Iniciar
    startTimer();
}

// Llamar la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initSlider);