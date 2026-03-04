const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔐 Render madhun token gheto
const BOT_TOKEN = process.env.BOT_TOKEN;

app.post("/webhook", async (req, res) => {

  const data = req.body;

  console.log("Webhook Received:", data);

  if(data.status === "success"){

    let userId = data.merchant_order_id.split("_")[0];

    try{
      await axios.get(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          params:{
            chat_id: userId,
            text:
            "✅ Payout Successful!\n\n"+
            "Amount: ₹"+data.amount+"\n"+
            "UTR: "+data.utr
          }
        }
      );
    } catch(error){
      console.log("Telegram Error:", error.message);
    }
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
