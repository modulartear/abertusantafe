# Plantilla ecommerce reutilizable

Este repositorio contiene el núcleo ecommerce y dashboard para reutilizarlo con nuevos clientes.

## Qué se conserva

- Autenticación Supabase con roles `admin` y `editor`.
- Dashboard de productos, categorías, usuarios, consultas y configuración.
- Storage de imágenes y hasta cinco imágenes por producto.
- Catálogo, ficha individual, carrito y checkout de cotización.
- Configuración de logo, hero, menú, WhatsApp y marca de agua.
- Deploy compatible con Vercel.

## Crear un nuevo cliente

1. Duplicar este repositorio en GitHub.
2. Crear un proyecto Supabase separado para el cliente.
3. Ejecutar `supabase/schema.sql` en el SQL Editor.
4. Crear el primer usuario en Supabase Auth.
5. Promoverlo a `admin` desde `public.profiles`.
6. Publicar las funciones:

```bash
npx supabase functions deploy create-user
npx supabase functions deploy manage-user
```

7. Crear un proyecto Vercel conectado al nuevo repositorio.
8. Configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
9. Ingresar a `/admin/settings` y cargar identidad, logo, hero y menú.
10. Cargar categorías y productos.

## Personalizar el diseño

La configuración de contenido se administra desde Supabase. Para una identidad visual distinta, modificar principalmente:

- `src/app.css` para colores, tipografías y componentes.
- `src/config/site.js` para los valores de respaldo.
- La composición de `Landing` en `src/App.jsx` para cambiar la estructura de la home.

El núcleo de autenticación, dashboard, catálogo, carrito y checkout no debería modificarse al crear un nuevo cliente.
