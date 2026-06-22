// Configuración global del sitio. Cambia aquí y se actualiza en todas partes.

export const site = {
  name: "El Abogado Judio",
  legalName: "Neuhauser Law",
  tagline: "Tu futuro migratorio es nuestra prioridad",
  url: "https://elabogadojudio.com",
  phoneDisplay: "+1 (718) 919 9000",
  phoneRaw: "+17189199000",
  email: "info@elabogadojudio.com",
  whatsapp: "17189199000",
  whatsappMessage: "Hola, vengo desde su sitio web y quiero agendar una consulta.",
  address: {
    line1: "Brooklyn, Nueva York",
    line2: "Estados Unidos",
  },
  serviceArea: ["Nueva York", "Nueva Jersey", "Connecticut"],
  hours: [
    { day: "Lunes a Viernes", hours: "9:00 AM – 6:00 PM" },
    { day: "Sábados", hours: "10:00 AM – 2:00 PM" },
    { day: "Domingos", hours: "Cerrado" },
  ],
  social: {
    facebook: "https://facebook.com/elabogadojudio",
    instagram: "https://instagram.com/elabogadojudio",
    tiktok: "https://tiktok.com/@elabogadojudio",
  },
  stats: [
    { value: 10, suffix: "+", label: "Abogados Expertos" },
    { value: 90, suffix: "%", label: "Casos Ganados" },
    { value: 100, suffix: "%", label: "Clientes Felices" },
    { value: 20, suffix: "+", label: "Servicios Legales" },
  ],
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Contacto", href: "/contacto" },
    { label: "Noticias", href: "/blog" },
  ],
};

export const expertiseAreas = [
  { name: "Inmigración", percent: 99 },
  { name: "Lesiones Personales", percent: 98 },
  { name: "Bienes Raíces", percent: 97 },
];

export const mainServices = [
  {
    number: "01",
    title: "Inmigración",
    description:
      "Asesoría legal experta para obtener visas, residencia, ciudadanía o defensa en procesos de deportación.",
    href: "/servicios#inmigracion",
  },
  {
    number: "02",
    title: "Lesiones Personales",
    description:
      "Reclamos por accidentes o negligencia, incluyendo caídas por resbalones (slip and fall) y tropiezos (trip and fall).",
    href: "/servicios#lesiones",
  },
  {
    number: "03",
    title: "Bienes Raíces",
    description:
      "Asistencia legal en la compra, venta y protección de propiedades, con total seguridad jurídica.",
    href: "/servicios#bienes-raices",
  },
];

export const uscisServices = [
  {
    n: "01",
    title: "Permiso De Trabajo (EAD)",
    desc: "Asesoramiento y gestión para obtener autorizaciones de empleo para inmigrantes elegibles.",
  },
  {
    n: "02",
    title: "Visa De Trabajo",
    desc: "Trámites de visas de trabajo temporales o permanentes para extranjeros que buscan trabajar legalmente en el país.",
  },
  {
    n: "03",
    title: "TPS",
    desc: "Representación para solicitar o renovar el Estatus de Protección Temporal, otorgado a ciudadanos de países con condiciones peligrosas.",
  },
  {
    n: "04",
    title: "Petición Familiar",
    desc: "Peticiones para cónyuges, hijos, padres y otros familiares calificados por residencia permanente.",
  },
  {
    n: "05",
    title: "Ciudadanía",
    desc: "Representación legal en el proceso de naturalización para convertirte en ciudadano estadounidense.",
  },
  {
    n: "06",
    title: "Green Card",
    desc: "Tramitación de solicitudes para obtener la residencia permanente legal a través de peticiones familiares o laborales.",
  },
  {
    n: "07",
    title: "VAWA",
    desc: "Asistencia legal a víctimas de violencia doméstica que buscan obtener estatus migratorio independiente de su agresor.",
  },
  {
    n: "08",
    title: "Visa U",
    desc: "Ayuda para víctimas de crímenes graves que cooperan con las autoridades en la investigación o procesamiento del delito.",
  },
  {
    n: "09",
    title: "Estatus Juvenil",
    desc: "Representación para menores inmigrantes que han sido abandonados, abusados o descuidados y buscan protección legal.",
  },
  {
    n: "10",
    title: "Waiver",
    desc: "Asesoría y trámites para el perdón por presencia ilegal en los Estados Unidos.",
  },
];

export const courtServices = [
  {
    n: "01",
    title: "Cancelación De Deportación",
    desc: "Defendemos a inmigrantes en proceso de deportación mediante recursos legales que permiten solicitar la permanencia en EE. UU., cumpliendo requisitos como tiempo de residencia, buen carácter moral y prueba de perjuicio extremo a familiares ciudadanos o residentes.",
  },
  {
    n: "02",
    title: "Mociones De Apertura",
    desc: "Es una solicitud presentada ante el juez de inmigración para reabrir un caso cerrado o finalizado. Generalmente se utiliza cuando hay nueva evidencia, cambios en las circunstancias o errores legales en el proceso anterior.",
  },
  {
    n: "03",
    title: "Asilo",
    desc: "Protección para personas que han sufrido persecución por su raza, religión, nacionalidad, opinión política o grupo social. El solicitante debe probar que no puede regresar a su país de origen.",
  },
  {
    n: "04",
    title: "Detención De Remoción",
    desc: "Cuando un inmigrante es detenido mientras enfrenta su deportación, durante esta etapa puede solicitar fianza y presentar defensas legales para evitar su remoción.",
  },
  {
    n: "05",
    title: "Deportation Order",
    desc: "Es una orden final que obliga al inmigrante a salir de EE. UU. Puede ser ejecutada a menos que se presente una apelación o se obtenga una suspensión.",
  },
];

export const team = [
  { name: "Mark Neuhauser", role: "CEO – Abogado" },
  { name: "Gabriel Castro", role: "Manager General" },
  { name: "Leiny Ruiz", role: "Abogada de Inmigración" },
  { name: "Mateo Garzón", role: "Manager" },
  { name: "Juan Carlos Miranda", role: "Director de Comunicación" },
  { name: "Karla Dávalos", role: "Paralegal Senior, Nueva York" },
  { name: "Bridgette Mena", role: "Paralegal Senior, Nueva York" },
  { name: "Jessica Humala", role: "Paralegal Senior, Nueva York" },
  { name: "Eniris Brito", role: "Paralegal, Nueva York" },
  { name: "Antonella Orejuela", role: "Paralegal, Nueva York" },
  { name: "Rajinder Kaur", role: "Paralegal, Nueva York" },
  { name: "Belen Castro", role: "Paralegal, Nueva Jersey" },
  { name: "María Parra", role: "Paralegal, Nueva Jersey" },
  { name: "Marlene Piña", role: "Administrativo" },
  { name: "Cristi Villavicencio", role: "Asistente Administrativo" },
  { name: "Marcela Coronel", role: "Asistente Administrativo" },
];

export const testimonials = [
  {
    name: "Juan Pérez",
    role: "Indocumentado",
    text: "Los abogados son muy profesionales y me solucionaron mi visa de trabajo de una manera rápida y sin mucho papeleo.",
  },
  {
    name: "María González",
    role: "Residente Permanente",
    text: "Gracias al equipo de El Abogado Judio pude reunirme con mi familia. Su acompañamiento fue humano y experto en cada paso.",
  },
  {
    name: "Carlos Ramírez",
    role: "Solicitante de Asilo",
    text: "Llegué sin esperanza y salí con una protección legal. Comunicación clara, honestidad y resultados. Los recomiendo de corazón.",
  },
];
