import { forwardRef } from "react";
import { Input } from "components/common/shadcn/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/common/shadcn/form";

import { TextFieldProps } from "./TextField.types";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ placeholder, value, onChange, type, label, description, ...props }, ref) => {
    return (
      <FormItem>
        {label && <FormLabel className="dark:text-white text-[#111928] font-medium text-sm">{label}</FormLabel>}
        <FormControl>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            className="py-6 dark:bg-white px-4 rounded-[10px] border-black border-[1px] focus-visible:ring-transparent text-black"
            ref={ref}
            {...props}
          />
        </FormControl>
        {description && (
          <FormDescription className="text-[12px] text-[#4B5563]">{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    );
  },
);
TextField.displayName = "TextField";
export default TextField;
