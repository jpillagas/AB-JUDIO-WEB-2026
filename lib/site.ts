// Configuración global del sitio. Cambia aquí y se actualiza en todas partes.

export type Office = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const site = {
  name: "El Abogado Judío",
  legalName: "Neuhauser Law",
  tagline:
    "Defensa Legal Experta en temas migratorios para la Comunidad Hispana en Nueva York, New Jersey y Connecticut.",
  url: "https://elabogadojudio.com",
  bookingUrl: "https://elabogadojudio.com/citas/",
  bookingSectionHref: "/contacto#agendar-cita",
  phoneDisplay: "+1 (718) 919 9000",
  phoneRaw: "+17189199000",
  email: "info@elabogadojudio.com",
  /** WhatsApp general + Inmigración */
  whatsapp: "18888312762",
  whatsappMessage: "Hola, vengo desde su sitio web y quiero agendar una consulta.",
  whatsappByArea: {
    inmigracion: "18888312762",
    "personal-injury": "18889106831",
    "real-estate": "19296006704",
  },
  address: {
    line1: "Brooklyn, Nueva York",
    line2: "Estados Unidos",
  },
  offices: [
    {
      id: "glendale",
      name: "Glendale",
      address: "64-25 Central Ave, Glendale, Queens, NY 11385",
      lat: 40.7048,
      lng: -73.8819,
    },
    {
      id: "jackson-heights",
      name: "Jackson Heights",
      address: "90-20 Elmhurst Ave, Jackson Heights, Queens, NY 11372",
      lat: 40.7483,
      lng: -73.8790,
    },
    {
      id: "newark",
      name: "Newark",
      address: "110 Congress St, Newark, NJ 07105",
      lat: 40.7264,
      lng: -74.1565,
    },
    {
      id: "east-haven",
      name: "East Haven",
      address: "310 Main St, East Haven, CT 06512",
      lat: 41.2765,
      lng: -72.8682,
    },
    {
      id: "stratford",
      name: "Stratford",
      address: "919 Stratford Ave Unit 3, Stratford, CT 06615",
      lat: 41.1848,
      lng: -73.1330,
    },
    {
      id: "danbury",
      name: "Danbury",
      address: "3 West St, Danbury, CT 06810",
      lat: 41.3948,
      lng: -73.4540,
    },
  ] satisfies Office[],
  serviceArea: ["Nueva York", "Nueva Jersey", "Connecticut"],
  hours: [
    { day: "Lunes a Viernes", hours: "10:00 AM – 5:00 PM" },
    { day: "Sábados", hours: "10:00 AM – 2:00 PM" },
    { day: "Domingos", hours: "Cerrado" },
  ],
  social: {
    facebook: "https://www.facebook.com/abogadojudio",
    instagram: "https://instagram.com/elabogadojudio",
    tiktok: "https://tiktok.com/@elabogadojudio",
  },
  stats: [
    {
      value: 15,
      prefix: "+",
      suffix: "",
      label: "Años de Experiencia",
      description: "Trayectoria comprobada en cortes migratorias.",
    },
    {
      value: 5000,
      prefix: "+",
      suffix: "",
      label: "Familias Unidas",
      description: "Casos de éxito y residencias aprobadas.",
    },
    {
      value: 3,
      prefix: "",
      suffix: "",
      label: "Estados Licenciados",
      description: "Práctica activa en NY, NJ y Connecticut.",
    },
  ],
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Contactos", href: "/contacto" },
    { label: "Noticias", href: "/blog" },
  ],
  servicesSubmenu: [
    { label: "Inmigración", href: "/servicios#inmigracion" },
    { label: "Personal Injury", href: "/servicios#personal-injury" },
    { label: "Real Estate", href: "/servicios#real-estate" },
  ],
  bookingAreas: [
    {
      label: "Inmigración",
      href: "/contacto/citas/inmigracion",
      description:
        "Visas, residencia permanente, ciudadanía y defensa en procesos de deportación.",
    },
    {
      label: "Personal Injury",
      href: "/contacto/citas/personal-injury",
      description:
        "Accidentes y lesiones por negligencia. Te ayudamos a reclamar la compensación que mereces.",
    },
    {
      label: "Real Estate",
      href: "/contacto/citas/real-estate",
      description:
        "Compra, venta e inversión inmobiliaria con respaldo legal en cada etapa.",
    },
  ],
};

export const bookingCalendars = {
  inmigracion: {
    title: "Citas de Inmigración",
    subtitle:
      "Elige el calendario y la sucursal que mejor se adapten a tu caso migratorio.",
    widgetSrc: "https://link.sedigital.pro/widget/group/X5xQq0CxUxB24dMeoJbT",
    iframeId: "X5xQq0CxUxB24dMeoJbT_1787783224589",
  },
  personalInjury: {
    title: "Citas de Personal Injury",
    subtitle:
      "Agenda tu consulta de lesiones personales. Elige el horario que mejor te convenga.",
    widgetSrc: "https://link.sedigital.pro/widget/booking/fIe3yJeaN1Y3f2QRFhLV",
    iframeId: "fIe3yJeaN1Y3f2QRFhLV_1787795630133",
  },
  realEstate: {
    title: "Citas de Real Estate",
    subtitle:
      "Agenda tu consulta de bienes raíces. Elige el horario que mejor te convenga.",
    widgetSrc: "https://link.sedigital.pro/widget/booking/J5KXWYZoxhmtscURcHUF",
    iframeId: "J5KXWYZoxhmtscURcHUF_1787799533869",
  },
} as const;

