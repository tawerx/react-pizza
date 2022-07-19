import React from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setFilters, SetFiltersPayload } from '../redux/slices/filterSlice';
import { fetchingPizza } from '../redux/slices/pizzaSlice';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPage = useSelector((state: RootState) => state.filter.pagination);
  const currentCat = useSelector((state: RootState) => state.filter.categoryId);
  const currentSort = useSelector((state: RootState) => state.filter.sort.id);
  const currentSortBy = useSelector((state: RootState) => state.filter.sort.sortType);
  const searchValue = useSelector((state: RootState) => state.filter.search);
  const order = useSelector((state: RootState) => state.filter.order);
  const isLoadingUrl = React.useRef(true);
  const didMount = React.useRef(false);
  const { loading, items } = useSelector((state: RootState) => state.pizza);
  const fetchPizzas = () => {
    const categoryIs = currentCat == 0 ? 'category=' : 'category=' + currentCat;
    const search = searchValue ? `title=${searchValue}&` : '';
    const pageUrl = `page=${currentPage}`;
    const sortUrl = `sortBy=${currentSortBy}`;
    const orderUrl = `order=${order}`;

    dispatch(fetchingPizza({ categoryIs, search, pageUrl, sortUrl, orderUrl }));
  };

  React.useEffect(() => {
    if (didMount.current) {
      const params = qs.stringify({
        page: currentPage,
        search: searchValue,
        category: currentCat,
        sortBy: currentSortBy,
        order: order,
      });

      navigate(`?${params}`);
    }
    didMount.current = true;
  }, [currentCat, currentSort, order, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const pars = qs.parse(window.location.search.substring(1));
      console.log(pars);
      if (
        pars.category === '0' &&
        pars.order === 'desc' &&
        pars.search === '' &&
        pars.sortBy === 'rating'
      ) {
        isLoadingUrl.current = false;
      } else {
        dispatch(setFilters(pars as unknown as SetFiltersPayload));
        isLoadingUrl.current = false;
      }
    } else isLoadingUrl.current = false;
  }, []);

  React.useEffect(() => {
    if (!isLoadingUrl.current) {
      fetchPizzas();
    }
    isLoadingUrl.current = false;
  }, [currentCat, currentSort, order, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => {
    return (
      <div key={index} className="wrapper-pizzaBlock">
        <Skeleton />
      </div>
    );
  });

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container container-home">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
