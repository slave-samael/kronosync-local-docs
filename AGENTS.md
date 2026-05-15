# AGENTS.md — KronoSync ERP Docs (Documentación)

## Identidad del Proyecto

**KronoSync ERP Docs** es el sitio de documentación de usuario del ERP KronoSync, generado con MkDocs. Contiene manuales, tutoriales, referencia de módulos y preguntas frecuentes para usuarios finales del sistema.

- **Versión:** v1.5.1
- **Licencia:** Privada — Desarrollado por **Prisma Systems**, fundada por Jose Cornejo
- **Idioma:** Español (CL) — TODO el contenido está en español
- **URL local:** `http://127.0.0.1:8000/`
- **URL producción:** [slave-samael.github.io/kronosync-local-docs](https://slave-samael.github.io/kronosync-local-docs/)

## Stack Tecnológico

| Componente | Tecnología | Versión |
|---|---|---|
| Generador | MkDocs | 1.6.1 |
| Tema | Read the Docs | built-in |
| Extensiones | PyMdown Extensions | 10.21.2 |
| Markdown | Python-Markdown | (stdlib) |
| Búsqueda | Lunr.js | built-in MkDocs plugin |

## Estructura del Proyecto

```
KronoSync-loca-document/
├── AGENTS.md                  ← Este archivo
├── README.md                  ← Descripción del proyecto y enlace a GitHub Pages
├── .gitignore                 ← Exclusiones: site/, venv/, __pycache__/, .DS_Store
├── mkdocs.yml                 ← Configuración del sitio (nav, theme, extensions)
├── docs/                      ← Todo el contenido fuente
│   ├── index.md               ← Portada de bienvenida
│   ├── faq.md                 ← Preguntas frecuentes (13 secciones, 36 Q&A)
│   ├── novedades.md           ← Changelog y roadmap
│   ├── img/                   ← Imágenes del sitio
│   │   ├── favicon.ico        ← Favicon del sitio (25 KB)
│   │   ├── logo_kronosync.png ← Logo del ERP (153 KB, 280px en portada)
│   │   ├── screenshoot/       ← Capturas de pantalla de la app real
│   │   │   ├── inicio.png     ← Pantalla principal de KronoSync (68 KB)
│   │   │   ├── login.png      ← Pantalla de inicio de sesión
│   │   │   ├── carrito.png    ← Punto de Venta — carrito y panel de cobro
│   │   │   ├── venta.png      ← Modal de pago — finalizar venta
│   │   │   ├── boleta.png     ← Boleta PDF generada
│   │   │   ├── producto-buscar.png ← Búsqueda de productos
│   │   │   ├── datos-negocio.png   ← Configuración del negocio
│   │   │   ├── inventario.png      ← Tabla de inventario
│   │   │   ├── inventario-producto.png ← Formulario de producto
│   │   │   ├── clientes.png        ← Tabla de clientes
│   │   │   ├── clientes-formulario.png ← Formulario de cliente
│   │   │   ├── reportes.png        ← Tabla de historial de ventas
│   │   │   ├── v-financiera.png    ← Gráfico financiero dashboard
│   │   │   ├── ticket.png          ← Detalle de ticket
│   │   │   ├── alertas.png         ← Centro de Alertas
│   │   │   ├── usuarios.png        ← Tabla de usuarios
│   │   │   └── usuarios-nuevo.png  ← Formulario nuevo usuario
│   │   └── README.md          ← Inventario de imágenes requeridas
│   ├── js/                    ← Scripts JavaScript
│   │   └── zoom.js            ← Lightbox para zoom al hacer clic en imágenes
│   ├── primeros-pasos/        ← Guías de onboarding (3 archivos)
│   │   ├── instalacion.md
│   │   ├── configuracion.md
│   │   └── primera-venta.md
│   └── modulos/               ← Documentación por módulo (8 archivos)
│       ├── dashboard.md
│       ├── ventas.md
│       ├── inventario.md
│       ├── clientes.md
│       ├── reportes.md
│       ├── alertas.md
│       ├── compras.md
│       └── usuarios.md
├── .github/workflows/         ← CI/CD con GitHub Actions
│   └── mkdocs.yml             ← Build automático y deploy a GitHub Pages
├── site/                      ← Build de salida (NO COMMITEAR)
└── venv/                      ← Entorno virtual Python (NO COMMITEAR)
```

## Convenciones de Documentación

### Tema Read the Docs

- El tema usado es **Read the Docs** (built-in de MkDocs), NO Material for MkDocs.
- No existe toggle de modo oscuro/claro — el tema readthedocs tiene diseño fijo.
- La navegación muestra secciones colapsables (`collapse_navigation: true`) y breadcrumbs.
- La barra lateral sigue el orden definido en `mkdocs.yml > nav:`.

### Estructura de navegación

```yaml
nav:
  - Inicio: index.md
  - Primeros pasos:         # 3 archivos
  - Módulos del sistema:    # 7 archivos
  - Administración:         # 2 archivos
  - Preguntas frecuentes: faq.md
  - Novedades: novedades.md
```

### Markdown y extensiones

| Extensión | Uso |
|-----------|-----|
| `admonition` | Bloques `!!! note`, `!!! warning`, `!!! danger`, `!!! tip`, `!!! info` |
| `pymdownx.details` | Admonitions colapsables |
| `pymdownx.superfences` | Bloques de código con sintaxis |
| `pymdownx.highlight` | Resaltado de sintaxis |
| `pymdownx.inlinehilite` | Código inline resaltado |
| `toc.permalink` | Links permanentes (¶) en cada heading |
| `attr_list` | Atributos HTML en elementos Markdown |
| `md_in_html` | Markdown dentro de bloques HTML |

### Imágenes

- Las capturas de pantalla de la aplicación van en `docs/img/screenshoot/` en **formato PNG**.
- El logo y recursos gráficos van en `docs/img/`.

**Para páginas en la raíz de `docs/` (ej: `index.md`):**

```html
<img src="img/screenshoot/nombre.png" alt="Descripción breve de la pantalla" style="width: 700px; height: auto;">
```

**Para páginas en subdirectorios (ej: `primeros-pasos/instalacion.md`, `modulos/ventas.md`):**

```markdown
![Descripción breve de la pantalla](../img/screenshoot/nombre.png){: style="width: 700px; height: auto;"}
```

**¿Por qué `![](){: }` en subdirectorios?** MkDocs **no reescribe** rutas dentro de HTML crudo (`<img>`). En cambio, sí reescribe rutas en sintaxis Markdown `![]()`. La extensión `attr_list` agrega el `style` al `<img>` generado automáticamente. Así la imagen carga tanto en `mkdocs serve` como en el build de producción.

| Tipo de imagen | Ancho sugerido | Ejemplo |
|----------------|:---:|---------|
| Logo o ícono | `280px` | `<img ... style="width: 280px;">` |
| Captura de pantalla | `600–700px` | `<img ... style="width: 700px;">` |
| Modal o ventana pequeña | `400px` | `<img ... style="width: 400px;">` |

- El atributo `alt` es **obligatorio** — describe la pantalla en español.
- Los archivos de imagen deben tener nombres descriptivos en minúsculas: `inicio.png`, `ventas-pago.png`, `usuarios-nuevo.png`.

### Admonitions (bloques especiales)

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `!!! note` | Información contextual o aclaratoria | `!!! note "Título opcional"` |
| `!!! warning` | Advertencias, precauciones | `!!! warning "Atención"` |
| `!!! danger` | Acciones irreversibles (anulación, eliminación) | `!!! danger "Irreversible"` |
| `!!! tip` | Consejos y buenas prácticas | `!!! tip "Recomendación"` |
| `!!! info` | Datos técnicos o de sistema | `!!! info "Detalle técnico"` |

### Tablas

Usar sintaxis Markdown estándar con alineación:

```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|:---------:|----------:|
| izquierda | centrado  |   derecha |
```

### Bloques de código

Usar triple backtick con lenguaje:

```markdown
    ```python
    def saludar():
        print("Hola")
    ```
```

### Referencias a código fuente

Cuando se cite código del ERP, usar el formato `archivo.py:linea`:

```markdown
    ```python
    # controllers/ventas_controller.py:74-78
    def procesar_escaneo(self, event):
        ...
    ```
```

### Cross-references

Los enlaces entre páginas usan rutas relativas desde el archivo actual:

```markdown
[Ir a Ventas](ventas.md)               # Mismo directorio
[Ir a Instalación](../primeros-pasos/instalacion.md)  # Subir un nivel
[Ir a FAQ](../faq.md)                  # Subir un nivel
```

## Reglas Obligatorias

1. **NO committear `site/`** — es el build de salida generado por `mkdocs build`.
2. **NO committear `venv/`** — entorno virtual, dependencias gestionadas con `requirements.txt`.
3. **NO modificar `mkdocs.yml` sin validar** — ejecutar `mkdocs build --clean` después de cualquier cambio en la configuración.
4. **Nuevas páginas: primero en `nav:`, luego el `.md`** — toda página debe estar registrada en `mkdocs.yml > nav:`.
5. **Todo el contenido en español (CL)** — sin anglicismos, tono formal pero accesible. Usar "tú" (no "usted").
6. **Usar `mkdocs serve` para previsualizar** — siempre verificar cambios localmente antes de commitear.
7. **Imágenes con `alt` obligatorio** — accesibilidad y SEO.
8. **Admonitions en español** — el texto dentro de `!!! tipo` debe estar en español.
9. **No usar rutas absolutas** — todos los paths relativos a `docs/`.
10. **No usar HTML complejo** — preferir Markdown puro. Solo usar `<img>` para imágenes con tamaño controlado.

## CI/CD (GitHub Actions)

El proyecto usa **GitHub Actions** para build automático y deploy a GitHub Pages.

### Workflow

Archivo: `.github/workflows/mkdocs.yml`

- **Trigger:** push a `main`
- **Runner:** `ubuntu-latest`, Python 3.13
- **Pasos:**
  1. Checkout del repositorio
  2. Instalar dependencias (`pip install mkdocs pymdown-extensions`)
  3. `mkdocs build --clean`
  4. Deploy a GitHub Pages via `actions/deploy-pages`

### Nota sobre `--strict`

El flag `--strict` fue removido del workflow porque el config `site_favicon` genera un warning benigno que MkDocs no reconoce como válido, pero el tema Read the Docs sí lo procesa correctamente. Sin `--strict`, el build es exitoso con ese único warning.

## Versionado

- **Tags semánticos:** `vX.Y.Z` sobre la rama `main`
- **Changelog:** documentado en `docs/novedades.md`
- **Versión actual:** sincronizada en `index.md`, `novedades.md` y `AGENTS.md`

```bash
# Crear un tag de versión
git tag -a v1.5.1 -m "v1.5.1 — Descripción de cambios"
git push origin v1.5.1
```

## Actualizar el sitio en producción

Cada push a `main` dispara el workflow automáticamente. El sitio se reconstruye y despliega en ~30 segundos.

```bash
git add -A
git commit -m "Descripción de los cambios"
git push origin main
```

```bash
# Iniciar servidor de desarrollo (live reload)
mkdocs serve

# Iniciar en puerto específico
mkdocs serve --dev-addr=127.0.0.1:8000

# Compilar sitio para producción
mkdocs build --clean

# Compilar y revisar warnings
mkdocs build --clean --strict
```

## Agregar una página nueva

1. Crear el archivo `.md` en la carpeta correspondiente (`docs/primeros-pasos/` o `docs/modulos/`).
2. Registrarlo en `mkdocs.yml > nav:` bajo la sección adecuada.
3. Escribir el contenido siguiendo las convenciones de este documento.
4. Agregar cross-references desde páginas relacionadas.
5. Ejecutar `mkdocs build --clean` y verificar 0 errores.

## Agregar una imagen nueva

1. Guardar el PNG en `docs/img/screenshoot/` con nombre descriptivo en minúsculas.
2. Insertar en el `.md` con:
   ```html
   <img src="img/screenshoot/nombre.png" alt="Descripción" style="width: 700px; height: auto;">
   ```
3. Ejecutar `mkdocs build --clean` y verificar que no haya warnings de imagen no encontrada.

## Qué NO hacer

- ❌ NO usar Material for MkDocs ni sus características (palette, features, icons).
- ❌ NO escribir contenido en inglés.
- ❌ NO usar `<img>` HTML en páginas dentro de subdirectorios (`primeros-pasos/`, `modulos/`). Usar `![]()` + `{: style="..."}`.
- ❌ NO modificar archivos en `site/` manualmente.
- ❌ NO usar `print()` ni código Python en los `.md` (esto es documentación estática, no una app).
- ❌ NO crear páginas sin registrarlas en `mkdocs.yml > nav:`.
- ❌ NO usar rutas absolutas (`C:\...`, `http://...`) para recursos locales.
- ❌ NO dejar imágenes sin atributo `alt`.
- ❌ NO poner imágenes de más de 1000px de ancho nativo (redimensionar antes de guardar).
