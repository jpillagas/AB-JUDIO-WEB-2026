export type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  closing?: string;
};

export const privacyPolicy: {
  lastUpdated: string;
  lastUpdatedIso: string;
  sections: PrivacySection[];
} = {
  lastUpdated: "5 de septiembre de 2026",
  lastUpdatedIso: "2026-09-05",
  sections: [
    {
      title: "1. Quiénes somos",
      paragraphs: [
        "Esta Política de Privacidad describe cómo El Abogado Judío / Neuhauser Law (“la Firma”, “nosotros”) recopila, usa y protege la información personal cuando usas nuestra aplicación móvil de seguimiento de casos (la “App”) y las páginas web asociadas, incluyendo elabogadojudio.com/privacy-policy y elabogadojudio.com/contact-app.",
        "La Firma presta servicios legales de inmigración, lesiones personales (Personal Injury) y bienes raíces (Real Estate) a la comunidad hispana en Nueva York, Nueva Jersey y Connecticut.",
      ],
    },
    {
      title: "2. Ámbito de esta política",
      paragraphs: [
        "Esta política aplica a la App para clientes, al sitio web de la Firma y a los formularios relacionados con la App (por ejemplo, la solicitud de eliminación de cuenta).",
        "No cubre sitios, aplicaciones o servicios de terceros a los que puedas acceder mediante enlaces externos. Esos servicios tienen sus propias políticas.",
      ],
    },
    {
      title: "3. Qué hace la App",
      paragraphs: [
        "La App está dirigida a clientes actuales de la Firma. Su propósito es que puedas consultar el estado y el seguimiento de tu caso, ver actualizaciones del equipo legal y, cuando corresponda, revisar información o documentos relacionados con tu representación.",
        "La App no es un canal público de consulta gratuita ni sustituye una cita, una llamada o una notificación oficial de una corte, USCIS u otra autoridad.",
      ],
    },
    {
      title: "4. Información que recopilamos",
      paragraphs: [
        "Recopilamos solo la información necesaria para identificarte como cliente, operar tu cuenta y mostrarte el seguimiento de tu caso.",
      ],
      bullets: [
        "Datos de cuenta: nombre, correo electrónico, número de teléfono y credenciales de acceso.",
        "Datos del caso: número o identificador interno, área legal, estado del asunto, próximas fechas, notas o actualizaciones que el equipo publique para ti, y documentos que se compartan a través de la App.",
        "Comunicaciones: mensajes o solicitudes que envíes por la App o por los formularios del sitio (por ejemplo, para borrar tu cuenta).",
        "Datos técnicos del dispositivo: modelo, sistema operativo, identificadores de la App, idioma, registros de errores y, si das permiso, token de notificaciones push.",
        "Uso de la App: inicios de sesión, pantallas visitadas y acciones básicas necesarias para seguridad y soporte.",
      ],
    },
    {
      title: "5. Cómo obtenemos esa información",
      paragraphs: [
        "La información puede llegar de tres vías: (a) tú la proporcionas al crear o usar tu cuenta; (b) el equipo de la Firma la carga como parte de tu representación legal; y (c) se genera automáticamente al usar la App (registros técnicos y de seguridad).",
      ],
    },
    {
      title: "6. Para qué usamos tus datos",
      bullets: [
        "Crear y autenticar tu cuenta de cliente.",
        "Mostrarte el seguimiento de tu caso y las actualizaciones del equipo.",
        "Comunicarnos contigo sobre tu asunto, citas o documentos.",
        "Enviar notificaciones de la App, si las activas.",
        "Proteger la cuenta frente a accesos no autorizados y resolver problemas técnicos.",
        "Cumplir obligaciones legales, éticas y de conservación de expedientes.",
        "Atender solicitudes de acceso, corrección o eliminación de cuenta.",
      ],
    },
    {
      title: "7. Confidencialidad abogado-cliente",
      paragraphs: [
        "Parte de la información visible en la App puede estar cubierta por el secreto profesional y el privilegio abogado-cliente. El equipo de la Firma accede a ella solo para prestarte el servicio legal.",
        "Tú también eres responsable de proteger tu acceso: no compartas tu contraseña ni dejes la sesión abierta en un dispositivo de terceros. Si sospechas un acceso no autorizado, avísanos de inmediato.",
      ],
    },
    {
      title: "8. Con quién compartimos información",
      paragraphs: [
        "No vendemos tu información personal. No la entregamos para publicidad de terceros.",
      ],
      bullets: [
        "Personal de la Firma (abogados, paralegales y staff) que trabaja en tu caso o en el soporte de la App.",
        "Proveedores técnicos que nos ayudan a hospedar, enviar notificaciones, almacenar archivos o mantener la seguridad. Estos proveedores solo pueden usar los datos para prestar ese servicio.",
        "Autoridades, cortes u organismos (por ejemplo USCIS) únicamente cuando sea necesario para tu representación o cuando la ley lo exija.",
        "Asesores profesionales (por ejemplo, contables o aseguradoras de la Firma) cuando sea necesario y con las salvaguardas adecuadas.",
      ],
    },
    {
      title: "9. Conservación de los datos",
      paragraphs: [
        "Los datos de la cuenta en la App se conservan mientras seas cliente y la cuenta esté activa.",
        "Si solicitas el borrado de la cuenta, eliminamos o desactivamos los datos de perfil de la App en un plazo máximo de 30 días, salvo que debamos retener cierta información.",
        "Los expedientes legales, facturación y documentos que la ley o las normas éticas exigen conservar pueden permanecer en los archivos de la Firma el tiempo mínimo necesario, aunque ya no estén visibles en la App.",
      ],
    },
    {
      title: "10. Seguridad",
      paragraphs: [
        "Aplicamos medidas razonables de seguridad administrativa, técnica y física: acceso restringido al personal autorizado, transmisión cifrada cuando está disponible y controles de inicio de sesión.",
        "Ningún sistema es 100 % seguro. Si ocurre un incidente que afecte tu información, te lo comunicaremos cuando la ley lo requiera.",
      ],
    },
    {
      title: "11. Tus derechos",
      paragraphs: [
        "Según la ley aplicable (incluido, cuando corresponda, el CCPA/CPRA de California), puedes solicitar:",
      ],
      bullets: [
        "Acceder a la información personal que tenemos sobre ti en la App.",
        "Corregir datos inexactos de tu cuenta.",
        "Eliminar tu cuenta y los datos de perfil asociados.",
        "Saber si compartimos datos y con qué tipo de proveedores.",
        "No ser discriminado por ejercer estos derechos.",
      ],
      closing:
        "Para ejercerlos, escríbenos a info@elabogadojudio.com o usa el formulario de eliminación de cuenta.",
    },
    {
      title: "12. Cómo eliminar tu cuenta",
      paragraphs: [
        "Puedes solicitar el borrado de tu cuenta de la App en elabogadojudio.com/contact-app. Debes indicar el nombre, correo y teléfono con los que te registraste y confirmar que solicitas borrar tu cuenta.",
        "También puedes escribir a info@elabogadojudio.com con el asunto “Solicitud de eliminación de cuenta (app)” o llamar al +1 (718) 919 9000.",
      ],
    },
    {
      title: "13. Permisos del dispositivo y notificaciones",
      paragraphs: [
        "La App puede pedirte permiso para enviar notificaciones push sobre actualizaciones de tu caso. Puedes desactivarlas en los ajustes del teléfono en cualquier momento.",
        "No exigimos acceso a tu cámara, contactos, ubicación o micrófono para el funcionamiento básico del seguimiento de casos. Si en el futuro se añade alguna función que lo requiera, te lo pediremos de forma explícita.",
      ],
    },
    {
      title: "14. Menores",
      paragraphs: [
        "La App está pensada para clientes adultos de la Firma. No recopilamos de forma consciente información de menores de 13 años. Si un padre, madre o tutor cree que un menor nos dio datos, contáctanos para revisarlo y, si corresponde, eliminarlos.",
      ],
    },
    {
      title: "15. Transferencias y lugar de tratamiento",
      paragraphs: [
        "La Firma opera en Estados Unidos. Tus datos se tratan principalmente en EE. UU. Si accedes a la App desde otro país, tu información puede transferirse a Estados Unidos para operar la cuenta y tu representación legal.",
      ],
    },
    {
      title: "16. Cambios a esta política",
      paragraphs: [
        "Podemos actualizar esta Política de Privacidad cuando cambie la App, la ley o nuestras prácticas. La fecha de “Última actualización” aparece al inicio de esta página. Si el cambio es relevante, intentaremos avisarte por la App o por correo.",
      ],
    },
    {
      title: "17. Cómo contactarnos",
      paragraphs: [
        "El Abogado Judío / Neuhauser Law",
        "Correo: info@elabogadojudio.com",
        "Teléfono: +1 (718) 919 9000",
        "Horario: lunes a viernes 10:00 AM – 5:00 PM; sábados 10:00 AM – 2:00 PM.",
        "Oficinas: Glendale y Jackson Heights (NY); Newark (NJ); East Haven, Stratford y Danbury (CT).",
      ],
    },
  ],
};
