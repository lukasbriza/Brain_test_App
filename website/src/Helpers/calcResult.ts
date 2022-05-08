interface calcResultProps {
  num1: number;
  num2: number;
  operator: "+" | "-" | "*" | "/";
}
const calcResult = ({ num1, operator, num2 }: calcResultProps) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};
export { calcResult };
