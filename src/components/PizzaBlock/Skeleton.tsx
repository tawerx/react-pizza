import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="132" cy="120" r="120" />
    <rect x="0" y="271" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="70" />
    <rect x="0" y="420" rx="10" ry="10" width="92" height="27" />
    <rect x="126" y="408" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
