import { createContext, useState } from "react";
import { toast } from "react-toastify";

interface IContextProviderProps {
  children: React.ReactNode;
}

interface IProductCart {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartProductList: IProductCart[];
  addProductCart: (itemProduct: IProductCart) => void;
  removeProductFromCart: (itemProductId: number) => void;
  removeAllFromCart: () => void;
  totalSum: () => number;
}
export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IContextProviderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cartProductList, setCartProductList] = useState<IProductCart[]>([]);

  function addProductCart(product: IProductCart) {
    if (!cartProductList.includes(product)) {
      toast.success("item adicionado ao carrinho");
      return setCartProductList([...cartProductList, product]);
    } else {
      toast.error("este item ja foi adicionado");
    }
  }

  function removeProductFromCart(itemProductId: number) {
    const newListProductInCart = cartProductList.filter(
      (itemProduct) => itemProduct.id !== itemProductId
    );
    setCartProductList(newListProductInCart);
    toast.success("item removido do carrinho");
  }

  function removeAllFromCart() {
    setCartProductList([]);
    toast.success("Carrinho esvaziado");
  }

  function totalSum() {
    const amout = cartProductList.reduce(
      (acumulator: number, currentValue: IProductCart) => {
        return acumulator + currentValue.price;
      },
      0
    );
    return amout;
  }

  return (
    <CartContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        cartProductList,
        addProductCart,
        removeProductFromCart,
        removeAllFromCart,
        totalSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
