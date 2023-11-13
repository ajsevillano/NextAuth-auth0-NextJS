'use client';

import useFetch from '@/hooks/useFetch';

const DashboardPage = () => {
  const { products, loading, error } = useFetch('/products');

  return (
    <>
      {loading && <p>Loading...</p>}
      <h1 className="">Dashboard</h1>

      <h2>Products</h2>
      <ul>
        {products.map(({ id, name, category }) => (
          <li key={id}>
            {id}:{name} - category: {category}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DashboardPage;
