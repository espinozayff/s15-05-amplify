import { JSX } from "react";
import TextField from "../common/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "components/common/shadcn/form";

function Feed(): JSX.Element {
  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    console.log("You submitted the following values:", data);
  }

  return (
    //TODO: Eliminar esto cuando se cree el componente Modal
    <div className="container mx-auto my-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <TextField
                placeholder="ejemplo@mail.com"
                type="email"
                label="Correo Electrónico"
                description="Necesitas acceso a tu cuenta de correo electrónico desde tu celular"
                {...field}
              />
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default Feed;
