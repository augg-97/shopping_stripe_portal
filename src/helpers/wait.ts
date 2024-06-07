export const wait = (ms: number) =>
  new Promise((resolve) => {
    if (ms === 0) {
      resolve;
    }
    setTimeout(() => resolve, ms);
  });
