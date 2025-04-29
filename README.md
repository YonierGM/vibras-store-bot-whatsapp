📦 vibras-bot-whatsapp
🤖 Bot de WhatsApp para confirmar compras y pagos de Vibras Store.
Construido con Node.js, BuilderBot, Baileys y Express.

🚀 Características
Recibe notificaciones de transacciones exitosas, rechazadas o pendientes.

Envía mensajes personalizados a los clientes vía WhatsApp.

Guarda la sesión de WhatsApp en archivos locales para no perder la conexión.

Arquitectura limpia usando flujos (Flows) en BuilderBot.

Listo para correr en Docker o en cualquier servidor Node.js.

📂 Estructura del proyecto
bash
Copy
Edit
.
├── assets/              # Recursos opcionales (ej: imágenes, archivos)
├── src/
│   ├── apis/
│   │   ├── confirmation.js
│   │   └── test.js
│   └── app.js           # Archivo principal
├── package.json
└── README.md
⚙️ Instalación
Clona el repositorio

bash
Copy
Edit
git clone https://github.com/tuusuario/vibras-bot-whatsapp.git
cd vibras-bot-whatsapp
Instala las dependencias

bash
Copy
Edit
npm install
Crea la carpeta de sesiones (opcional si no se crea automáticamente)

bash
Copy
Edit
mkdir bot_sessions
Levanta el bot

bash
Copy
Edit
npm run dev
O simplemente:

bash
Copy
Edit
node src/app.js
📨 Endpoints disponibles
POST /v1/confirmation → Recibe los datos de pago y envía el mensaje al cliente.

Ejemplo de JSON esperado:
json
Copy
Edit
{
  "x_cod_transaction_state": "1",
  "x_response_reason_text": "Transacción aprobada",
  "x_amount": "50000",
  "x_id_invoice": "INV123456",
  "x_transaction_id": "TRX654321",
  "x_customer_movil": "3182413489",
  "x_description": "Compra de camiseta Vibras",
  "x_currency_code": "COP",
  "x_bank_name": "Bancolombia",
  "x_quotas": "1",
  "x_fecha_transaccion": "2025-04-28",
  "x_customer_document": "1234567890",
  "x_customer_name": "Juan",
  "x_customer_lastname": "Pérez",
  "x_customer_email": "juanperez@email.com"
}
📋 Variables de entorno
Puedes configurar un archivo .env si deseas definir el puerto del servidor:

env
Copy
Edit
PORT=3008
🐳 Docker (opcional)
Para correrlo en Docker:

bash
Copy
Edit
docker build -t vibras-bot .
docker run -p 3008:3008 -v $(pwd)/bot_sessions:/app/bot_sessions vibras-bot
(Recuerda mapear la carpeta de sesiones correctamente.)

📜 Licencia
Este proyecto está bajo la licencia MIT.

✨ Créditos
BuilderBot

Baileys

Inspirado en soluciones modernas de automatización de WhatsApp.
