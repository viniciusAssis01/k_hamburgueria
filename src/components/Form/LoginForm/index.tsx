import { useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { InputForm } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginFormValues, loginFormSchema } from "./loginFormSchema";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const { submitLogin } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(submitLogin)}>
      <InputForm
        label="Email"
        type="email"
        id="login"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputForm
        label="Senha"
        type="password"
        id="senha"
        error={errors.password?.message}
        {...register("password")}
      />
      <StyledButton $buttonSize="default" $buttonStyle="green" type="submit">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
