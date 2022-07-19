import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Categories: React.FC = () => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.filter.categoryId);
  return (
    <div className="categories">
      <ul>
        {categories.map((categorieName, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(changeCategory(index));
              }}
              className={currentCategory == index ? 'active' : ''}>
              {categorieName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
