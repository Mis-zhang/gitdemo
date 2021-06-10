import React, { lazy, Suspense } from 'react';
import Loading from '../components/Loading';

const LazyComponent = importFunc => {
  const LazyComponent = lazy(importFunc);
  return props => (
    <Suspense fallback={<Loading /> || '加载中...'}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;
