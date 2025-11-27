export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoLink: string;
  repoLink: string;
  fullDescription: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Agentes de IA para monitoreo de signos vitales",
    description: "Finalista de Hackatón de Agentes skyward. Desarrollé la arquitectura de agentes IA, incluyendo conversación por texto y voz, para el monitoreo de signos vitales en adultos mayores y alertar a familiares ante emergencias (MCP, ElevenLabs, OpenAI).",
    image: "",
    tech: ["MCP", "ElevenLabs", "OpenAI", "Python"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Desarrollé la arquitectura de agentes IA, incluyendo conversación por texto y voz, para el monitoreo de signos vitales en adultos mayores y alertar a familiares ante emergencias (MCP, ElevenLabs, OpenAI). La arquitectura incluye un agente principal que coordina la conversación con el usuario, un agente de monitoreo de signos vitales que analiza los datos del paciente y un agente de alerta que envía notificaciones y llamadas a los familiares en caso de emergencias."
  },
  {
    id: 2,
    title: "Sistema de visión por computadora para personas con discapacidad visual",
    description: "Desarrolle un sistema de visión por computadora para personas con discapacidad visual que permite a los usuarios interactuar con el entorno físico a través de una webcam, la cual detecta obstaculos y guía a los usuarios por su camino.",
    image: "",
    tech: ["Python", "YOLO", "Computer Vision", "OpenCV"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Desarrolle un sistema de visión por computadora para personas con discapacidad visual que permite a los usuarios interactuar con el entorno físico a través de una webcam, la cual detecta obstaculos y guía a los usuarios por su camino. El sistema utiliza el modelo YOLO para detectar obstaculos e indicarle el camino a seguir, además se implementó la api de Anthropic para que el sistema pueda responder preguntas."
  },
  {
    id: 3,
    title: "Business Intelligence para PedalPRO",
    description: "Sistema de BI para empresa de venta de bicicletas, desarrollado como proyecto de tesis. Incluye ETL, tableros de KPIs y análisis predictivo para decisiones comerciales.",
    image: "",
    tech: ["Power BI", "Pentaho", "Python", "SQL"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Implementación completa de solución Business Intelligence para PedalPRO, una empresa de distribución de bicicletas y accesorios. El proyecto incluyó el diseño e implementación de procesos ETL con Pentaho, desarrollo de tableros interactivos en Power BI y modelado predictivo con Python para análisis de ventas y proyección de crecimiento. Se logró una mejora del 30% en la toma de decisiones comerciales y una reducción del 25% en el tiempo de respuesta para generar informes de gestión."
  },
  {
    id: 4,
    title: "Sistema de Análisis Predictivo",
    description: "Desarrollo de algoritmos de Machine Learning para predecir la tasa de abandono (churn) de clientes en una plataforma de e-commerce.",
    image: "",
    tech: ["Python", "Scikit-Learn", "TensorFlow", "Pandas", "Matplotlib"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Implementación de un sistema de análisis predictivo para una plataforma de comercio electrónico que permitió anticipar la deserción de clientes con una precisión del 89%. El sistema utiliza modelos de Machine Learning entrenados con datos históricos de comportamiento de usuarios, información demográfica y patrones de compra. Se implementaron dashboards en tiempo real para el equipo de retención de clientes y se desarrollaron estrategias personalizadas basadas en segmentos de riesgo identificados por el modelo."
  },
  {
    id: 5,
    title: "Chatbot con IA para eCommerce",
    description: "Desarrollo e implementación de un chatbot impulsado por LLMs para atención al cliente en plataforma de comercio electrónico.",
    image: "",
    tech: ["Shopify", "Python"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Desarrollo de un chatbot inteligente basado en modelos LLM para mejorar la experiencia de usuario en una plataforma de comercio electrónico. El sistema responde consultas sobre productos, gestiona reclamos básicos y facilita el proceso de compra. Se implementó una integración con la base de datos de productos y pedidos para proporcionar respuestas contextualizadas y personalizadas. El chatbot logró reducir en un 40% las consultas al equipo de soporte humano y mejoró la satisfacción del cliente en un 35% según encuestas posteriores a la implementación."
  },
  {
    id: 6,
    title: "Clasificación de Imágenes con CNN",
    description: "Algoritmo de reconocimiento de imágenes para clasificar productos por categorías utilizando Redes Neuronales Convolucionales.",
    image: "",
    tech: ["Python", "TensorFlow", "CNNs", "Computer Vision", "NumPy"],
    demoLink: "#",
    repoLink: "#",
    fullDescription: "Desarrollo de un sistema de clasificación automática de imágenes de productos utilizando Redes Neuronales Convolucionales (CNN). El modelo fue entrenado con más de 50,000 imágenes etiquetadas distribuidas en 15 categorías de productos. Se alcanzó una precisión del 89% en la clasificación, permitiendo automatizar el proceso de catalogación en un marketplace. El sistema incluye una API REST para su integración con otros servicios y una interfaz web simple para cargar y clasificar imágenes manualmente."
  }
];

