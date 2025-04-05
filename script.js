// Importar datos de proyectos
import { projects } from './projects.js';

// Variables para el carrusel
let currentSlide = 0;
const projectsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initProjectsCarousel();
    setupMenuToggle();
});

// Funciones de inicialización
function initProjectsCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    // Actualizar projectsPerView basado en el ancho actual
    const currentProjectsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    
    // Limpiar contenedores por si ya tienen elementos
    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Crear cards de proyectos
    projects.forEach((project, index) => {
        // Crear card del proyecto
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.projectId = project.id;
        
        // Contenido de la card
        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="#" class="project-link">Ver detalles</a>
        `;
        
        // Evento click para abrir modal
        projectCard.addEventListener('click', () => openProjectModal(project));
        
        // Añadir card al carrusel
        carousel.appendChild(projectCard);
    });
     // Agregar eventos de clic a las flechas
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
 
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
     });
 
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
     });
    // Crear dots de navegación
    const totalPages = Math.ceil(projects.length / currentProjectsPerView);
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
    
    // Configurar desplazamiento manual
    setupDragScroll();
    
    // Mostrar el slide inicial
    goToSlide(0);
}

// Función para ir a un slide específico
function goToSlide(index) {
    const carousel = document.getElementById('projectsCarousel');
    const dots = document.querySelectorAll('.dot');
    const cards = carousel.querySelectorAll('.project-card');
    
    // Actualizar projectsPerView basado en el ancho actual de la ventana
    const currentProjectsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
        
    const totalPages = Math.ceil(projects.length / currentProjectsPerView);
    
    // Validar el índice para que esté dentro de los límites
    if (index < 0) index = 0;
    if (index >= totalPages) index = totalPages - 1;
    
    // Actualizar slide actual
    currentSlide = index;
    
    // Calcular posición de scroll
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 20;
    
    // En móviles, necesitamos mover tarjetas individuales, no grupos
    const scrollPosition = index * (cardWidth + gap) * currentProjectsPerView;
    
    // Aplicar scroll
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Actualizar dot activo
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Actualizar estado de flechas
    updateArrowsState(totalPages);
}

// Función para abrir el modal de proyecto
function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    
    // Llenar contenido del modal
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    
    // Tecnologías
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Descripción completa
    document.getElementById('modalDesc').textContent = project.fullDescription || project.description;
    
    // Enlaces
    const demoLink = document.getElementById('modalDemo');
    const repoLink = document.getElementById('modalRepo');
    
    demoLink.href = project.demoLink;
    repoLink.href = project.repoLink;
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Funcionalidad de menú hamburguesa
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    const navLinkElements = document.querySelectorAll('.nav-links a');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Función para configurar el desplazamiento por arrastre
function setupDragScroll() {
    const carousel = document.getElementById('projectsCarousel');
    let isDown = false;
    let startX;
    let scrollLeft;
    let hasMoved = false;
    
    // Eventos para mouse
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        hasMoved = false;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        e.preventDefault(); // Prevenir comportamiento por defecto
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            carousel.classList.remove('active');
            if (hasMoved) {
                snapToNearestCard();
            }
        }
    });
    
    carousel.addEventListener('mouseup', (e) => {
        if (isDown) {
            isDown = false;
            carousel.classList.remove('active');
            if (hasMoved) {
                snapToNearestCard();
            } else {
                // Si no se ha movido, es un clic en la tarjeta
                const card = e.target.closest('.project-card');
                if (card) {
                    const projectId = parseInt(card.dataset.projectId);
                    const project = projects.find(p => p.id === projectId);
                    if (project) {
                        openProjectModal(project);
                    }
                }
            }
        }
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        hasMoved = true;
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de scroll
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Eventos para dispositivos táctiles
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        hasMoved = false;
        carousel.classList.add('active');
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (isDown) {
            isDown = false;
            carousel.classList.remove('active');
            if (hasMoved) {
                snapToNearestCard();
            } else {
                // Si no se ha movido, es un tap en la tarjeta
                const card = e.target.closest('.project-card');
                if (card) {
                    const projectId = parseInt(card.dataset.projectId);
                    const project = projects.find(p => p.id === projectId);
                    if (project) {
                        openProjectModal(project);
                    }
                }
            }
        }
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        hasMoved = true;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
        e.preventDefault(); // Prevenir scroll de la página
    }, { passive: false });
}

// Función para ajustar a la tarjeta más cercana después del arrastre
function snapToNearestCard() {
    const carousel = document.getElementById('projectsCarousel');
    const cardWidth = carousel.querySelector('.project-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 20;
    const totalWidth = cardWidth + gap;
    
    // Calcular el índice más cercano
    const scrollPosition = carousel.scrollLeft;
    const nearestIndex = Math.round(scrollPosition / totalWidth / projectsPerView);
    
    // Ir al slide más cercano
    goToSlide(nearestIndex);
}

// Manejar resize para responsive
window.addEventListener('resize', () => {
    // Reinicializar el carrusel para que se adapte al nuevo tamaño
    initProjectsCarousel();
});

// Evento para cerrar modal con la X
document.querySelector('.close-modal').addEventListener('click', closeProjectModal);

// Evento para cerrar modal con click fuera
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Inicializar carrusel cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initProjectsCarousel();
});

// Función para actualizar el estado de las flechas
function updateArrowsState(totalPages) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Deshabilitar la flecha anterior si estamos en la primera diapositiva
    if (currentSlide === 0) {
        prevButton.disabled = true; // O puedes ocultar el botón
    } else {
        prevButton.disabled = false; // Habilitar el botón
    }

    // Deshabilitar la flecha siguiente si estamos en la última diapositiva
    if (currentSlide >= totalPages - 1) {
        nextButton.disabled = true; // O puedes ocultar el botón
    } else {
        nextButton.disabled = false; // Habilitar el botón
    }
}