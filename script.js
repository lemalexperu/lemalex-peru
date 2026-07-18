const botonMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");
const enlacesMenu = document.querySelectorAll("#menu-principal a");

if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", () => {
        const menuAbierto = menuPrincipal.classList.toggle("activo");

        botonMenu.classList.toggle("activo");
        botonMenu.setAttribute("aria-expanded", String(menuAbierto));
    });

    enlacesMenu.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            menuPrincipal.classList.remove("activo");
            botonMenu.classList.remove("activo");
            botonMenu.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            menuPrincipal.classList.remove("activo");
            botonMenu.classList.remove("activo");
            botonMenu.setAttribute("aria-expanded", "false");
        }
    });
}

const formularioContacto = document.querySelector("#formulario-contacto");
const estadoFormulario = document.querySelector("#estado-formulario");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const datos = new FormData(formularioContacto);

        const nombre = String(datos.get("nombre")).trim();
        const telefono = String(datos.get("telefono")).trim();
        const area = String(datos.get("area")).trim();
        const mensaje = String(datos.get("mensaje")).trim();

        const textoWhatsApp =
`Hola, quisiera solicitar una consulta legal.

Nombre: ${nombre}
Teléfono: ${telefono}
Área de consulta: ${area}

Descripción del caso:
${mensaje}`;

        const numeroWhatsApp = "51991595383";

        const enlaceWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

        if (estadoFormulario) {
            estadoFormulario.textContent = "Abriendo WhatsApp...";
        }

        window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
    });
}

/* ===============================
   ANIMACIONES AL DESPLAZARSE
================================ */

const elementosAnimados = document.querySelectorAll(`
    .nosotros-texto,
    .nosotros-destacado,
    .servicio-card,
    .blog-card,
    .ventaja-card,
    .proceso-paso,
    .faq-item,
    .contacto-texto,
    .contacto-formulario
`);

elementosAnimados.forEach((elemento, indice) => {
    elemento.classList.add("revelar");

    const retraso = (indice % 4) * 90;

    elemento.style.setProperty("--retraso", `${retraso}ms`);
});

if ("IntersectionObserver" in window) {
    const observadorAnimaciones = new IntersectionObserver(
        (entradas, observador) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elementosAnimados.forEach((elemento) => {
        observadorAnimaciones.observe(elemento);
    });
} else {
    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("visible");
    });
}

