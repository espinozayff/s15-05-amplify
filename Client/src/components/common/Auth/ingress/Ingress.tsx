import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "components/common/shadcn/dialog"; // Asegúrate de que esta ruta es correcta
import TextField from "../../TextField";
import { Button } from "../../shadcn/button";
import { IngressDialogProps } from "./Ingress.types";

const FormSchema = z.object({
  email: z.string().email("Correo electrónico inválido").min(2, {
    message: "El correo electrónico debe tener al menos 2 caracteres.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});

interface LoginDialogProps {
  openLogin: boolean;
  onClose: () => void;
  handleRegister: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  openLogin,
  onClose,
  handleRegister,
}: IngressDialogProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    console.log("You submitted the following values:", data);
  }

  return (
    <Dialog open={openLogin} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingreso</DialogTitle>
          <DialogDescription className="text-4xl">Bienvenido Nuevamente</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <div className="flex justify-between">
              <a href="/forgot-password" className="text-sm text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            <Button
              type="button"
              className="w-full mt-2 text-white hover:bg-gray-900 transition duration-300"
              variant="outline"
              onClick={handleRegister}
            >
              Registrarse
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
