# Novedades

---

## v1.5.1 — Lanzamiento inicial (Mayo 2026)

Primera versión estable de KronoSync ERP & POS.

### Funcionalidades incluidas

- **Punto de Venta (POS)** con escaneo de código de barras, venta por volumen, múltiples métodos de pago (efectivo, tarjeta, transferencia) y cálculo automático de vuelto
- **Inventario con sistema FEFO** (First Expire, First Out) para productos perecederos, gestión de lotes y control de stock en tiempo real
- **Validación de RUT chileno** mediante algoritmo Módulo 11, con registro automático de clientes desde la caja
- **Boletas PDF** en formato ticketera térmica (80mm) con desglose de IVA (19%)
- **Dashboard financiero** con capital en bodega, flujo de caja diario, ganancia neta y gráfico de torta (Matplotlib)
- **Reportes contables** en Excel con filtros por año/mes, desglose de IVA y totales
- **Centro de Alertas** para stock bajo y vencimientos, con exportación BI a Excel
- **Gestión de usuarios** con 4 roles (ADMIN, DUENO, ADMINISTRADOR, CAJERO) y control de acceso granular
- **Cronómetro de sesión** que registra horas de ingreso y minutos trabajados por empleado
- **Respaldo de base de datos** en 1 clic desde la configuración
- **Auto-sanación de BD**: el sistema reconstruye tablas SQLite automáticamente si detecta anomalías
- **Distribución portable**: ejecutable único para Windows 10/11, sin instalación ni internet requerido

### Stack técnico

- Python 3.13 + CustomTkinter (interfaz oscura/clara)
- SQLite 3 (base de datos local)
- ReportLab (generación PDF)
- OpenPyXL (exportación Excel)
- Matplotlib (gráficos financieros)
- Bcrypt (hash de contraseñas)
- PyInstaller (compilación a .exe portable)

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
| Restauración de backup desde UI | Planificado | Interfaz gráfica para seleccionar y restaurar respaldos |
| Cifrado de base de datos | En estudio | Cifrado opcional del archivo `inventario.db` para entornos sensibles |

¿Tienes una idea o sugerencia? Comunícala al administrador del sistema o al equipo de desarrollo.
