import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/common/shadcn/dialog"; // Asegúrate de que esta ruta es correcta
import TextField from "../../TextField";
import { Button } from "../../shadcn/button";
import { RegisterDialogProps } from "./Register.types";

const FormSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido").min(2, {
      message: "El correo electrónico debe tener al menos 2 caracteres.",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const RegisterDialog = ({ openLogin, onClose, handleLogin }: RegisterDialogProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    console.log("You submitted the following values:", data);
  }

  return (
    <Dialog open={openLogin} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Registro</DialogTitle>
          <DialogDescription className="text-3xl mt-2">
            Ingresa tu correo electrónico
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <TextField
              placeholder="ejemplo@mail.com"
              type="email"
              label="Correo Electrónico"
              description="Necesitas acceso a tu cuenta de correo electrónico desde tu celular"
              {...form.register("email")}
            />
            <TextField
              placeholder="********"
              type="password"
              label="Contraseña"
              {...form.register("password")}
            />
            <TextField
              placeholder="********"
              type="password"
              label="Repetir Contraseña"
              {...form.register("confirmPassword")}
            />
            <Button type="submit" className="w-full bg-black text-white">
              Registrarse
            </Button>
            <Button
              type="button"
              className="w-full mt-2 border border-black text-white"
              variant="outline"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
