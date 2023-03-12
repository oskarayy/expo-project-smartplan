export const runConfirmationTimer = (confirmationFn, timerFn) => {
  confirmationFn(true);
  let timer = 3;
  const t1 = setInterval(() => {
    if (timer > 1) {
      timerFn((prevState) => prevState - 1);
      timer--;
    } else {
      confirmationFn(false);
      timerFn(3);
      timer = 3;
      clearInterval(t1);
    }
  }, 1000);
};
