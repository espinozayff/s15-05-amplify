export interface ButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
}
