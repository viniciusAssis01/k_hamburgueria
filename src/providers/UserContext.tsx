/* eslint-disable no-param-reassign */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { AxiosError } from "axios";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface ISubmitRegisterParameter {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
interface ISubmitLoginParameter {
  email: string;
  password: string;
}
//tipando resposta da requisição
interface IUser {
  id: string;
  name: string;
  email: string;
}
interface IUserResponse {
  accessToken: string;
  user: IUser;
}

interface IUserResponseGet {
  email: string;
  id: number;
  name: string;
  password?: string;
}

export interface IProductResponse {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IUserContext {
  submitRegister: (formData: ISubmitRegisterParameter) => Promise<void>;
  submitLogin: (formDataLogin: ISubmitLoginParameter) => Promise<void>;
  logout: () => void;
  user: IUser | null;
  loading: boolean;
  productList: IProductResponse[];
  getProductList: () => Promise<void>;
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
  filterProductList(): void;
  clearSearch: () => void;
  newProductList: IProductResponse[];
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<IProductResponse[]>([]);
  const [newProductList, setNewProductList] = useState<IProductResponse[]>([]);
  const [valueInput, setValueInput] = useState("");
  const navigate = useNavigate();

  async function submitRegister(formData: ISubmitRegisterParameter) {
    delete formData.confirmPassword;
    try {
      setLoading(true);
      const { data } = await api.post<IUserResponse>("/users", formData);
      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      const currentError = error as AxiosError<string>;
      toast.error(currentError?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  async function submitLogin(formDataLogin: ISubmitLoginParameter) {
    try {
      setLoading(true);
      const { data } = await api.post<IUserResponse>("/login", formDataLogin);
      localStorage.setItem("@TOKEN", data.accessToken);
      localStorage.setItem("@USERID", String(data.user.id));
      setUser(data.user);
      toast.success("Login realizado com sucesso!");
      api.defaults.headers.common.authorization = `Bearer ${data.accessToken}`;

      setTimeout(() => {
        navigate("/shop");
      }, 2500);
    } catch (error) {
      const currentError = error as AxiosError<string>;
      toast.error(currentError?.response?.data);
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        setLoading(true);
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        const { data } = await api.get<IUser>(`/users/${userId}`);
        console.log(data);
        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  async function getProductList() {
    const token = localStorage.getItem("@TOKEN");
    try {
      setLoading(true);
      const { data } = await api.get<IProductResponse[]>("/products");
      setProductList(data);
      setNewProductList(data);
    } catch (error) {
      const currentError = error as AxiosError<string>;
      toast.error(currentError?.response?.data);
    } finally {
      setLoading(true);
    }
  }

  function filterProductList() {
    if (valueInput.length >= 1) {
      const newList = productList.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(valueInput.toLowerCase().trim().normalize()) ||
          product.category
            .toLowerCase()
            .includes(valueInput.toLowerCase().trim().normalize())
      );
      setNewProductList(newList);
    } else {
      return setNewProductList(productList);
    }
  }

  function clearSearch() {
    setValueInput("");
  }

  return (
    <UserContext.Provider
      value={{
        submitRegister,
        submitLogin,
        logout,
        user,
        loading,
        productList,
        getProductList,
        valueInput,
        setValueInput,
        filterProductList,
        clearSearch,
        newProductList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
