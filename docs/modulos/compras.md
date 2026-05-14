# Módulo de Compras

!!! warning "Módulo en desarrollo"
    El módulo de Compras aún no está implementado en esta versión de KronoSync.

---

## Estado actual

Actualmente, el sistema **no cuenta** con controlador, vista ni modelo de compras. No existe funcionalidad para:

- Registrar pedidos a proveedores
- Recepcionar mercancía
- Gestionar cuentas por pagar
- Registrar órdenes de compra

---

## Funcionalidades planificadas

El módulo de Compras, cuando se implemente, incluirá:

- Registro de proveedores con RUT, nombre y datos de contacto
- Creación de órdenes de compra con productos y cantidades
- Recepción de mercancía con actualización automática de stock y lotes (FEFO)
- Registro de precios de compra por lote (trazabilidad de costo)
- Cuentas por pagar con estado (pendiente, pagada, vencida)
- Historial de compras por proveedor y período

---

## Mientras tanto

Para ingresar mercancía al inventario mientras el módulo de Compras no está disponible, puedes:

1. Usar el formulario de **Nuevo Producto** en el módulo Inventario para productos nuevos.
2. **Editar** un producto existente y ajustar manualmente su stock.
3. Registrar el precio de compra en el campo correspondiente del producto.

!!! note "Registro manual de costo"
    El campo **Precio de Compra** en cada producto sirve como referencia del último costo de adquisición. Se actualiza manualmente al editar el producto.

---

## Próximamente

Consulta la sección de [Novedades](../novedades.md) para conocer cuándo estará disponible este módulo.
