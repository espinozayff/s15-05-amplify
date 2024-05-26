import { Input } from "@/components/ui/input";
import { TextFieldProps } from "./TextField.types";

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  onChange,
  type,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      className="py-6 px-4 rounded-[10px] border-black border-[1px] focus-visible:ring-transparent text-[#9CA3AF]"
    />
  );
};

export default TextField;
