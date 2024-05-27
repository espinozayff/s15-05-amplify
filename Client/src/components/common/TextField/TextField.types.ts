export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  type: string;
  description?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
