# Novedades

---

## v1.6.0 — Módulo de Lotes y mejoras (Mayo 2026)

### Nuevo módulo

- **Gestión de Lotes**: nuevo módulo visual para administrar lotes por producto. Permite crear, editar y eliminar lotes con fechas de vencimiento, validando que la cantidad total nunca exceda el stock disponible. Incluye indicador visual de disponibilidad (🟢 disponible / 🟡 asignado / 🔴 sobre-asignado).

### Mejoras en módulos existentes

- **Punto de Venta**: selección visual de lote durante la venta. El cajero puede elegir manualmente de qué lote descontar o usar FEFO automático. Nueva columna "Lote" en la tabla del carrito.
- **Inventario**: botón "Ver Lotes" en cada producto para acceder a la gestión visual de lotes directamente desde la tabla de inventario.
- **Dashboard**: panel financiero ahora se muestra en pestañas separadas para ADMIN: "Vista Operativa" y "Resumen Financiero (Gerencia)".
- **Reportes**: exportación Excel ahora incluye columnas de Monto Neto e IVA (19%) junto al Total. Ventas anuladas aparecen en rojo y tachadas. Fila de totales al final.
- **Configuración**: restauración de backup desde la interfaz gráfica. Incluye verificación de integridad SQLite, backup de emergencia automático y barra de progreso.

### Mejoras técnicas

- Esquema de lotes ampliado con `codigo_lote` personalizado
- Tabla de ventas ampliada: `estado`, `usuario`, `cliente_nombre`, `cliente_rut`, `metodo_pago`, `tipo_documento`, `numero_documento`
- Tabla de clientes ampliada: `fecha_registro`, `direccion`, `giro`, `tipo_cliente` (OCASIONAL, FRECUENTE, MAYORISTA)
- Seeder expandido: 57 productos automotrices, 12 clientes, 9 usuarios, 50 ventas históricas con flags parametrizables

---

## Cómo actualizar KronoSync

Cuando se publique una nueva versión:

1. **Haz un respaldo** de tu base de datos actual (`database/inventario.db`) desde **Ajustes del Negocio > Respaldar Base de Datos**.
2. Descarga o recibe la nueva carpeta portable.
3. Reemplaza todos los archivos y carpetas **excepto** `database/`.
4. Inicia KronoSync y verifica que tus datos estén intactos.

!!! danger "Nunca sobrescribas la carpeta database/"
    El archivo `inventario.db` contiene toda la información de tu negocio. Al actualizar, reemplaza todo menos `database/`. Si accidentalmente la sobrescribes, restaura desde tu backup.

---

## Próximas funcionalidades

| Funcionalidad | Estado | Descripción |
|---------------|:------:|-------------|
| Módulo de Compras | Planificado | Registro de proveedores, órdenes de compra y recepción de mercancía con actualización automática de lotes |
| Cierre de caja | Planificado | Apertura y cierre de caja diario con arqueo de efectivo |
| Notificaciones por correo | En estudio | Envío automático de alertas críticas de stock al administrador |
| Múltiples bodegas | En estudio | Soporte para sucursales con inventario independiente |
| Cifrado de base de datos | En estudio | Cifrado opcional del archivo `inventario.db` para entornos sensibles |

¿Tienes una idea o sugerencia? Comunícala al administrador del sistema o al equipo de desarrollo.
