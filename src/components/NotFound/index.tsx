import React from 'react';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, у нас нет запрашиваемой страницы, приносим свои извинения
      </p>
    </div>
  );
};

export default NotFound;
