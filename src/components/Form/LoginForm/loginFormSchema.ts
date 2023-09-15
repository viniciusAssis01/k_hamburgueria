import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatorio")
    .email("Por favor, forneça um e-mail cadastrado"),
  password: z.string().min(1, "Por favor, digite sua senha"),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
