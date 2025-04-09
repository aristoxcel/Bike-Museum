import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetAllProductsQuery  } from '../redux/features/products/productApi';

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const { data, error, isLoading } = useGetAllProductsQuery ({
    searchTerm,
    category,
    brand,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  const products = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {/* Filter Panel */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="input input-bordered w-full max-w-xs"
          placeholder="Search by name/brand/category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <select className="select" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Honda">Honda</option>
          <option value="Suzuki">Suzuki</option>
        </select>

        <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="model">Model</option>
        </select>

        <select className="select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Product List */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm mx-1 ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
