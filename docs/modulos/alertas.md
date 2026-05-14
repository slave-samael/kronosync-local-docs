# Módulo de Alertas

El Centro de Alertas es una ventana independiente que centraliza todas las notificaciones de stock bajo y vencimiento de productos. Funciona como un sistema de inteligencia de inventario para prevenir quiebres de stock y mermas por caducidad.

![Centro de Alertas](../img/screenshoot/alertas.png){: style="width: 700px; height: auto;"}

---

## Acceso

Disponible para **todos los roles** desde la barra lateral (botón naranjo **Alertas de Stock**). Se abre como una ventana emergente (Toplevel) independiente del panel principal.

---

## Componentes de la pantalla

| Elemento | Función |
|----------|---------|
| Título | "Centro de Alertas e Inteligencia de Stock" |
| Combo Año | Filtra alertas por año |
| Combo Mes | Filtra por mes |
| Botón Exportar | Genera Excel con historial de alertas (BI) |
| Tabla de alertas | 6 columnas con todas las alertas pendientes |
| Barra de desplazamiento | Scroll vertical para muchas alertas |
| Botón Marcar como Leída | Cierra la alerta seleccionada |

### Columnas de la tabla

| Columna | Contenido |
|---------|-----------|
| ID | Número identificador de la alerta |
| Fecha y Hora | Momento en que se generó |
| Usuario | Quién generó la alerta (usuario o SISTEMA) |
| Producto | Nombre del producto afectado |
| Detalle de la Alerta | Mensaje descriptivo del problema |
| Estado | PENDIENTE (una vez leída, desaparece de esta vista) |

!!! info "Solo alertas pendientes"
    La tabla muestra únicamente las alertas **PENDIENTES**. Las alertas marcadas como leídas se mueven al historial y solo son visibles en la exportación Excel.

---

## Tipos de alertas

El sistema genera dos tipos de alertas automáticamente:

### 1. Alerta de stock bajo

Se genera cuando el stock de un producto cae por debajo o iguala su **stock mínimo** configurado.

**¿Cuándo se dispara?**

- Al registrar una venta que deja el stock en el umbral mínimo o por debajo
- Al hacer una venta por volumen que agota una cantidad significativa

**Ejemplo de mensaje:**
```
Atención: Stock bajo crítico. Quedan 3 unidades.
```

### 2. Alerta de vencimiento

Se genera para productos perecederos cuya fecha de vencimiento está dentro de los próximos **N días** (configurado en Ajustes del Negocio).

**¿Cuándo se dispara?**

- Al cargar el Dashboard (Inicio), el sistema evalúa todos los lotes y genera alertas para los que están por vencer
- Una vez por sesión, al entrar al Home

**Ejemplo de mensaje:**
```
Producto próximo a vencer: Líquido de Freno DOT-4 500ml (vence en 15 días)
```

!!! tip "Configurar días de alerta"
    El umbral de días para alertas de vencimiento se configura en **Ajustes del Negocio > Días de alerta**. El valor por defecto es 30 días.

---

## Gestionar alertas

### Marcar como leída

1. Selecciona una alerta en la tabla.
2. Haz clic en **Marcar como Leída (Cerrar Alerta)**.
3. Confirma la acción.
4. La alerta desaparece de la vista de pendientes.

La alerta no se elimina: pasa al historial y puede consultarse en la exportación Excel.

!!! warning "Cerrar una alerta no resuelve el problema"
    Marcar una alerta como leída solo la quita de la vista. Debes tomar acción: reponer stock, ajustar el inventario, o desechar productos vencidos.

---

## Exportación BI (Business Intelligence)

El botón **Exportar Historial a Excel** genera un archivo con **todas** las alertas (pendientes y cerradas), permitiendo analizar patrones.

### Filtros disponibles

- **Año**: selecciona un año específico o "Todos"
- **Mes**: filtra por mes (01 a 12) o "Todos"

### Contenido del Excel

| Columna | Descripción |
|---------|-------------|
| ID | Número de alerta |
| Fecha | Fecha y hora de generación |
| Usuario Generador | Usuario o SISTEMA |
| Producto | Producto afectado |
| Mensaje de Alerta | Texto completo de la alerta |
| Estado Actual | PENDIENTE o CERRADA |

El archivo se guarda como `Inteligencia_Alertas_DD_MM_YYYY.xlsx`.

!!! tip "Análisis de patrones"
    Usa el Excel de alertas para identificar:
    - ¿Qué productos generan más quiebres de stock? → ajusta el stock mínimo
    - ¿En qué meses hay más vencimientos? → planifica mejor las compras
    - ¿Qué vendedores están involucrados en ventas que dejan stock crítico? → revisa procesos

---

## ¿Dónde más se ven las alertas?

Las alertas también aparecen en otras partes del sistema:

| Ubicación | ¿Qué muestra? |
|-----------|--------------|
| **Dashboard (Inicio)** | Tarjeta unificada con hasta 6 alertas (caducidad + stock bajo) |
| **Punto de Venta** | Advertencia al intentar vender sin stock suficiente |
| **Venta por Volumen** | Alerta si la venta masiva deja stock bajo el mínimo |

---

## Flujo de generación de alertas

```python
# controllers/ventas_controller.py:334-352
# Durante _ejecutar_cobro_final:
# 1. Recorre cada producto del carrito
# 2. Verifica si el stock restante <= stock_minimo
# 3. Si es así, registra alerta con producto y mensaje
# 4. Muestra resumen de alertas al confirmar la venta

# controllers/home_controller.py:35
# Al cargar el Dashboard:
# 1. Genera alertas de vencimiento basadas en dias_alerta
# 2. Unifica con alertas de stock bajo para la tarjeta del Home
```

---

## Navegación relacionada

- [Dashboard](dashboard.md): donde se ven las alertas unificadas al iniciar
- [Inventario](inventario.md): para ajustar stock y revisar lotes
- [Reportes](reportes.md): para ver el historial de ventas que pudieron generar alertas
- [Configuración](../primeros-pasos/configuracion.md): para ajustar los días de alerta de vencimiento
