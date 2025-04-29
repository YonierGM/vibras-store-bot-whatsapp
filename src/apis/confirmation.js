import { addKeyword, utils } from "@builderbot/bot";

const confirmationFlow = addKeyword(utils.setEvent("CHECKOUT")).addAction(
  async (ctx, { flowDynamic, provider }) => {
    console.log("Contenido de ctx.body:", ctx.body);

    console.log("Número normalizado:", ctx.normalizedNumber);
    console.log("Estado de transacción:", ctx.x_cod_transaction_state);

    if (!ctx.normalizedNumber) {
      console.error("Número normalizado no válido:", ctx.normalizedNumber);
      return;
    }

    if (ctx.x_cod_transaction_state === "1") {
      const message = `
✅ *¡Gracias por tu compra en Vibras Store!* 🎉
    
🛒 *Producto:* ${ctx.x_description}
💵 *Valor total:* $${ctx.x_amount} ${ctx.x_currency_code}
🏦 *Banco:* ${ctx.x_bank_name}
----------------------------------------------
*Fecha de transacción:* ${ctx.x_fecha_transaccion}
*Factura:* ${ctx.x_id_invoice}
*ID de transacción:* ${ctx.x_transaction_id}
*Número de cuotas:* ${ctx.x_quotas}
----------------------------------------------
👤 *Cliente:* ${ctx.x_customer_name} ${ctx.x_customer_lastname}
*Documento:* ${ctx.x_customer_document}
*Email:* ${ctx.x_customer_email}

¡Esperamos que disfrutes tu compra! ✨`;

      await provider.sendMessage(ctx.normalizedNumber, message, {});
    } else if (ctx.x_cod_transaction_state === "2") {
      await flowDynamic(
        `❌ *Tu transacción fue rechazada.*\n\n🔎 *Motivo:* ${ctx.x_response_reason_text}\n\nPor favor, verifica tus datos o intenta nuevamente.`
      );
    } else if (ctx.x_cod_transaction_state === "3") {
      await flowDynamic(
        `⏳ *Tu transacción está en proceso.*\n\nEstamos esperando confirmación del banco. Te informaremos en cuanto tengamos novedades. 📩`
      );
    } else {
      await flowDynamic(
        `⚠️ *Estado de transacción desconocido.*\n\nPor favor, contacta a nuestro equipo de soporte para más información. 🛠️`
      );
    }
  }
);

export default confirmationFlow;
