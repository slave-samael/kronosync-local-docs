# Módulo de Lotes

El módulo de Lotes permite gestionar visualmente los lotes de cada producto: crear, editar y eliminar lotes con fechas de vencimiento, validando que la cantidad total nunca exceda el stock disponible.

📷 *[Pantalla de gestión de lotes — pendiente de subir]*

---

## Acceso

Disponible para los roles **ADMIN**, **DUENO** y **ADMINISTRADOR**. Se accede desde el módulo [Inventario](inventario.md), seleccionando un producto y haciendo clic en **Ver Lotes**.

---

## Componentes de la pantalla

| Elemento | Función |
|----------|---------|
| Cabecera del producto | Muestra: nombre, código, categoría, stock total, stock mínimo y precio de venta |
| Indicador de disponibilidad | 🟢 Stock disponible / 🟡 Totalmente asignado / 🔴 Sobre-asignado |
| Tabla de lotes | Columnas: Código Lote, Cantidad, Fecha Vencimiento |
| Botón Agregar Lote | Crea un nuevo lote para este producto |
| Botón Editar | Modifica cantidad o fecha de vencimiento de un lote existente |
| Botón Eliminar | Elimina un lote (con confirmación) |

### Indicador de disponibilidad

El sistema compara la suma de las cantidades de todos los lotes contra el stock total del producto:

| Color | Significado |
|:---:|-----------|
| 🟢 **Disponible** | La suma de los lotes es menor que el stock total. Aún puedes agregar más lotes. |
| 🟡 **Totalmente asignado** | La suma de los lotes es igual al stock total. No puedes agregar más lotes. |
| 🔴 **Sobre-asignado** | La suma de los lotes supera el stock total. Debes corregir las cantidades. |

---

## Agregar un lote

1. Selecciona un producto en el módulo **Inventario**.
2. Haz clic en **Ver Lotes**.
3. Haz clic en **Agregar Lote**.
4. Completa los campos:

| Campo | Descripción |
|-------|-------------|
| Código de Lote | Identificador del lote (ej: `780F0001` o `LOTE-MAYO-2026`) |
| Cantidad | Unidades en este lote |
| Fecha de Vencimiento | Fecha en que vence este lote (seleccionable con calendario) |

5. Haz clic en **Guardar**.

!!! warning "Validación de stock"
    No puedes crear un lote cuya cantidad haga que la suma total de lotes supere el stock disponible del producto. El sistema muestra el máximo permitido.

!!! tip "Productos perecederos"
    Usa lotes con fechas de vencimiento para productos como líquidos, lubricantes o alimentos. El sistema FEFO usará automáticamente el lote que vence primero al vender.

---

## Editar un lote

1. Selecciona un lote en la tabla.
2. Haz clic en **Editar**.
3. Modifica la **cantidad** y/o **fecha de vencimiento**.
4. Confirma para guardar.

!!! info "Código de lote no editable"
    El código de lote no puede modificarse una vez creado. Si necesitas cambiarlo, elimina el lote y crea uno nuevo.

---

## Eliminar un lote

1. Selecciona el lote en la tabla.
2. Haz clic en **Eliminar**.
3. Confirma la acción.

!!! warning "Eliminación de lotes"
    Al eliminar un lote, sus unidades dejan de estar asignadas. El indicador de disponibilidad se actualizará para reflejar el nuevo espacio disponible.

---

## Lotes por defecto

Cuando creas un producto **sin especificar lotes**, el sistema genera automáticamente un lote por defecto con código `P-DEFAULT001` que contiene todo el stock del producto. Esto asegura que el sistema FEFO siempre tenga al menos un lote desde el cual descontar.

---

## Integración con FEFO y Ventas

Los lotes son el motor del sistema **FEFO** (First Expire, First Out):

- Al vender un producto con múltiples lotes, el sistema descuenta primero del lote con **fecha de vencimiento más próxima**.
- En el **Punto de Venta**, el cajero puede elegir manualmente de qué lote descontar, o dejar que el sistema use FEFO automático.
- Los lotes sin fecha de vencimiento (`NULL`) se consumen al final.

!!! tip "Selección manual vs FEFO"
    Si necesitas vender unidades de un lote específico (por ejemplo, uno que está por vencer), usa la selección manual en el POS. Si no te importa cuál, el botón "Usar FEFO automático" elige el que vence primero.

---

## Navegación relacionada

- [Inventario](inventario.md): donde accedes a la gestión de lotes desde cada producto
- [Punto de Venta](ventas.md): donde se aplica FEFO durante las ventas
- [Alertas](alertas.md): donde ves alertas de productos próximos a vencer
