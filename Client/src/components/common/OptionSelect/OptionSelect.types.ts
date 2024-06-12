interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
}
