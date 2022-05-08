const numGenerator = (from: number, to: number) => {
  //VALIDATION
  if (from >= to) {
    throw new Error("Props `from` must be lower than props `to`.");
  }
  //LOGIC
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export { numGenerator };
