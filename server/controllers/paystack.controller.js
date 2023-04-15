  
  const initializeTransaction = async (req, res) => {
  const https = require("https");
      const { email, amount } = req.query;
      const formatAmount =amount *100;
      console.log(email, amount);

  const params = JSON.stringify({
    email,
    amount:formatAmount,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization:`Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data)
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();

}

const verifyTransaction=async (req,res)=>{

}

export { initializeTransaction };