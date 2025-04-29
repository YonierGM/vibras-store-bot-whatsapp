import { join } from "path";
import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  utils,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";

import confirmationFlow from "./apis/confirmation.js";
import testFlow from "./apis/test.js";
import express from "express";

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true })); // Para datos URL-encoded
app.use(express.json()); // Para datos en formato JSON

const PORT = process.env.PORT ?? 3008;

const startFlow = addKeyword(utils.setEvent("START"))
  .addAnswer("¡Hola! 👋 Soy tu asistente virtual.")
  .addAnswer("Escribe *ayuda* para ver opciones.");

const main = async () => {
  const adapterFlow = createFlow([confirmationFlow, testFlow, startFlow]);

  const adapterProvider = createProvider(Provider);
  const adapterDB = new Database();

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  adapterProvider.server.post(
    "/v1/confirmation",
    handleCtx(async (bot, req, res, flowDynamic, provider) => {
      try {
        const {
          x_cod_transaction_state,
          x_response_reason_text,
          x_amount,
          x_id_invoice,
          x_transaction_id,
          x_customer_movil,

          x_description,
          x_currency_code,
          x_bank_name,
          x_quotas,
          x_fecha_transaccion,

          x_customer_document,
          x_customer_name,
          x_customer_lastname,
          x_customer_email,
        } = req.body;

        if (!x_customer_movil) return res.status(400).send("Número requerido");

        const normalizedNumber = x_customer_movil.includes("@s.whatsapp.net")
          ? x_customer_movil
          : `57${x_customer_movil}@s.whatsapp.net`;

        console.log("Número normalizado generado:", normalizedNumber);

        await bot.dispatch("CHECKOUT", {
          from: normalizedNumber,
          x_cod_transaction_state,
          x_response_reason_text,
          x_amount,
          x_id_invoice,
          x_transaction_id,
          x_customer_movil,
          normalizedNumber,

          x_description,
          x_currency_code,
          x_bank_name,
          x_quotas,
          x_fecha_transaccion,

          x_customer_document,
          x_customer_name,
          x_customer_lastname,
          x_customer_email,
        });

        res.end("Bienvenida enviada");
      } catch (error) {
        console.error("Error en /v1/confirmation:", error);
        res.status(500).send("Error procesando la solicitud");
      }
    })
  );
  httpServer(+PORT);
};

main();
