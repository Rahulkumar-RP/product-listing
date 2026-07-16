import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    if (!res.ok) {
      return { notFound: true };
    }
    const product = await res.json();
    if (!product || !product.id) {
      return { notFound: true };
    }
    return { props: { product } };
  } catch (err) {
    return { notFound: true };
  }
}

export default function ProductDetails({ product }) {
  const { title, price, category, image, description, rating } = product;

  return (
    <>
      <Head>
        <title>{title} | Product Store</title>
      </Head>

      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <Link href="/" className="navbar-brand mb-0 h1 text-decoration-none text-white">
            🛒 Product Store
          </Link>
        </div>
      </nav>

      <div className="container pb-5">
        <Link href="/" className="btn btn-outline-secondary mb-4">
          &larr; Back to products
        </Link>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-md-5">
            <div className="border rounded p-4 bg-white text-center">
              <img src={image} alt={title} style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <span className="badge bg-secondary text-capitalize mb-2">{category}</span>
            <h2>{title}</h2>
            <h3 className="text-success mb-3">${price}</h3>
            {rating && (
              <p className="text-muted">
                ⭐ {rating.rate} ({rating.count} reviews)
              </p>
            )}
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
