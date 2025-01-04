'use client';

import { supabase } from '@/app/supabase';
import { useEffect, useState } from 'react';

import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const ProductDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
  
    const fetchParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (!error) {
          setProduct(data);
        } else {
          console.error('Error fetching product:', error.message);
        }

        setLoading(false);
      };

      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className=" max-sm:h-screen max-sm:mt-28 max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg h-screen mt-20 flex">
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0 w-full md:w-1/2 mb-6 md:mb-0">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="md:ml-8 flex flex-col justify-start w-full">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
    <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-8">UGX {product.price}</p>
          <div className="flex justify-start space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
