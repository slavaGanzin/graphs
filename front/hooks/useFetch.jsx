import { useState, useEffect } from 'react';
import useFetchReal from 'use-http';
import useMockFetch from './useMockFetch';

function useFetch(url, options) {
  if (ENV == 'mock-dev') return useMockFetch(url, options);
  return useFetchReal(url, options);
}

export default useFetch;
