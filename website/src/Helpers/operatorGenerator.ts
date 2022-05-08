import { numGenerator } from "./numGenerator";

const operatorGenerator = () => {
  const number = numGenerator(1, 4);
  switch (number) {
    case 1:
      return "+";
    case 2:
      return "-";
    case 3:
      return "*";
    case 4:
      return "/";
    default:
      return "*";
  }
};

export { operatorGenerator };
