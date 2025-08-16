
# Paradise Nursery — Proyecto final (SN Labs / GitHub Pages)

Aplicación de carrito de compras para una tienda de plantas de interior. Incluye:

- Página de destino (landing) con botón hacia listado de productos.
- Barra de navegación con enlaces a Inicio, Productos y Carrito, mostrando el contador de ítems.
- Tarjetas de producto con imagen, nombre, descripción, costo y botón **Agregar al carrito**.
- **Dos secciones mínimas**: *Plantas aromáticas* y *Plantas medicinales*, además de una vista de *Todas*.
- Página de carrito con miniatura, costo unitario, subtotal por tipo, botones para aumentar/disminuir cantidad y **Eliminar**.
- Botones **Continuar comprando** y **Pagar** (simulado).
- Funcionalidad dinámica: contador en icono del carrito, actualización de totales al cambiar cantidades, persistencia en `localStorage`.

## Estructura

```
/
├── index.html       (Landing)
├── products.html    (Catálogo con secciones)
├── cart.html        (Carrito)
├── styles.css
├── script.js
├── assets/*.png     (Imágenes de ejemplo)
└── products.json    (Referencia de datos)
```

## Cómo ejecutar localmente

Solo abre `index.html` en tu navegador. No requiere servidor.

## Deploy en GitHub Pages

1. Crea un repositorio público, por ejemplo `paradise-nursery`.
2. Sube **todos** los archivos de este proyecto a la rama `main`.
3. En **Settings → Pages**, en *Build and deployment*, elige:
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
4. Guarda. Tu sitio quedará disponible como:
   `https://<tu-usuario>.github.io/paradise-nursery/`

## URL para enviar

Una vez desplegado, envía la URL con el prefijo `https://`, por ejemplo:
`https://<tu-usuario>.github.io/paradise-nursery/`
