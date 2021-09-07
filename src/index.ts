import { createOrderAction } from "./actions/create-order";
import axios from "axios";

const botToken1 = {
  accessToken: "",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiMzgzZDVkMi1jNjdlLTRhODQtOGJhMy1hMjdiYTEwZGZjNTcifQ.eyJleHAiOjE2MzEwMTMyMDMsImlhdCI6MTYzMTAxMTQwMywianRpIjoiNTE4MDRhMTMtNzc5ZS00ZThjLThiZTYtNTI1MjM0NjU5NTI0IiwiaXNzIjoiaHR0cHM6Ly9hcGkub3BleC5kZXYvYXV0aC9yZWFsbXMvb3BleCIsImF1ZCI6Imh0dHBzOi8vYXBpLm9wZXguZGV2L2F1dGgvcmVhbG1zL29wZXgiLCJzdWIiOiIwOWE1NmQ4Yi1mMzY0LTRjODgtOGY4ZC0zYjBhNTJlNzIwODAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjI1Yjg0ZWY4LWJhMDEtNDNlNC1iMjI4LTJjM2FjZGNhMDNkYiIsInNjb3BlIjoidHJ1c3QgcHJvZmlsZSBlbWFpbCJ9.1M2r3QWjQ_isdd2-sfY0i0aDNTQesYr9SPiXcqHH2B8",
};

const botToken2 = {
  accessToken: "",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiMzgzZDVkMi1jNjdlLTRhODQtOGJhMy1hMjdiYTEwZGZjNTcifQ.eyJleHAiOjE2MzEwMTMyMjgsImlhdCI6MTYzMTAxMTQyOCwianRpIjoiY2IyMDYxMzktYjMyOS00YjEwLWI1MTEtMGMwNGY0ZDYyNGIzIiwiaXNzIjoiaHR0cHM6Ly9hcGkub3BleC5kZXYvYXV0aC9yZWFsbXMvb3BleCIsImF1ZCI6Imh0dHBzOi8vYXBpLm9wZXguZGV2L2F1dGgvcmVhbG1zL29wZXgiLCJzdWIiOiI1OGVmMjdlOC0zYTczLTRlNzgtODBkMS0yZDk3NWQyYWZkZTMiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjIwNDUxOGEyLTEyNGYtNDBkNC05MTMxLWI4ZmE4ZTE3YWJhNSIsInNjb3BlIjoidHJ1c3QgcHJvZmlsZSBlbWFpbCJ9.rpEBMpVEXAixRkvUVWqxb9hzzmkZSbmnxk6NHGXfmhY",
};

const getAccessToken = async (refreshToken: string) => {
  const form = new URLSearchParams();
  form.append("grant_type", "refresh_token");
  form.append("client_id", "admin-cli");
  form.append("refresh_token", refreshToken);
  const res = await axios.post(
    "https://api.opex.dev/auth/realms/opex/protocol/openid-connect/token",
    form
  );
  return res.data as any;
};

const execute = async () => {
  try {
    const [res0, res1] = await Promise.all([
      getAccessToken(botToken1.refreshToken),
      getAccessToken(botToken2.refreshToken),
    ]);
    botToken1.refreshToken = res0.refresh_token;
    botToken1.accessToken = res0.access_token;
    botToken2.refreshToken = res1.refresh_token;
    botToken2.accessToken = res1.access_token;
    await Promise.all([
      createOrderAction("BTCUSDT", 0.000001, 0.1, 10000, botToken1.accessToken),
      createOrderAction("BTCUSDT", 0.000001, 0.1, 10000, botToken2.accessToken),
    ]);
    console.log(`Executeed at ${new Date()}`);
    setTimeout(execute, 0);
  } catch (error: any) {
    console.log(error.response?.data || error.message || "Error occured");
  }
};

console.log("Bot started...");
execute();
