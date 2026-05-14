# Preguntas frecuentes

---

## Acceso y credenciales

### Olvidé la contraseña del administrador. ¿Qué hago?

Si pierdes la contraseña del usuario `admin`, puedes restaurar el acceso de dos formas:

1. **Desde otro usuario ADMIN**: si existe otro usuario con rol ADMIN, puede entrar a **Gestión de Usuarios**, seleccionar al admin y usar el botón **Restablecer Contraseña** para asignar una nueva.

2. **Restaurando un backup**: si no hay otro ADMIN, restaura el archivo `inventario.db` desde un backup anterior a la pérdida de la contraseña. Consulta la sección de [respaldo y restauración](#como-restauro-un-respaldo-de-la-base-de-datos).

!!! warning "Las contraseñas no se pueden recuperar"
    KronoSync usa hash bcrypt para almacenar contraseñas. No hay forma de "ver" la contraseña original. Solo se puede restablecer por una nueva.

### ¿Cuál es la contraseña por defecto?

Al instalar el sistema por primera vez, el usuario `admin` tiene la contraseña:

```
KronoSync2026!
```

Cámbiala inmediatamente después del primer inicio desde **Gestión de Usuarios**.

### No puedo iniciar sesión. Dice "Credenciales inválidas"

Verifica:

1. Que el nombre de usuario esté bien escrito (distingue mayúsculas y minúsculas en el username).
2. Que la contraseña sea correcta (las contraseñas **sí** distinguen mayúsculas/minúsculas).
3. Que el usuario esté **Activo**. Un ADMIN puede desactivar usuarios desde Gestión de Usuarios.

---

## Base de datos

### El sistema no abre. ¿Se corrompió la base de datos?

KronoSync tiene un mecanismo de **auto-sanación de base de datos**: al iniciar, verifica que todas las tablas y columnas existan. Si falta alguna, la crea automáticamente.

Si el problema persiste:

1. Restaura el último backup desde la carpeta `backups/`.
2. Si no tienes backup, ejecuta `python database/db_setup.py` para recrear la estructura (perderás los datos).
3. Como último recurso, borra `database/inventario.db` y reinicia la aplicación. El sistema creará una BD nueva (vacía).

!!! warning "Antes de borrar la BD"
    Siempre intenta restaurar un backup primero. Borrar `inventario.db` elimina toda la información del negocio.

### ¿Dónde se guarda la base de datos?

En la carpeta `database/` dentro de la carpeta de KronoSync:

```
KronoSync_Portable/database/inventario.db
```

### ¿Cómo restauro un respaldo de la base de datos?

1. Cierra KronoSync completamente.
2. Ve a la carpeta `backups/` y elige el archivo de respaldo más reciente (formato: `Respaldo_ERP_Core_DD_MM_YYYY_HHMM.db`).
3. Copia ese archivo a la carpeta `database/`.
4. Renómbralo como `inventario.db` (reemplazando el archivo existente).
5. Abre KronoSync nuevamente.

!!! tip "Haz un respaldo de emergencia antes"
    Antes de sobrescribir la BD actual, copia el `inventario.db` dañado a otra ubicación como respaldo de emergencia.

---

## Roles y permisos

### No veo el botón "Gestión Usuarios" o "Ajustes del Negocio"

Estos módulos solo son visibles para el rol **ADMIN**. Los roles DUENO, ADMINISTRADOR y CAJERO no tienen acceso a:

- Gestión de Usuarios
- Ajustes del Negocio (Configuración)

### No puedo crear ni eliminar productos

Solo los roles **ADMIN** y **DUENO** pueden crear y eliminar productos. El ADMINISTRADOR puede editar productos existentes pero no crear nuevos ni eliminar.

### Soy CAJERO y no veo el precio de compra en el inventario

Es correcto. El rol CAJERO no tiene acceso al precio de compra (costo) de los productos. Esta es una medida de seguridad para que los vendedores no conozcan los márgenes del negocio.

---

## Ventas

### Intenté vender y me dice "Quiebre de stock evitado"

Significa que intentaste agregar más unidades de las que existen en bodega. El sistema:

1. Cancela la adición al carrito.
2. Muestra un mensaje con la cantidad máxima disponible.
3. Envía una notificación al administrador.

Verifica el stock real desde el módulo **Inventario**.

### ¿Puedo vender sin ingresar un cliente?

Sí. Si dejas el campo RUT con el valor por defecto (`11.111.111-1`), la venta se asigna a **Consumidor Final**.

### ¿Cómo anulo una venta que ya cobré?

1. Ve al módulo **Reportes**.
2. Busca la venta (puedes filtrar por fecha).
3. Haz doble clic para abrir el detalle.
4. Haz clic en **Anular Venta**.
5. Confirma.

Solo ADMIN, DUENO y ADMINISTRADOR pueden anular ventas. La anulación es irreversible.

### No se generó el PDF de la boleta

Si la venta se registró correctamente pero el PDF falló:

1. Verifica que la carpeta `tickets_pdf/` exista y tenga permisos de escritura.
2. El mensaje de confirmación de venta mostrará la ruta donde intentó guardarse.
3. La venta **no se pierde**: los datos están en el historial de Reportes.

Error común: la carpeta `tickets_pdf/` fue eliminada accidentalmente. Créala manualmente en el directorio raíz de KronoSync.

---

## Inventario

### ¿Cómo funciona FEFO?

FEFO (First Expire, First Out) es automático. No necesitas hacer nada especial:

1. Al crear un producto perecedero, se registra su fecha de vencimiento.
2. Al vender, el sistema descuenta primero las unidades del lote que vence antes.
3. Si tienes múltiples lotes del mismo producto con distintas fechas, siempre se consume primero el más antiguo.

### El stock no coincide con la bodega física

Usa la función de **Exportar** en Inventario para generar una plantilla Excel:

1. Filtra por categoría si lo deseas.
2. Exporta el Excel.
3. Haz el conteo físico y anota en la columna STOCK FÍSICO.
4. La columna DIFERENCIA se calcula automáticamente.
5. Edita los productos con diferencias desde el módulo Inventario.

---

## Respaldos

### ¿Cada cuánto debo hacer respaldos?

Se recomienda **al menos uno al final de cada día**. Si tu negocio tiene alto volumen de ventas, considera hacer respaldos al medio día también.

### ¿Dónde guardo los respaldos?

- En un **pendrive o disco externo** (no solo en el mismo equipo).
- En una carpeta de red local, si tienes otro equipo en la misma red.
- Nunca como único archivo en el mismo disco duro donde corre KronoSync.

!!! warning "No guardes respaldos solo en el mismo equipo"
    Si el disco duro falla, perderás tanto la BD activa como los respaldos.

### Recibí un error al crear el respaldo

Posibles causas:

- La carpeta de destino no tiene permisos de escritura. Elige otra ubicación.
- El disco está lleno. Libera espacio.
- La BD activa está corrupta. Reinicia la aplicación y verifica que abra correctamente antes de intentar el respaldo nuevamente.

---

## Clientes

### Intenté registrar un cliente y me dice "RUT Inválido"

El sistema usa el algoritmo de Módulo 11 chileno. Verifica que:

1. El RUT tenga el formato correcto: `XX.XXX.XXX-X` (puedes ingresarlo con o sin puntos).
2. El dígito verificador sea correcto. Por ejemplo, `11.111.111-1` es válido; `11.111.111-2` no lo es.
3. No tenga caracteres extraños ni espacios.

Si el RUT es correcto y aun así falla, puede ser un caso borde. Contacta al administrador del sistema.

### No puedo eliminar al "Consumidor Final"

El cliente **Consumidor Final** (RUT `11.111.111-1`) está protegido por el sistema y no puede ser eliminado. Es el cliente por defecto para ventas sin RUT.

### ¿Puedo cambiar el tipo de cliente después de crearlo?

Sí. Selecciona el cliente en la tabla, haz clic en **Editar** y cambia el valor en el combo **Tipo de Cliente**. Las opciones son: OCASIONAL, FRECUENTE y MAYORISTA.

---

## Dashboard

### ¿Qué significa "Capital en bodega"?

Es la valorización total de tu inventario multiplicando el precio de compra de cada producto por su stock actual. Representa cuánto dinero tienes invertido en mercancía.

### ¿Por qué la ganancia neta es negativa?

La ganancia neta se calcula como: `Ventas del día − Costo de lo vendido`. Si es negativa, significa que el costo de los productos vendidos hoy supera los ingresos. Esto puede ocurrir si:

- Vendiste productos por debajo del costo (el precio de venta es menor al precio de compra registrado)
- Los precios de compra están mal registrados en el inventario
- No hubo ventas en el día pero sí movimientos de inventario

Verifica los precios de compra en el módulo **Inventario**.

### ¿Cada cuánto se actualiza el Dashboard?

El Dashboard se actualiza cada vez que navegas a la pantalla de Inicio. Para forzar una actualización, haz clic en el botón **Inicio** de la barra lateral.

---

## Usuarios

### ¿Puedo cambiar mi propia contraseña?

Solo un usuario con rol **ADMIN** puede restablecer contraseñas. Si eres ADMIN, puedes restablecer tu propia contraseña desde **Gestión de Usuarios**. Si no eres ADMIN, solicita al administrador que la restablezca.

### ¿Cuál es la diferencia entre DUENO y ADMINISTRADOR?

| DUENO | ADMINISTRADOR |
|-------|---------------|
| Puede crear y eliminar productos | Solo puede editar productos existentes |
| Puede exportar inventario y reportes | Puede exportar inventario y reportes |
| Sin acceso a gestión de usuarios | Sin acceso a gestión de usuarios |
| Sin acceso a configuración | Sin acceso a configuración |

En la práctica, el DUENO tiene control total sobre el inventario, mientras que el ADMINISTRADOR solo puede modificar lo que ya existe.

---

## Alertas

### ¿Por qué aparece una alerta que ya resolví?

Las alertas no desaparecen automáticamente al reponer stock. Debes **marcarlas manualmente como leídas** desde el Centro de Alertas (botón naranja en la barra lateral). La alerta se moverá al historial.

### ¿Cómo evito que se generen demasiadas alertas?

Ajusta el parámetro **stock mínimo** de cada producto en el módulo Inventario. Un valor más bajo generará menos alertas (pero también menos advertencia antes de un quiebre de stock).

---

## Multi-sesión y red

### ¿Puedo usar KronoSync en dos equipos al mismo tiempo?

KronoSync usa SQLite como base de datos local. No está diseñado para uso simultáneo en red. Si necesitas múltiples puestos de caja, cada equipo debe tener su propia instalación con su propia base de datos.

!!! warning "No compartas la BD en red"
    SQLite no soporta escritura concurrente desde múltiples equipos. Intentar usar el mismo archivo `inventario.db` desde dos PC puede corromper la base de datos.

### ¿Cómo migro KronoSync a otro equipo?

1. En el equipo actual, haz un **respaldo** desde **Ajustes del Negocio**.
2. Copia la carpeta `KronoSync_Portable` completa al nuevo equipo.
3. Copia el archivo de respaldo a la carpeta `database/` y renómbralo como `inventario.db`.
4. Ejecuta `KronoSync.exe` en el nuevo equipo.

---

## Scripts y herramientas

### ¿Cómo ejecuto el script de datos de ejemplo?

El script `seed_repuestos_mecanicos.py` carga productos, clientes y ventas de ejemplo. Para ejecutarlo:

```bash
# Desde la carpeta del proyecto (requiere Python instalado)
python seed_repuestos_mecanicos.py

# Opciones disponibles:
python seed_repuestos_mecanicos.py --reset         # Borra BD y recrea todo
python seed_repuestos_mecanicos.py --only-products # Solo productos
python seed_repuestos_mecanicos.py --only-clients  # Solo clientes
python seed_repuestos_mecanicos.py --only-sales    # Solo ventas históricas
```

!!! warning "--reset borra todos los datos"
    La opción `--reset` elimina la base de datos existente y la recrea desde cero. Úsala solo la primera vez o en entornos de prueba.

### ¿Existen atajos de teclado?

| Atajo | Contexto | Acción |
|-------|----------|--------|
| **Enter** | Campo de código en POS | Agregar producto escaneado |
| **Enter** | Campo de RUT en POS | Buscar cliente |
| **F5** | Punto de Venta | Abrir modal de pago |
| **Enter** | Campo usuario en Login | Saltar al campo contraseña |
| **Enter** | Campo contraseña en Login | Iniciar sesión |
| **Enter** | Formulario de cliente | Navegar entre campos |
| **Doble clic** | Tabla de clientes | Abrir edición |
| **Doble clic** | Tabla de reportes | Ver detalle del ticket |

---

## Errores comunes

### "No se encontró el módulo openpyxl" al exportar Excel

Instala la dependencia faltante:

```bash
pip install openpyxl
```

Si estás usando el ejecutable portable, este error no debería ocurrir. Si aparece, reinstala el ejecutable.

### La aplicación se cierra inesperadamente

1. Revisa la carpeta `.logs_locales/` y abre el archivo de auditoría del mes actual (`auditoria_YYYY_MM.log`).
2. Busca líneas con nivel `[CRITICAL]` o `[ERROR]` para identificar la causa.
3. Si el problema es recurrente, restaura un backup y contacta al administrador del sistema.

### El ejecutable no abre en Windows (error de DLL)

Instala [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) en el equipo. Es un requisito común para aplicaciones compiladas con PyInstaller.

### Windows Defender bloqueó KronoSync.exe

El ejecutable portable puede ser detectado como falso positivo por algunos antivirus porque PyInstaller empaqueta código Python en un `.exe`. Para resolverlo:

1. Agrega una exclusión en Windows Defender para la carpeta de KronoSync.
2. O ejecuta desde el código fuente con `python main.py`.

!!! note "¿Por qué ocurre esto?"
    Los ejecutables generados con PyInstaller contienen un intérprete de Python embebido y archivos `.pyd`, que coinciden con patrones de heurística de algunos antivirus. El código de KronoSync no contiene malware.
