import axios from "axios";
import { delay, epoch } from "../utils";

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
  const { symbol, side, price, quantity } = body;
  const url = `${BASE_URL}/order?symbol=${symbol}&side=${side}&price=${price}&quantity=${quantity}&type=LIMIT&timeInForce=GTC&timestamp=${epoch()}`;
  return axios.post(url, null, {
    headers: {
      ["Authorization"]: `Bearer ${token}`,
    },
  });
};

const randomInRange = (min: number, max: number, decimals = 6) => {
  return (
    Math.round((min + Math.random() * (max - min)) * 10 ** decimals) /
    10 ** decimals
  );
};

export const createOrderAction = async function (
  symbol: string,
  qtyMin: number,
  qtyMax: number,
  delayMs: number,
  authorizationToken: string
) {
  // const res = await axios.get(
  //   "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  // );
  const data = { price: "51844.40000000" };
  const sourcePrice = Number.parseFloat(data.price);
  // 1 BUY | source <= price <= source%101
  {
    const price = randomInRange(sourcePrice, sourcePrice * 1.01, 0);
    const quantity = randomInRange(qtyMin, qtyMax);
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
  await delay(delayMs);
  // 10 BUY | source%90 <= price <= source
  for (let i = 0; i < 10; i++) {
    const price = randomInRange(sourcePrice * 0.9, sourcePrice, 0);
    const quantity = randomInRange(qtyMin, qtyMax);
    const res = await createOrder(
      {
        symbol,
        side: "BUY",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
    await delay(delayMs);
  }
  // 1 SELL | source%99 <= price <= source
  {
    const price = randomInRange(sourcePrice * 0.99, sourcePrice, 0);
    const quantity = randomInRange(qtyMin, qtyMax);
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
  await delay(delayMs);
  // 10 SELL | source <= price <= source%110
  for (let i = 0; i < 10; i++) {
    const price = randomInRange(sourcePrice, sourcePrice * 1.1, 0);
    const quantity = randomInRange(qtyMin, qtyMax);
    const res = await createOrder(
      {
        symbol,
        side: "SELL",
        price: Math.round(price * 100) / 100,
        quantity,
      },
      authorizationToken
    );
    await delay(delayMs);
  }
};
