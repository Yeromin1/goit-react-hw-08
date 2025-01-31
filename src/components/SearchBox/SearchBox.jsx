import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const handleFilterValue = e => {
    dispatch(changeFilter(e.target.value.trim()));
  };

  return (
    <div className={s.searchBox}>
      <label className={s.filterText}>
        Find contacts by name or number
        <input
          className={s.input}
          type="text"
          onChange={handleFilterValue}
          placeholder="Enter part of name/number"
        />
      </label>
    </div>
  );
};
export default SearchBox;
