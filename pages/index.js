import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';

const PAGE_SIZE = 8;

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return { props: { products, error: null } };
  } catch (err) {
    return { props: { products: [], error: 'Failed to fetch products.' } };
  }
}

export default function Home({ products, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [page, setPage] = useState(1);

  // Debounce search input + show a loading spinner while "filtering"
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsFiltering(false);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
  }, [products, debouncedTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <>
      <Head>
        <title>Product Listing | Next.js + Fake Store API</title>
        <meta name="description" content="SSR product listing page built with Next.js and Bootstrap" />
      </Head>

      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">🛒 Product Store</span>
        </div>
      </nav>

      <div className="container pb-5">
        <div className="row mb-4">
          <div className="col-12 col-md-6 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search products by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {isFiltering ? (
          <div className="spinner-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <p className="text-center text-muted">No products found.</p>
        ) : (
          <div className="row">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isFiltering && totalPages > 1 && (
          <nav aria-label="Product pagination">
            <ul className="pagination justify-content-center mt-3">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(num)}>
                    {num}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
