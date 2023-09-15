import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TRegisterFormValues, registerFormSchema } from "./registerFormSchema";
import { StyledForm } from "../../../styles/form";
import { StyledButton } from "../../../styles/button";
import { InputForm } from "../Input";
import { UserContext } from "../../../providers/UserContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const { submitRegister } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(submitRegister)}>
      <InputForm
        label="Nome"
        type="text"
        id="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <InputForm
        label="Email"
        type="email"
        id="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <InputForm
        label="Senha"
        type="password"
        id="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <InputForm
        label="Confirmar senha"
        type="password"
        id="confirmPassword"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
