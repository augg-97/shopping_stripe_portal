export const wait = (ms = 0) =>
  new Promise<void>((resolve) => {
    if (!ms) {
      resolve();
    }
    setTimeout(() => {
      resolve();
    }, ms);
  });
