import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetAllProductsQuery } from '../redux/features/products/productApi';
import { TProduct } from '../redux/types/product';
import { RingLoader } from 'react-spinners';

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState<keyof TProduct | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error } = useGetAllProductsQuery({});

  const allProducts = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        [product.name, product.brand, product.category]
          .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Brand filter
    if (brand) {
      filtered = filtered.filter(product => product.brand === brand);
    }

    // Sort
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];


        if (aValue === undefined) return 1; 
        if (bValue === undefined) return -1; 

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [data, searchTerm, category, brand, sortBy, sortOrder]);

  const total = allProducts.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedProducts = allProducts.slice((page - 1) * limit, page * limit);

  return (
    <div className="container mx-auto py-20 px-14">
      <h2 className="text-4xl text-orange-400 font-bold mb-4">All Products</h2>

      {/* Filter Panel */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="input input-bordered text-orange-300 w-full max-w-xs"
          placeholder="Search by name/brand/category"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        <select className="select text-orange-400" value={category} onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}>
          <option value="">All Categories</option>
          <option value="Mountain">Mountain</option>
          <option value="Road">Road</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>

        <select className="select text-orange-400" value={brand} onChange={(e) => {
          setBrand(e.target.value);
          setPage(1);
        }}>
          <option value="">All Brands</option>
          <option value="Trek">Trek</option>
          <option value="Specialized">Specialized</option>
          <option value="Cannondale">Cannondale</option>
          <option value="Rad Power Bikes">Rad Power Bikes</option>
          <option value="Aventon">Aventon</option>
          <option value="Turboant">Turboant</option>
          <option value="Juiced Bikes">Juiced Bikes</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Hero">Hero</option>
          <option value="Suzuki">Suzuki</option>
        </select>

        <select className="select text-orange-400" value={sortBy} onChange={(e) => setSortBy(e.target.value as keyof TProduct)}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option> 
          <option value="category">Category</option>
        </select>

        <select className="select text-orange-400" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
          <option value="asc">Lowest</option>
          <option value="desc">Highest</option>
        </select>
      </div>

      {/* Product List */}
      {isLoading ? (
             <div className="flex items-center justify-center min-h-screen  px-4">
             <RingLoader size={80} color="#C2410C" />
           </div>
      ) : error ? (
        <div className="text-red-500">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedProducts.length === 0 ? (
            <div className="text-center">No products found.</div>
          ) : (
            paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {/* Previous Button */}
        <button
          className={`btn btn-sm text-2xl text-orange-400 mx-2 ${page === 1 ? 'btn-disabled' : 'btn-outline'}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm text-xl text-orange-400 mx-2  ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`btn btn-sm text-2xl text-orange-400 mx-2  ${page === totalPages ? 'btn-disabled' : 'btn-outline'}`}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
