import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatorio"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatorio")
      .email("Forneça um e-mail valido"),
    password: z
      .string()
      .min(8, "A senha é obrigatoria e precisa de no minimo 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "é necessario ao menos uma letra maiuscula")
      .regex(/(?=.*?[a-z])/, "é necessario ao menos uma letra minuscula")
      .regex(/(?=.*?[0-9])/, "é necessario pelo menos um numero")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "é necessario pelo menos um caracter especial"
      ),
    confirmPassword: z.string().min(1, "confirmar a senha é obrigatoria"),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "A confirmação e a senha precisam ser iguais",
    path: ["confirmPassword"],
  });

export type TRegisterFormValues = z.infer<typeof registerFormSchema>;
