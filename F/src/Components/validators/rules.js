const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = "MAX_VALUE";
const emailValue = "EMAIL_VALUE";

export const requiredValidator = () => {
  return {
    type: "REQUIRED",
    errorMessage: "این فیلد الزامی است",
    isValid: (value) => {
      return value.trim().length > 0;
    },
  };
};

export const minValidator = (min) => {
  return {
    type: "MIN",
    errorMessage: `حداقل تعداد کاراکتر مجاز ${min} است`,
    isValid: (value) => {
      return value.length >= min;
    },
  };
};

export const maxValidator = (max) => {
  return {
    type: "MAX",
    errorMessage: `حداکثر تعداد کاراکتر مجاز ${max} است`,
    isValid: (value) => {
      return value.length <= max;
    },
  };
};

export const emailValidator = () => {
  return {
    type: "EMAIL",
    errorMessage: "ایمیل وارد شده معتبر نیست",
    isValid: (value) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    },
  };
};

export const phoneValidator = () => {
  return {
    type: "PHONE",
    errorMessage: "شماره موبایل معتبر نیست (مثال: 09123456789)",
    isValid: (value) => {
      return /^09\d{9}$/.test(value);
    },
  };
};

export default {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
};