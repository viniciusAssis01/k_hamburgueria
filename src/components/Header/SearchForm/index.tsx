import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { UserContext } from "../../../providers/UserContext";
import { useContext } from "react";

const SearchForm = () => {
  const { valueInput, setValueInput, filterProductList } =
    useContext(UserContext);

  return (
    <StyledSearchForm>
      <input
        type="text"
        placeholder="Digitar pesquisa"
        value={valueInput}
        onChange={(e) => {
          setValueInput(e.target.value);
        }}
      />
      <StyledButton
        type="button"
        $buttonSize="medium"
        $buttonStyle="green"
        onClick={() => filterProductList()}
      >
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;

/* event.preventDefault */
