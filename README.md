**Primer-parcial-programacion-3**  
**Food Store - Primer Parcial Programación 3**  
**Descripción**  
Food Store es una aplicación frontend de catálogo de productos y carrito de compras desarrollada con HTML5, CSS3, TypeScript y Vite. El proyecto extiende el repositorio base de protección de rutas agregando funcionalidades de tienda online.  
**Funcionalidades implementadas**  
- **Catálogo de productos**: visualización de 20 productos con imágenes, descripciones, precios y stock  
- **Búsqueda por nombre**: campo de búsqueda que filtra productos en tiempo real  
- **Filtrado por categoría**: sidebar con categorías (Pizzas, Hamburguesas, Bebidas, Postres, Empanadas, Ensaladas)  
- **Carrito de compras**: agregar productos, modificar cantidades, eliminar items  
- **Persistencia en localStorage**: el carrito se mantiene al recargar la página  
- **Cálculo de total**: suma automática de subtotales en la vista del carrito  
- **Protección de rutas**: autenticación por roles (admin/cliente) heredada del repositorio base  
**Instalación y ejecución**  
Se requiere Node.js y pnpm.  
# Instalar pnpm (si no está instalado)  
 npm install -g pnpm  
   
 # Instalar dependencias  
 pnpm install  
   
 # Iniciar servidor de desarrollo  
 pnpm dev  
   
La aplicación estará disponible en http://localhost:5173.  
Para hacer build de producción:  
pnpm build  
   
**Estructura del proyecto**  
src/  
 ├── data/  
 │   └── data.ts              # Datos de productos y categorías  
 ├── pages/  
 │   ├── admin/               # Páginas de administrador  
 │   ├── auth/                # Login y registro  
 │   ├── client/              # Páginas de cliente  
 │   └── store/  
 │       ├── home/            # Catálogo de productos  
 │       └── cart/            # Vista del carrito  
 ├── types/  
 │   ├── product.ts           # Interfaces Product y CartItem  
 │   ├── category.ts          # Interface ICategory  
 │   ├── IUser.ts             # Interface de usuario  
 │   └── Rol.ts               # Tipo de rol  
 └── utils/  
     ├── auth.ts              # Verificación de autenticación  
     ├── cart.ts              # Lógica del carrito (localStorage)  
     ├── localStorage.ts      # Utilidades localStorage  
     └── navigate.ts          # Redirección  
   
**Uso**  
1. Iniciar sesión con cualquier email y seleccionar rol "Cliente"  
2. Navegar el catálogo de productos  
3. Usar el buscador y los filtros por categoría  
4. Agregar productos al carrito  
5. Ir al carrito para revisar la compra, modificar cantidades o eliminar items  


**Link del video**  
https://youtu.be/TglYYc3Atd4