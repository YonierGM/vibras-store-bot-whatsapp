# 📦 vibras-bot-whatsapp

🤖 Bot de WhatsApp para confirmar compras y pagos de **Vibras Store**.  
Construido con **Node.js**, **BuilderBot**, **Baileys** y **Express**.

---

## 🚀 Características

- Recibe notificaciones de transacciones exitosas, rechazadas o pendientes.
- Envía mensajes personalizados a los clientes vía WhatsApp.
- Guarda la sesión de WhatsApp en archivos locales para no perder la conexión.
- Arquitectura limpia usando flujos (`Flows`) en BuilderBot.
- Listo para correr en **Docker** o en cualquier servidor Node.js.


## Docker
- docker build -t store-bot .
- docker run -d --name vibras-store -p 3008:3008 -e PORT=3008 store-bot


## ✨ Créditos

- BuilderBot
- Baileys

Inspirado en soluciones modernas de automatización de WhatsApp.
---
