import { useState, useEffect } from 'react';
import { useToken } from '@/hooks/useToken';
import axios from 'axios';

const useFetch = (path: string) => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(
    /^\//,
    '',
  )}`;
  const token = useToken();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.payload);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, API_URL]);

  return { products, loading, error };
};

export default useFetch;
