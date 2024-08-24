export const wait = (ms: number) =>
  new Promise((resolve) => {
    if (!ms) {
      resolve;
    }
    setTimeout(() => resolve, ms);
  });
