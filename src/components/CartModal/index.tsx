import { MdClose } from "react-icons/md";
import CartProductList from "./CartProductList";

import { StyledCartModalBox } from "./style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../providers/CartContext";

const CartModal = () => {
  const { setIsOpenModal, cartProductList } = useContext(CartContext);
  return (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag="h2" $fontSize="three">
            Carrinho de compras
          </StyledTitle>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setIsOpenModal(false)}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className="cartBox">
          <CartProductList />
          {cartProductList.length == 0 ? (
            <div className="emptyBox">
              <StyledTitle tag="h3" $fontSize="three" textAlign="center">
                Sua sacola está vazia
              </StyledTitle>
              <StyledParagraph textAlign="center">
                Adicione itens
              </StyledParagraph>
            </div>
          ) : null}
        </div>
      </dialog>
    </StyledCartModalBox>
  );
};

export default CartModal;
