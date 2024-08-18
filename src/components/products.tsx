import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface EproductsProps {
  category: string;
}

export default function Eproducts({ category }: EproductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const limit = 10;
      const skip = (currentPage - 1) * limit;
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&category=${category}`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, category]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                alt={product.title}
                src={product.images[0]}
                className="h-48 w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(`Added ${product.title} to cart`);
              }}
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
