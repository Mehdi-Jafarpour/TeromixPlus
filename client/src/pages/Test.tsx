import { useQuery } from '@tanstack/react-query';
import { getCategories, getProducts } from '@/services/strapi';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';

const TestPage = () => {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (categoriesLoading || productsLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-600">
            {categoriesLoading && 'Loading categories...'}
            {productsLoading && 'Loading products...'}
          </p>
        </div>
      </div>
    );
  }

  if (categoriesError || productsError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold mb-4">Error loading data</h1>
          {categoriesError && (
            <div className="mb-4">
              <h2 className="text-xl font-bold">Categories Error:</h2>
              <pre className="text-left bg-red-50 p-4 rounded mt-2 overflow-auto">
                {JSON.stringify(categoriesError, null, 2)}
              </pre>
            </div>
          )}
          {productsError && (
            <div>
              <h2 className="text-xl font-bold">Products Error:</h2>
              <pre className="text-left bg-red-50 p-4 rounded mt-2 overflow-auto">
                {JSON.stringify(productsError, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Display raw data for debugging */}
      <div className="mb-8 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-bold mb-4">Raw Data from Strapi:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Categories ({categories?.length || 0}):</h3>
            <pre className="text-xs overflow-auto max-h-60 bg-white p-2 rounded">
              {JSON.stringify(categories, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-bold mb-2">Products ({products?.length || 0}):</h3>
            <pre className="text-xs overflow-auto max-h-60 bg-white p-2 rounded">
              {JSON.stringify(products, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories ({categories?.length || 0})</h2>
        {categories?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-yellow-50 rounded">
            <p className="text-yellow-700">No categories found. Please add some categories in your Strapi admin panel.</p>
          </div>
        )}
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Products ({products?.length || 0})</h2>
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-yellow-50 rounded">
            <p className="text-yellow-700">No products found. Please add some products in your Strapi admin panel.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TestPage; 