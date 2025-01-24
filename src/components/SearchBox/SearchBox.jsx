import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.filterText}>Find contacts by name</div>
      <input
        className={styles.input}
        type="text"
        onChange={handleFilterChange}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBox;
