export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    if (!ms) {
      resolve();
    }
    setTimeout(() => {
      resolve();
    }, ms);
  });
