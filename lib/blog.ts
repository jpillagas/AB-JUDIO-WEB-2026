// Posts de muestra. Esto se puede reemplazar luego por un CMS (Sanity, Contentful, MDX local).

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMinutes: number;
  cover: string;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-aplicar-a-la-visa-u",
    title: "Cómo aplicar a la Visa U paso a paso",
    excerpt:
      "Si fuiste víctima de un crimen y cooperaste con las autoridades, podrías calificar para la Visa U. Te explicamos los requisitos, los tiempos y los errores comunes que se deben evitar.",
    category: "Inmigración",
    date: "2026-04-10",
    readMinutes: 6,
    cover:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1600&q=80",
    body: "La Visa U fue creada para proteger a víctimas de ciertos crímenes que cooperan con las autoridades. En este artículo vamos a ver con detalle los requisitos, el formulario I-918, la certificación policial, y los pasos clave para presentar un caso sólido...",
  },
  {
    slug: "diferencias-entre-asilo-y-tps",
    title: "Diferencias clave entre Asilo y TPS",
    excerpt:
      "Aunque ambos protegen a inmigrantes en situaciones de riesgo, son figuras legales distintas con requisitos, beneficios y plazos muy diferentes. Aquí te contamos cuál podría aplicarte.",
    category: "Inmigración",
    date: "2026-03-22",
    readMinutes: 5,
    cover:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
    body: "El asilo y el TPS (Temporary Protected Status) suelen confundirse, pero son dos figuras legales completamente diferentes...",
  },
  {
    slug: "que-hacer-si-recibes-orden-deportacion",
    title: "Qué hacer si recibes una orden de deportación",
    excerpt:
      "Recibir una orden de deportación no significa que el caso esté perdido. Existen recursos legales como apelaciones, mociones de reapertura y suspensiones que pueden cambiar tu futuro.",
    category: "Defensa",
    date: "2026-02-15",
    readMinutes: 7,
    cover:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80",
    body: "Una orden de deportación es seria, pero no necesariamente final. En este artículo explicamos los recursos legales disponibles...",
  },
  {
    slug: "preparar-cita-uscis",
    title: "Cómo preparar tu cita en USCIS",
    excerpt:
      "Una buena preparación marca la diferencia. Estos son los documentos, ropa, comportamiento y respuestas que debes preparar antes de tu entrevista de naturalización o residencia.",
    category: "Trámites",
    date: "2026-01-30",
    readMinutes: 4,
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    body: "Las entrevistas con USCIS pueden ser determinantes. Aquí te explicamos cómo prepararte de la mejor forma...",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
