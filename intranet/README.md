# Vantage Tech Labs - Intranet System

Sistema de gestión interno para Vantage Tech Labs con diseño glassmorphism moderno.

## 🚀 Stack Tecnológico

- **Framework**: React 18
- **Build Tool**: Vite
- **Lenguaje**: TypeScript
- **Estilo**: Tailwind CSS (custom glassmorphism design)
- **Gráficos**: Recharts  
- **Iconos**: Lucide React

## 📁 Estructura del Proyecto

```
intranet/
├── src/
│   ├── App.tsx                # Aplicación principal
│   ├── components/            # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── CashFlowChart.tsx
│   │   └── AIInsight.tsx
│   ├── index.css             # Estilos globales + Tailwind
│   └── main.tsx              # Entry point
├── public/                    # Assets estáticos
├── index.html
├── tailwind.config.js        # Configuración Tailwind
├── vite.config.ts            # Configuración Vite
└── package.json

```

## 🎯 Módulos Implementados

### ✅ Dashboard / Overview (Completo)
- Bienvenida personalizada
- 4 Métricas clave del negocio (Ingresos, Inventario, Nómina, Caja)
- Gráfico interactivo de flujo de caja (Recharts)
- Insights impulsados por IA
- Diseño glassmorphism con animaciones suaves

### 🚧 En Desarrollo
- **Finanzas**: Gestión financiera completa
- **Inventario**: Control de stock y proveedores
- **RRHH**: Gestión de empleados y nómina
- **Proyectos**: CRM y gestión de clientes
- **Ajustes**: Configuración del sistema

## 💻 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🌐 URLs

- **Desarrollo**: http://localhost:5173 (Vite dev server)
- **Producción**: (próximamente en Vercel)

## 🎨 Características de Diseño

- **Glassmorphism**: Tarjetas semitransparentes con blur y sombras suaves
- **Gradientes**: Azul-índigo para elementos principales
- **Animaciones**: Transiciones suaves y microinteracciones
- **Responsive**: Se adapta a dispositivos móviles, tablets y desktop
- **Dark corners**: Bordes redondeados generosos (20px)
- **Active states**: Estados visuales claros para navegación

## 🔧 Configuración Tailwind

El proyecto usa una configuración personalizada de Tailwind con:
- Colores de marca (índigo, slate)
- Clases custom para glass cards
- Animaciones personalizadas
- Espaciado y tipografía optimizados

## 👥 Usuario de Prueba

- **Nombre**: Juan Dominguez
- **Rol**: Administrador
- **Avatar**: Iniciales JD

## 📊 Próximos Pasos

1. ✅ Copiar proyecto desde playground a VantageTechLabs
2. 🔄 Implementar rutas dinámicas para cada módulo
3. 🔄 Conectar base de datos (Supabase/PostgreSQL)
4. 🔄 Implementar autenticación real
5. 🔄 Desarrollar módulos completos (Finanzas, Inventario, etc.)
6. 🔄 Deploy a Vercel con dominio personalizado

## 🚀 Deployment

El proyecto está listo para deployment en Vercel:

```bash
# Connect to Vercel
vercel

# Deploy to production
vercel --prod
```

## 📝 Notas

- El diseño actual es completamente funcional y responsive
- La navegación entre módulos está implementada con estados visuales
- Los datos actuales son de ejemplo (mock data)
- Preparado para integración con backend REST API
