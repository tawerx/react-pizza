import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Pagination: React.FC<any> = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.filter.pagination);
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => dispatch(changePage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        forcePage={currentPage - 1}
        initialPage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
