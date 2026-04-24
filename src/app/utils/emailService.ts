// ============================================================
// emailService.ts
// Servicio para generar contraseñas y enviar correos con EmailJS
//
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Crea una cuenta gratuita en https://www.emailjs.com
// 2. Crea un Email Service (Gmail, Outlook, etc.)
// 3. Crea un Email Template con las variables:
//    {{to_email}}, {{to_name}}, {{usuario}}, {{contrasena}}, {{rol}}
// 4. Reemplaza las constantes de abajo con tus IDs reales
// ============================================================
 
// ⚠️ REEMPLAZA ESTOS VALORES CON LOS DE TU CUENTA DE EMAILJS
const EMAILJS_SERVICE_ID = "service_e0xcdq6";   // Ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_v4c55uj"; // Ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY = "0boTL4BVsBA3CjaF4";    // Ej: "user_ABCDEF123456"
 
/**
 * Genera una contraseña aleatoria segura de 10 caracteres.
 * Incluye mayúsculas, minúsculas, números y caracteres especiales.
 */
export function generarContrasenaAleatoria(): string {
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const especiales = "!@#$%&*";
 
  // Garantizar al menos un carácter de cada tipo
  const obligatorios = [
    mayusculas[Math.floor(Math.random() * mayusculas.length)],
    minusculas[Math.floor(Math.random() * minusculas.length)],
    numeros[Math.floor(Math.random() * numeros.length)],
    especiales[Math.floor(Math.random() * especiales.length)],
  ];
 
  const todos = mayusculas + minusculas + numeros + especiales;
  const restantes = Array.from({ length: 6 }, () =>
    todos[Math.floor(Math.random() * todos.length)]
  );
 
  // Mezclar todos los caracteres aleatoriamente
  return [...obligatorios, ...restantes]
    .sort(() => Math.random() - 0.5)
    .join("");
}
 
export interface DatosCorreoBienvenida {
  email: string;
  nombre: string;
  documento: string;
  rol: string;
  contrasena: string;
}
 
/**
 * Envía el correo de bienvenida con las credenciales al nuevo usuario.
 * Usa EmailJS para enviar desde el frontend sin necesidad de backend.
 */
export async function enviarCorreoBienvenida(
  datos: DatosCorreoBienvenida
): Promise<void> {
  // Importar EmailJS dinámicamente para no bloquear la carga inicial
  const emailjs = await import("@emailjs/browser");
 
  const templateParams = {
    to_email: datos.email,
    to_name: datos.nombre,
    usuario: datos.documento,   // El usuario es el número de documento
    contrasena: datos.contrasena,
    rol: datos.rol,
  };
 
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
}
 