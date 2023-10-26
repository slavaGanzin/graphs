import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function FlowList() {
  const {
    data, error, loading, get,
  } = useFetch('/flow/list', {});

  React.useEffect(() => {
    if (!data) {
      get();
    }
  }, []);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return data.map(({ id, name }) => <Link key={id} to={`/flow/edit/${id}`}>{name}</Link>);
}

export default FlowList;
