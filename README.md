# DiegoWeb - Portafolio Personal

Portafolio personal de Diego Gajardo, desarrollado con Next.js 14, React y TypeScript.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Responsive Design** - Optimizado para móviles y desktop
- **SEO Optimizado** - Metadata y Open Graph configurados
- **Carrusel de Proyectos** - Con navegación por arrastre y flechas
- **Modal de Proyectos** - Vista detallada de cada proyecto
- **Menú Móvil** - Navegación hamburguesa responsive

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
DiegoWeb/
├── app/
│   ├── layout.tsx      # Layout principal con metadata
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/
│   ├── Header.tsx       # Componente de navegación
│   ├── Hero.tsx        # Sección hero
│   ├── Projects.tsx    # Carrusel de proyectos
│   ├── ProjectModal.tsx # Modal de detalles
│   ├── Skills.tsx      # Sección de herramientas
│   ├── Contact.tsx     # Sección de contacto
│   ├── Testimonial.tsx # Testimonios
│   └── Footer.tsx      # Footer
├── lib/
│   └── projects.ts     # Datos de proyectos
└── public/
    └── media/          # Imágenes y assets
```

## 🎨 Personalización

### Agregar/Editar Proyectos

Edita el archivo `lib/projects.ts` para agregar o modificar proyectos:

```typescript
{
  id: 1,
  title: "Título del Proyecto",
  description: "Descripción corta",
  image: "/ruta/a/imagen.jpg",
  tech: ["Tech1", "Tech2"],
  demoLink: "https://demo.com",
  repoLink: "https://github.com/repo",
  fullDescription: "Descripción completa del proyecto"
}
```

### Modificar Estilos

Los estilos globales están en `app/globals.css`. Puedes modificar colores, fuentes y espaciados según tus preferencias.

## 🚢 Despliegue

El proyecto está listo para desplegar en plataformas como:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

Para desplegar en Vercel:
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

## 📝 Licencia

© 2025 Diego Gajardo. Todos los derechos reservados.

