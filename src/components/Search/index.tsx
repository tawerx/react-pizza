import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Search: React.FC = () => {
  const { search } = useSelector((state: RootState) => state.filter);
  const [currentSearchValue, setCurrentSearchValue] = React.useState<string>('');
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClickClear = () => {
    setCurrentSearchValue('');
    debouncedSearch('');
    inputRef.current?.focus();
  };

  const debouncedSearch = React.useCallback(
    debounce((e: string) => {
      dispatch(setSearchValue(e));
    }, 250),
    [],
  );

  React.useEffect(() => {
    setCurrentSearchValue(search);
  }, [search]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div className={styles.root}>
      <svg className={styles.searchIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={currentSearchValue}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {currentSearchValue && (
        <svg
          onClick={onClickClear}
          className={styles.deleteIcon}
          data-name="Layer 1"
          height="200"
          id="Layer_1"
          viewBox="0 0 200 200"
          width="200"
          xmlns="http://www.w3.org/2000/svg">
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
