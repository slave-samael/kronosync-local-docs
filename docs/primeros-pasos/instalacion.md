# Instalación

KronoSync es una aplicación **portable**: no requiere instalador, no modifica el registro de Windows y no necesita internet. Solo copias la carpeta y ejecutas.

---

## Requisitos del sistema

| Componente | Mínimo |
|------------|--------|
| Sistema operativo | Windows 10 o superior (64 bits) |
| Espacio en disco | 200 MB libres |
| Memoria RAM | 2 GB |
| Internet | **No requiere** |
| Python | **No requiere** (solo si se ejecuta desde código fuente) |

!!! note "Equipos recomendados"
    La aplicación funciona en equipos con Windows 10/11. No ha sido probada en Windows 7 u 8.

---

## Opción A: Ejecutable portable (recomendado para usuarios finales)

Si recibiste la carpeta `KronoSync_Portable`, la instalación es inmediata:

1. Copia la carpeta completa `KronoSync_Portable` a una ubicación de tu equipo (ej: `C:\KronoSync` o el Escritorio).
2. Abre la carpeta y ejecuta `KronoSync.exe`.
3. En el primer inicio, inicia sesión con las credenciales por defecto:

```
Usuario: admin
Contraseña: KronoSync2026!
```

!!! warning "Cambia la contraseña inmediatamente"
    Por seguridad, después del primer inicio debes cambiar la contraseña del administrador desde el módulo **Gestión de Usuarios** (visible solo para el rol ADMIN).

### Estructura de la carpeta portable

```
KronoSync_Portable/
├── KronoSync.exe          ← Ejecutable principal
├── assets/                ← Recursos gráficos
├── database/              ← Se crea inventario.db en el primer arranque
├── tickets_pdf/           ← Boletas PDF generadas
├── backups/               ← Respaldos de base de datos
└── reportes/              ← Exportaciones Excel
```

---

## Opción B: Desde código fuente (para desarrollo)

Si necesitas ejecutar KronoSync desde el código fuente:

### 1. Instalar Python

Requiere **Python 3.13** instalado en el equipo. Descárgalo desde [python.org](https://www.python.org/downloads/).

### 2. Instalar dependencias

Abre una terminal (PowerShell o Símbolo del sistema) en la carpeta del proyecto y ejecuta:

```bash
pip install -r requirements.txt
```

### 3. Ejecutar la aplicación

```bash
python main.py
```

### Instalación offline de dependencias

Si el equipo de desarrollo no tiene internet, puedes preparar un paquete offline desde una máquina con conexión:

```bash
# En máquina con internet: descargar dependencias
pip download -r requirements.txt -d dependencias_offline/

# En máquina sin internet: instalar desde carpeta local
pip install --no-index --find-links=dependencias_offline/ -r requirements.txt
```

---

## Compilación del ejecutable (PyInstaller)

Para generar un nuevo `KronoSync.exe` portable:

### Requisitos previos

- Python 3.13
- Dependencias instaladas (`pip install -r requirements.txt`)
- PyInstaller (`pip install pyinstaller`)

### Comando de compilación

```bash
pyinstaller KronoSync.spec --clean --noconfirm
```

El ejecutable se generará en la carpeta `dist/KronoSync/`.

!!! tip "UPX para reducir tamaño"
    Si instalas [UPX](https://upx.github.io/), el `.spec` ya está configurado con `upx=True` para comprimir el ejecutable.

---

## Verificación de la instalación

Para confirmar que todo funciona correctamente:

1. Abre `KronoSync.exe` (o ejecuta `python main.py`).
2. Deberías ver la pantalla de inicio de sesión con el logo de KronoSync.
3. Inicia sesión con `admin` / `KronoSync2026!`.
4. Si es el primer arranque, el sistema creará automáticamente la base de datos y el usuario administrador.

![Pantalla principal de KronoSync](../img/screenshoot/inicio.png){: style="width: 700px; height: auto;"}

!!! warning "Problemas al iniciar"
    Si el ejecutable no abre o muestra errores de DLL, instala [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) en el equipo.

---

## Siguiente paso

Una vez instalado, continúa con la [Configuración inicial](configuracion.md) para personalizar los datos de tu empresa.

!!! tip "¿Problemas?"
    Consulta la sección de [Preguntas frecuentes](../faq.md) si encuentras errores durante la instalación.
