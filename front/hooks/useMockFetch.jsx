import { useState, useEffect } from 'react';
import FlowList from '../mocks/FlowList';
import Flow1 from '../mocks/Flow1';

function useMockFetch(url, options) {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const get = () => {
    setIsLoading(false);
    setData({
      '/flow/list': FlowList,
      '/flow/1': Flow1,
    }[url]);
  };

  return {
    data, error: null, loading, get,
  };
}

export default useMockFetch;
