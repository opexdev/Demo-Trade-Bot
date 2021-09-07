import axios from "axios";
import delay from "../utils/delay";

const BASE_URL = "https://api.opex.dev/api/v3";

const createOrder = async (
  body: {
    symbol: string;
    side: "BUY" | "SELL";
    price: number;
    quantity: number;
  },
  token: string
) => {
  const epoch = Math.round(Date.now() / 1000);
  const { symbol, side, price, quantity } = body;
  const url = `${BASE_URL}/order?symbol=${symbol}&side=${side}&price=${price}&quantity=${quantity}&type=LIMIT&timeInForce=GTC&timestamp=${epoch}`;
  return axios.post(url, null, {
    headers: {
      ["Authorization"]: `Bearer ${token}`,
    },
  });
};

export const createOrderAction = async function (
  symbol: string,
  authorizationToken: string
) {
  // const res = await axios.get(
  //   "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  // );
  const data = { price: "51844.40000000" };
  const sourcePrice = Number.parseFloat(data.price);
  // 1 BUY | source <= price <= source%101
  {
    const price = sourcePrice + Math.random() * (0.01 * sourcePrice);
    const quantity = Math.round(Math.random() * 1000) / 1000;
    const res = await createOrder(
      {
        symbol,
        side: "BUY",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
  }
  await delay(9000);
  // 10 BUY | source%90 <= price <= source
  for (let i = 0; i < 10; i++) {
    const price = sourcePrice - Math.random() * (0.1 * sourcePrice);
    const quantity = Math.round(Math.random() * 1000) / 1000;
    const res = await createOrder(
      {
        symbol,
        side: "BUY",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
    await delay(9000);
  }
  // 1 SELL | source%99 <= price <= source
  {
    const price = sourcePrice - Math.random() * (0.01 * sourcePrice);
    const quantity = Math.round(Math.random() * 1000) / 1000;
    const res = await createOrder(
      {
        symbol,
        side: "SELL",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
  }
  await delay(9000);
  // 10 SELL | source <= price <= source%110
  for (let i = 0; i < 10; i++) {
    const price = sourcePrice + Math.random() * (0.1 * sourcePrice);
    const quantity = Math.round(Math.random() * 1000) / 1000;
    const res = await createOrder(
      {
        symbol,
        side: "SELL",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
    await delay(9000);
  }
};
