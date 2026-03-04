const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {

  const data = req.body;

  console.log("Webhook Received:", data);

  if(data.status === "success"){

    let userId = data.merchant_order_id.split("_")[0];

    await axios.get(
      "https://api.telegram.org/8757277978:AAGHFbUas3uEt_f3M03kpZ8K-AG88rH9nJc/sendMessage",
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
  }

  res.sendStatus(200);
});

app.listen(3000);
