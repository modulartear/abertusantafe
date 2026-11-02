// Configuración visual y datos de respaldo de la plantilla.
// En producción, estos valores se reemplazan por los de Supabase > site_settings.
export const defaultSettings = {
  business_name: "Santa Fe Aberturas",
  logo_url: "/assets/santa-fe-aberturas-logo.png",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Santa Fe, Argentina",
  schedule: "Lunes a viernes de 8 a 18 hs",
  hero_badge: "Nuevo stock",
  hero_title: "Santa Fe Aberturas",
  hero_subtitle: "La abertura que estás buscando, lista para transformar tu espacio.",
  hero_image_url: "",
  contact_title: "Consultá por medidas, stock y formas de pago.",
  contact_subtitle: "Te respondemos con opciones disponibles en el local.",
};

export const defaultNavigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export const templateCapabilities = [
  "Autenticación y roles admin/editor",
  "Catálogo de productos y categorías",
  "Hasta 5 imágenes por producto",
  "Carrito y checkout de cotización",
  "Consultas administrables",
  "Configuración del negocio y menú",
  "WhatsApp y marca de agua",
];
