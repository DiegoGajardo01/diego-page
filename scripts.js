// Datos de proyectos
const projects = [
    {
        id: 1,
        title: "Business Intelligence para PedalPRO",
        description: "Sistema de BI para empresa de venta de bicicletas, desarrollado como proyecto de tesis. Incluye ETL, tableros de KPIs y análisis predictivo para decisiones comerciales.",
        image: "/api/placeholder/500/300",
        tech: ["Power BI", "Pentaho", "Python", "SQL"],
        demoLink: "#",
        repoLink: "#",
        fullDescription: "Implementación completa de solución Business Intelligence para PedalPRO, una empresa de distribución de bicicletas y accesorios. El proyecto incluyó el diseño e implementación de procesos ETL con Pentaho, desarrollo de tableros interactivos en Power BI y modelado predictivo con Python para análisis de ventas y proyección de crecimiento. Se logró una mejora del 30% en la toma de decisiones comerciales y una reducción del 25% en el tiempo de respuesta para generar informes de gestión."
    },
    {
        id: 2,
        title: "Sistema de Análisis Predictivo",
        description: "Desarrollo de algoritmos de Machine Learning para predecir la tasa de abandono (churn) de clientes en una plataforma de e-commerce.",
        image: "/api/placeholder/500/300",
        tech: ["Python", "Scikit-Learn", "TensorFlow", "Pandas", "Matplotlib"],
        demoLink: "#",
        repoLink: "#",
        fullDescription: "Implementación de un sistema de análisis predictivo para una plataforma de comercio electrónico que permitió anticipar la deserción de clientes con una precisión del 89%. El sistema utiliza modelos de Machine Learning entrenados con datos históricos de comportamiento de usuarios, información demográfica y patrones de compra. Se implementaron dashboards en tiempo real para el equipo de retención de clientes y se desarrollaron estrategias personalizadas basadas en segmentos de riesgo identificados por el modelo."
    },
    {
        id: 3,
        title: "Chatbot con IA para eCommerce",
        description: "Desarrollo e implementación de un chatbot impulsado por LLMs para atención al cliente en plataforma de comercio electrónico.",
        image: "/api/placeholder/500/300", 
        tech: ["Python", "Django", "NLP", "TensorFlow", "MongoDB"],
        demoLink: "#",
        repoLink: "#",
        fullDescription: "Desarrollo de un chatbot inteligente basado en modelos LLM para mejorar la experiencia de usuario en una plataforma de comercio electrónico. El sistema responde consultas sobre productos, gestiona reclamos básicos y facilita el proceso de compra. Se implementó una integración con la base de datos de productos y pedidos para proporcionar respuestas contextualizadas y personalizadas. El chatbot logró reducir en un 40% las consultas al equipo de soporte humano y mejoró la satisfacción del cliente en un 35% según encuestas posteriores a la implementación."
    },
    {
        id: 4,
        title: "Clasificación de Imágenes con CNN",
        description: "Algoritmo de reconocimiento de imágenes para clasificar productos por categorías utilizando Redes Neuronales Convolucionales.",
        image: "/api/placeholder/500/300",
        tech: ["Python", "TensorFlow", "CNNs", "Computer Vision", "NumPy"],
        demoLink: "#",
        repoLink: "#",
        fullDescription: "Desarrollo de un sistema de clasificación automática de imágenes de productos utilizando Redes Neuronales Convolucionales (CNN). El modelo fue entrenado con más de 50,000 imágenes etiquetadas distribuidas en 15 categorías de productos. Se alcanzó una precisión del 94% en la clasificación, permitiendo automatizar el proceso de catalogación en un marketplace. El sistema incluye una API REST para su integración con otros servicios y una interfaz web simple para cargar y clasificar imágenes manualmente."
    },
    {
        id: 5,
        title: "Aplicación Mobile CRUD",
        description: "Desarrollo de aplicación móvil con funcionalidades CRUD, utilizando Kotlin para Android con arquitectura MVVM y conexión a API REST.",
        image: "/api/placeholder/500/300",
        tech: ["Kotlin", "Android", "MVVM", "API REST", "SQLite"],
        demoLink: "#",
        repoLink: "#",
        fullDescription: "Aplicación móvil para Android desarrollada en Kotlin que permite la gestión completa de inventarios para pequeños negocios. Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando arquitectura MVVM para separación de responsabilidades. La aplicación cuenta con sincronización offline mediante SQLite y sincronización con backend cuando se recupera la conexión. Incluye funcionalidades como escaneo de códigos de barras, búsqueda avanzada y generación de reportes básicos de inventario."
    },
    {
        id: 6,
        title: "Clone de YouTube",
        description: "Aplicación móvil que replica las funcionalidades principales de YouTube, desarrollada en Dart con Flutter para múltiples plataformas.",
        image: "/api/placeholder/500/300",
        tech: ["Dart", "Flutter", "Firebase", "API REST"],
        demoLink: "#",
        repoLink: "#", 
        fullDescription: "Desarrollo de una aplicación cross-platform que replica las principales funcionalidades de YouTube utilizando Flutter y Dart. El proyecto implementa reproducción de videos, sistema de comentarios, likes, suscripciones a canales y recomendaciones personalizadas"
    }
];

