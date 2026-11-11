import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const TIPOS_PROYECTO = ["landing", "catalogo", "automatizacion", "noseguro"] as const;

const MAX = { nombre: 100, empresa: 120, email: 254, whatsapp: 30, mensaje: 4000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s().-]{6,30}$/;

// Elimina caracteres de control; en campos de una línea también saltos de línea.
function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const re = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(re, "").trim();
}

function fail(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: Request) {
  // Solo se aceptan envíos desde el propio sitio (sin CORS abierto).
  const origin = request.headers.get("origin");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      return fail("Origen no permitido.", 403);
    }
    if (originHost !== request.headers.get("host")) {
      return fail("Origen no permitido.", 403);
    }
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail("Solicitud inválida.");
  }

  // Honeypot: un bot rellena este campo oculto; respondemos "ok" sin enviar nada.
  if (clean(body.website) !== "") {
    return NextResponse.json({ success: true });
  }

  const nombre = clean(body.nombre);
  const empresa = clean(body.empresa);
  const email = clean(body.email);
  const whatsapp = clean(body.whatsapp);
  const tipoProyecto = clean(body.tipoProyecto);
  const mensaje = clean(body.mensaje, true);

  if (!nombre || nombre.length > MAX.nombre) return fail("Nombre inválido.");
  if (empresa.length > MAX.empresa) return fail("Empresa inválida.");
  if (!email || email.length > MAX.email || !EMAIL_RE.test(email)) {
    return fail("Correo electrónico inválido.");
  }
  if (!PHONE_RE.test(whatsapp) || whatsapp.length > MAX.whatsapp) {
    return fail("Teléfono inválido.");
  }
  if (!(TIPOS_PROYECTO as readonly string[]).includes(tipoProyecto)) {
    return fail("Tipo de proyecto inválido.");
  }
  if (!mensaje || mensaje.length > MAX.mensaje) return fail("Mensaje inválido.");

  const accessKey =
    process.env.WEB3FORMS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
  if (!accessKey) {
    console.error("Falta WEB3FORMS_KEY / NEXT_PUBLIC_WEB3FORMS_KEY");
    return fail("El servicio de contacto no está disponible.", 500);
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[INFOFIS Web] ${nombre} - Nuevo Contacto`,
        from_name: "INFOFIS Website",
        nombre,
        empresa,
        email,
        whatsapp,
        tipo_proyecto: tipoProyecto,
        mensaje,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    if (!res.ok || !data.success) return fail("No se pudo enviar el mensaje.", 502);
    return NextResponse.json({ success: true });
  } catch {
    return fail("No se pudo enviar el mensaje.", 502);
  }
}
