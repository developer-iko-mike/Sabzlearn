import { useMemo } from "react";

const padZero = (value) => value.toString().padStart(2, '0');

const useFormattedJalaliDate = (rawDateString) => {
  const formattedDate = useMemo(() => {
    if (!rawDateString) return "";

    // استخراج تاریخ پیش از 'T'
    const [datePart] = rawDateString.split("T");

    if (!datePart) return "";

    // جدا کردن سال، ماه، روز با توجه به اینکه ممکن است صفر نداشته باشند
    const [year, month, day] = datePart.split("-").map(Number);

    if (!year || !month || !day) return "";

    return `${year}/${padZero(month)}/${padZero(day)}`;
  }, [rawDateString]);

  return formattedDate;
};

export default useFormattedJalaliDate;