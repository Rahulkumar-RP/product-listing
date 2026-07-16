import Link from 'next/link';

export default function ProductCard({ product }) {
  const { id, title, price, category, image, rating } = product;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card product-card shadow-sm">
        <div className="product-img-wrap">
          <img src={image} alt={title} loading="lazy" />
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title title-clamp" title={title}>
            {title}
          </h6>
          <span className="badge bg-secondary align-self-start text-capitalize mb-2">
            {category}
          </span>
          <p className="mb-1 fw-bold text-success">${price}</p>
          {rating && (
            <p className="mb-2 text-muted small">
              ⭐ {rating.rate} ({rating.count} reviews)
            </p>
          )}
          <Link
            href={`/product/${id}`}
            className="btn btn-outline-primary btn-sm mt-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
