import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { changeSortType, setOrder } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

type sortType = {
  name: string;
  sortType: 'rating' | 'price' | 'alphabetic';
  id: number;
};

const Sort = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const curSortType = useSelector((state: RootState) => state.filter.sort.sortType);
  const currentOrder = useSelector((state: RootState) => state.filter.order);
  const dispatch = useDispatch();
  const sortTypeNames: sortType[] = [
    { name: 'популярности', sortType: 'rating', id: 0 },
    { name: 'цене', sortType: 'price', id: 1 },
    { name: 'алфавиту', sortType: 'alphabetic', id: 2 },
  ];

  const sortName = sortTypeNames.filter((e) => e.sortType === curSortType);
  const sortPopUp = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClosePopUp = (e: MouseEvent) => {
      if (sortPopUp.current && !e.composedPath().includes(sortPopUp.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClosePopUp);
    return () => document.body.removeEventListener('click', handleClosePopUp);
  }, []);

  return (
    <div ref={sortPopUp} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b onClick={() => dispatch(setOrder(currentOrder))}>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortName[0].name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortTypeNames.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setIsVisible(false);
                    dispatch(changeSortType(sortTypeNames[index]));
                  }}
                  className={sortName[0].id == index ? 'active' : ''}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
