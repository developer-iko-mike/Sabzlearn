import rules from "./rules";

const validator = (value, validations) => {
  if (!validations || validations.length === 0) {
    return true;
  }

  for (const validation of validations) {
    if (!validation.isValid(value)) {
      return false;
    }
  }

  return true;
};

export default validator;