// Variables para el carrusel
let currentSlide = 0;
const projectsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;

// Función para inicializar el carrusel de proyectos
function initProjectsCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    
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
    
    // Crear dots de navegación
    const totalPages = Math.ceil(projects.length / projectsPerView);
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
    
    // Crear flechas de navegación si no existen
    if (!document.querySelector('.carousel-arrow-prev')) {
        // Crear contenedor para flechas si no existe
        const arrowsContainer = document.createElement('div');
        arrowsContainer.className = 'carousel-arrows';
        
        // Flecha anterior
        const prevArrow = document.createElement('div');
        prevArrow.className = 'carousel-arrow carousel-arrow-prev';
        prevArrow.innerHTML = '&lt;';  // < símbolo
        prevArrow.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        // Flecha siguiente
        const nextArrow = document.createElement('div');
        nextArrow.className = 'carousel-arrow carousel-arrow-next';
        nextArrow.innerHTML = '&gt;';  // > símbolo
        nextArrow.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        // Añadir flechas al contenedor
        arrowsContainer.appendChild(prevArrow);
        arrowsContainer.appendChild(nextArrow);
        
        // Añadir contenedor de flechas después del carrusel
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.appendChild(arrowsContainer);
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
    const totalPages = Math.ceil(projects.length / projectsPerView);
    
    // Validar el índice para que esté dentro de los límites
    if (index < 0) index = 0;
    if (index >= totalPages) index = totalPages - 1;
    
    // Actualizar slide actual
    currentSlide = index;
    
    // Calcular posición de scroll
    const cardWidth = carousel.querySelector('.project-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 20;
    const scrollPosition = index * projectsPerView * (cardWidth + gap);
    
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
    updateArrowsState();
}

// Función para actualizar el estado de las flechas
function updateArrowsState() {
    const prevArrow = document.querySelector('.carousel-arrow-prev');
    const nextArrow = document.querySelector('.carousel-arrow-next');
    const totalPages = Math.ceil(projects.length / projectsPerView);
    
    if (prevArrow && nextArrow) {
        // Deshabilitar/habilitar flecha previa
        if (currentSlide === 0) {
            prevArrow.classList.add('disabled');
        } else {
            prevArrow.classList.remove('disabled');
        }
        
        // Deshabilitar/habilitar flecha siguiente
        if (currentSlide === totalPages - 1) {
            nextArrow.classList.add('disabled');
        } else {
            nextArrow.classList.remove('disabled');
        }
    }
}

// Función para configurar el desplazamiento por arrastre
function setupDragScroll() {
    const carousel = document.getElementById('projectsCarousel');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
        snapToNearestCard();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de scroll
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Soporte para dispositivos táctiles
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('touchend', () => {
        isDown = false;
        carousel.classList.remove('active');
        snapToNearestCard();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// Función para ajustar a la tarjeta más cercana después del arrastre
function snapToNearestCard() {
    const carousel = document.getElementById('projectsCarousel');
    const cardWidth = carousel.querySelector('.project-card').offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 20;
    const totalWidth = cardWidth + gap;
    
    // Calcular el índice más cercano
    const scrollPosition = carousel.scrollLeft;
    const nearestIndex = Math.round(scrollPosition / (totalWidth * projectsPerView));
    
    // Ir al slide más cercano
    goToSlide(nearestIndex);
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

// Manejar resize para responsive
window.addEventListener('resize', () => {
    // Actualizar número de proyectos por vista
    const newProjectsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    
    // Si cambia el número de proyectos por vista, reinicializar el carrusel
    if (newProjectsPerView !== projectsPerView) {
        initProjectsCarousel();
    }
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