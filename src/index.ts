import axiosInstance from "axios";

(async function () {
  const axios = axiosInstance.create({});
  try {
    // const res = await axios.get(
    //   "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    // );
    const data = { price: "51844.40000000" };
    const input = Number.parseFloat(data.price);
    // 1 buy request with price between binance-binance%101
    {
      const price = input + Math.random() * (0.01 * input);
    }
    // 10 buy requests with price between binance%90-binance
    for (let i = 0; i < 10; i++) {
      const price = input - Math.random() * (0.1 * input);
    }
    // 1 sell request with price between binance%99-binance
    {
      const price = input - Math.random() * (0.01 * input);
    }
    // 10 sell requests with price between binance-binance%110
    for (let i = 0; i < 10; i++) {
      const price = input + Math.random() * (0.1 * input);
    }
  } catch (error) {
    console.error(error);
  }
})();
