import { InputHTMLAttributes, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";

interface IInputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  error?: string;
}

export const InputForm = forwardRef<HTMLInputElement, IInputFormProps>(
  ({ label, type, id, error, ...rest }, ref) => {
    return (
      <div>
        <StyledInputContainer>
          <input type={type} id={id} {...rest} ref={ref} />
          {label ? <label htmlFor={id}>{label}</label> : null}
        </StyledInputContainer>
        {error ? (
          <StyledParagraph fontColor="red">{error}</StyledParagraph>
        ) : null}
      </div>
    );
  }
);
