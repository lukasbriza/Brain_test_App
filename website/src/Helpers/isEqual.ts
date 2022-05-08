const isEqual = (prop1: number | string, prop2: number | string) => {
  if (String(prop1) === String(prop2)) {
    return true;
  } else {
    return false;
  }
};
export { isEqual };
