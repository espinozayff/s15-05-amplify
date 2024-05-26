export interface TextFieldProps {
  placeholder?: string;
  value?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
