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

2. Configura las variables de entorno:
Crea un archivo `.env.local` en la raíz del proyecto con:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
DiegoWeb/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # API endpoint para formulario de contacto
│   ├── layout.tsx          # Layout principal con metadata
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/
│   ├── Header.tsx         # Componente de navegación
│   ├── Hero.tsx           # Sección hero
│   ├── About.tsx          # Sección sobre mí
│   ├── Services.tsx       # Sección de servicios
│   ├── Projects.tsx       # Carrusel de proyectos
│   ├── ProjectModal.tsx   # Modal de detalles
│   ├── Process.tsx        # Proceso de trabajo
│   ├── Skills.tsx         # Sección de herramientas
│   ├── Testimonials.tsx   # Testimonios
│   ├── ContactForm.tsx    # Formulario de contacto
│   └── Footer.tsx         # Footer
├── lib/
│   ├── projects.ts        # Datos de proyectos
│   ├── supabase.ts        # Cliente de Supabase
│   └── rate-limit.ts      # Rate limiting para API
└── public/
    └── media/             # Imágenes y assets
```

## 🗄️ Configuración de Base de Datos

El formulario de contacto requiere una tabla en Supabase con la siguiente estructura:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(100),
  message TEXT NOT NULL,
  reviewed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
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

