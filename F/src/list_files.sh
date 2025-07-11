#!/bin/bash

# نام فایل خروجی
output_file="file_names.txt"

# پاک کردن فایل خروجی اگر از قبل وجود داشته باشد
> "$output_file"

# خواندن اسامی فایل‌ها در پوشه جاری و ذخیره در فایل
for file in *; do
  if [ -f "$file" ]; then  # فقط فایل‌ها (نه پوشه‌ها)
    echo "$file" >> "$output_file"
  fi
done

echo "اسامی فایل‌ها در فایل $output_file ذخیره شد."