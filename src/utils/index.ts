export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const epoch = () => Math.floor(Date.now() / 1000);
