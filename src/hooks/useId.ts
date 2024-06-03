export const useId = () => {
  const randomPart = Math.random().toString().substr(2, 10);
  const timePart = String(new Date().getTime());
  return randomPart + "_" + timePart;
};
