// script.js
// Versión documentada en español del script original.

document.addEventListener('DOMContentLoaded', function() {
    // Toggle del menú móvil (hamburguesa)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Inicializa el carousel de testimonios (loop infinito)
    const initTestimonialsCarousel = () => {
        const track = document.querySelector('.testimonials-track');
        if (!track) return; // si no existe la pista de testimonios, salir
        
        // Clona el primer conjunto de testimonios y los añade al final
        // para crear un efecto infinito (se repite la secuencia)
        const testimonials = track.querySelectorAll('.testimonial-card');
        const firstSet = Array.from(testimonials).slice(0, 3); // tomar los primeros 3
        
        firstSet.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Pausar la animación cuando el ratón esté encima de los testimonios
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        // Reanudar la animación cuando el ratón salga
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
        
        // Listener para cuando la animación itera (opcional: aquí podrías
        // ajustar la posición si usas una técnica diferente para el loop).
        track.addEventListener('animationiteration', () => {
            // Cuando la animación se reinicia, se mostrará el set original de testimonios.
            // Este handler está preparado si necesitas lógica extra en cada iteración.
        });
    };
    
    // Llamar a la inicialización del carousel
    initTestimonialsCarousel();
    
    // Abrir/cerrar menú móvil al clicar la hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú móvil al clicar cualquier enlace (mejor experiencia en móviles)
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Manejo del envío del formulario de comentarios
    const commentForm = document.getElementById('comment-form');
    const thankYouMessage = document.getElementById('thank-you');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // evitar envío tradicional
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            
            // Aquí normalmente se enviaría la información a un servidor (fetch / XHR)
            console.log('Nuevo comentario enviado:', { name, email, comment, rating });
            
            // Mostrar mensaje de agradecimiento y ocultar formulario
            commentForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // Hacer scroll suave hasta el mensaje de agradecimiento
            thankYouMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Efecto de labels flotantes en inputs (añade/quita clase .focused)
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        // Al enfocar, añadir clase focused al contenedor (para animación CSS)
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        // Al perder foco, si está vacío quitar la clase
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Si el input ya tiene valor al cargar la página, mantener la clase focused
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Scroll suave para enlaces con anclas internas (href que empieza por "#")
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // si solo apunta a '#', no hacer nada
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // ajustar por header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Resaltar el enlace de la navegación según la sección visible al hacer scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let scrollPosition = window.scrollY + 100; // offset para activar antes
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Efecto hover dinámico en tarjetas de producto (captura posición del mouse)
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Variables CSS --x y --y para usar en estilos (ej. iluminación/gradiente)
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Efecto parallax simple para la sección hero (seguimiento del mouse)
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            // Cambia la posición de fondo para dar sensación de profundidad
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }
    
    // Animar botones CTA cuando entren en la vista al hacer scroll
    const animateOnScroll = () => {
        const ctaButtons = document.querySelectorAll('.cta-button, .product-button');
        
        ctaButtons.forEach(button => {
            const buttonPosition = button.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (buttonPosition < screenPosition) {
                // Mostrar y mover a posición original
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Estado inicial para animaciones (ocultos y desplazados)
    document.querySelectorAll('.cta-button, .product-button').forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación en cada scroll y una vez al cargar
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    // Animación de carga: fade-in del body cuando la página termina de cargar
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});