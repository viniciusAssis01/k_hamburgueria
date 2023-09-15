import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { IProductResponse } from "../../../providers/UserContext";
import { useContext } from "react";
import { CartContext } from "../../../providers/CartContext";

export interface IProductProps {
  product: IProductResponse;
}

const ProductCard = ({ product }: IProductProps) => {
  const { addProductCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => addProductCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