export const expertiseAreas = [
  { name: "Inmigración", percent: 99 },
  { name: "Personal Injury", percent: 98 },
  { name: "Real Estate", percent: 97 },
];

export const mainServices = [
  {
    number: "01",
    title: "Inmigración",
    description:
      "Brindamos asesoría legal experta en procesos migratorios en Estados Unidos, ayudando a personas y familias a obtener visas, residencia permanente, ciudadanía estadounidense y representación legal en casos de deportación o remoción.",
    href: "/servicios#inmigracion",
  },
  {
    number: "02",
    title: "Personal Injury | Abogado de Lesiones Personales",
    description:
      "Representamos a personas lesionadas por accidentes o por la negligencia de terceros. Nuestro equipo legal le ayuda a presentar reclamos por compensación y a proteger sus derechos después de una lesión.",
    href: "/servicios#personal-injury",
  },
  {
    number: "03",
    title: "Real Estate | Abogados de Bienes Raíces",
    description:
      "Asesoría y representación legal en compra, venta e inversión de propiedades, protegiendo tus intereses con seguridad jurídica en cada paso.",
    href: "/servicios#real-estate",
  },
];

export const practiceAreas = [
  {
    id: "inmigracion",
    title: "Inmigración",
    eyebrow: "Inmigración | Abogados de Inmigración en Estados Unidos",
    lead: "¿Buscas regularizar tu estatus migratorio o proteger tu futuro en Estados Unidos?",
    body: "En El Abogado Judío brindamos asesoría y representación legal en diferentes procesos migratorios, acompañándote en cada etapa y evaluando las opciones disponibles para tu caso.",
    listLabel: "Nuestros servicios incluyen:",
    items: [
      "Solicitud y renovación de visas",
      "Residencia permanente (Green Card)",
      "Ciudadanía y naturalización",
      "Peticiones familiares",
      "Permisos de trabajo",
      "Asilo y otras formas de protección migratoria",
      "Defensa en procesos de deportación o remoción",
      "Reapertura y revisión de casos migratorios",
    ],
    closing:
      "Cada caso migratorio es diferente. Conoce tus opciones antes de tomar una decisión.",
    whatsappMessage:
      "Hola, vengo desde el sitio web y quiero agendar una consulta de Inmigración.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "personal-injury",
    title: "Personal Injury",
    eyebrow: "Personal Injury | Abogado de Lesiones Personales",
    lead: "¿Sufriste una lesión debido a un accidente o a la negligencia de otra persona? Podrías tener derecho a reclamar una compensación.",
    body: "En El Abogado Judío evaluamos tu caso y te brindamos representación legal para ayudarte a proteger tus derechos y buscar la compensación que corresponda.",
    listLabel: "Atendemos casos de:",
    items: [
      "Accidentes de auto y tránsito",
      "Caídas, resbalones y tropiezos",
      "Accidentes de construcción",
      "Lesiones por negligencia",
      "Accidentes en propiedades comerciales o residenciales",
      "Lesiones causadas por condiciones inseguras",
    ],
    closing:
      "No enfrentes las consecuencias de una lesión sin conocer tus derechos.",
    whatsappMessage:
      "Hola, vengo desde el sitio web y quiero agendar una consulta de Personal Injury.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    eyebrow: "Bienes Raíces | Abogados de Real Estate",
    lead: "¿Estás comprando, vendiendo o invirtiendo en una propiedad?",
    body: "En El Abogado Judío brindamos asesoría y representación legal en operaciones de bienes raíces, ayudándote a proteger tus intereses y a tomar decisiones con mayor seguridad jurídica.",
    listLabel: "Nuestros servicios incluyen:",
    items: [
      "Compra y venta de propiedades",
      "Revisión y preparación de contratos",
      "Cierres de compraventa (closing)",
      "Revisión de documentos legales",
      "Protección de tus intereses durante la transacción",
      "Asesoría en operaciones inmobiliarias",
    ],
    closing:
      "Una propiedad es una gran inversión. Asegúrate de contar con respaldo legal en cada paso.",
    whatsappMessage:
      "Hola, vengo desde el sitio web y quiero agendar una consulta de Real Estate.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
];

export const team = [
  {
    name: "Mark Neuhauser",
    role: "CEO – Abogado",
    image: "/imagenes/team/mark-neuhauser.jpg",
  },
  {
    name: "Gabriel Castro",
    role: "Manager General",
    image: "/imagenes/team/gabriel-castro.jpg",
  },
  {
    name: "Mateo Garzón",
    role: "Manager",
    image: "/imagenes/team/mateo-garzon.jpg",
  },
  {
    name: "Juan Carlos Miranda",
    role: "Director de Comunicación",
    image: "/imagenes/team/juan-carlos-miranda.jpg",
  },
  {
    name: "Alejandro Navarro",
    role: "Director de Marketing y producción",
    image: null,
  },
  {
    name: "Jenny Pardo",
    role: "Regional Manager",
    image: null,
  },
  {
    name: "Luis Chávez",
    role: "Digital Strategist & Media Buyer",
    image: null,
  },
  {
    name: "Rajinder Kaur",
    role: "Abogada de Inmigración",
    image: "/imagenes/team/rajinder-kaur.jpg",
  },
  {
    name: "Anastasia Lee",
    role: "Abogada de inmigración",
    image: null,
  },
  {
    name: "Jessica Humala",
    role: "Paralegal Senior, New York",
    image: "/imagenes/team/jessica-humala.jpg",
  },
  {
    name: "Eniris Brito",
    role: "Paralegal, New York",
    image: "/imagenes/team/eniris-brito.jpg",
  },
  {
    name: "Antonella Orejuela",
    role: "Paralegal, New York",
    image: "/imagenes/team/antonella-orejuela.jpg",
  },
  {
    name: "Juliette Saint",
    role: "Paralegal",
    image: "/imagenes/team/juliette-saint.jpg",
  },
  {
    name: "Belen Castro",
    role: "Paralegal, New Jersey",
    image: "/imagenes/team/belen-castro.jpg",
  },
  {
    name: "María Parra",
    role: "Paralegal, New Jersey",
    image: "/imagenes/team/maria-parra.jpg",
  },
  {
    name: "María Fernanda Albarracín",
    role: "Paralegal de inmigración",
    image: null,
  },
  {
    name: "Marcos Hernández",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Ana Hinojosa",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Carlota López",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Ana Cecilia Barbosa",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Melissa Zárate",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Sebastián Vargas",
    role: "Paralegal",
    image: null,
  },
  {
    name: "Marlene Piña",
    role: "Paralegal",
    image: "/imagenes/team/marlene-pina.png",
  },
  {
    name: "Cristi Villavicencio",
    role: "Asistente administrativo",
    image: "/imagenes/team/cristi-villavicencio.png",
  },
  {
    name: "Marcela Coronel",
    role: "Asistente administrativo",
    image: "/imagenes/team/marcela-coronel.png",
  },
  {
    name: "Eglet Hernández",
    role: "Coordinadora de Atención al Cliente",
    image: null,
  },
  {
    name: "Arlette Bermeo",
    role: "Reception",
    image: null,
  },
  {
    name: "Nathalia Osorio",
    role: "Reception",
    image: null,
  },
] as const;

/** Reseñas reales (contenido tomado de Google Reviews) */
export const testimonials = [
  {
    name: "Lucresia Urquilla",
    rating: 5,
    timeAgo: "hace 2 meses",
    text: "Son unos muy buenos abogados estoy súper agradecida con ellos, ha salido súper bien en el caso de mi hijo, se los recomiendo al cien. Tienen personal muy amable. Especialmente Belén es súper amable, gracias.",
  },
  {
    name: "Isaac Tituaña",
    rating: 5,
    timeAgo: "hace 5 meses",
    text: "Inicié mi proceso con la firma y ha sido toda una aventura, son personas muy capaces y atentas. Siempre están para responder mis preguntas, especialmente Belén ha sido de gran ayuda.",
  },
  {
    name: "Veronica R",
    rating: 5,
    timeAgo: "hace 1 mes",
    text: "Acabo de recibir mi aprobación de estatus juvenil, estoy muy agradecida con ustedes en especial con Belén por todo su trabajo en mi caso.",
  },
  {
    name: "Angelica Torres",
    rating: 5,
    timeAgo: "hace 5 meses",
    text: "María Albarracin muy buena persona, amable, educada. Contestó todas mis preguntas.",
  },
  {
    name: "Edison Suarez",
    rating: 5,
    timeAgo: "hace 2 meses",
    text: "Excelente atención, saben del tema y son muy profesionales.",
  },
  {
    name: "Michelle Rosales",
    rating: 5,
    timeAgo: "hace 8 meses",
    text: "Súper recomendable. Maria Fernando muy amables, respondió todas mis dudas, muy buen trato, te explican todo súper bien, te presta mucha confianza. Súper recomendable, me encantó.",
  },
  {
    name: "Neris Granados",
    rating: 5,
    timeAgo: "hace 5 meses",
    text: "Yo los recomiendo al 100. Hacer lo correcto es parte de su ADN. Honestidad, precisión y eficiencia los caracteriza. Bien por aquellos que hemos dejado nuestros casos en sus manos. Éxitos siempre.",
  },
  {
    name: "Alfonsina Niama",
    rating: 5,
    timeAgo: "hace 4 meses",
    text: "Excelente y rápido servicio, desde el primer día me brindaron la seguridad y certeza de que todo saldría bien con mi caso. Tuve acompañamiento durante todo el proceso, con un nivel de profesionalismo excepcional. Mi equipo estuvo conformado por la paralegal Anacecilia y la abogada Leiny, de quienes estoy muy agradecida. Mil gracias, han cambiado mi vida.",
  },
];
