import { useCallback, useState, useEffect } from "react";

const usePriceCalculator = (initialPrice = 0, initialDiscount = 0) => {
  const [price, setPrice] = useState(initialPrice);
  const [discount, setDiscount] = useState(initialDiscount);
  
  // وقتی مقادیر اولیه تغییر می‌کنند، state را آپدیت کن
  useEffect(() => {
    setPrice(initialPrice);
    setDiscount(initialDiscount);
  }, [initialPrice, initialDiscount]);

  const calculateFinalPrice = useCallback(() => {
    const discountAmount = price * (discount / 100);
    // if (!price - discountAmount < 10000){
    //     return "Free"
    // }
    return price - discountAmount;
  }, [price, discount]);
  
  return calculateFinalPrice();
};

export default usePriceCalculator;