'use client';

import { supabase } from '@/app/supabase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  contact:number;
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Oooops,Product not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl  min-h-screen flex flex-col justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 flex justify-center items-center">
          {product.image && (
            <div className="relative w-[400px] h-[400px]">
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <div className="p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4 leading-relaxed break-words">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">UGX {product.price}</p>
          <div className="flex space-x-4">
            <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </Button>
            <Link 
  href={`tel:${product.contact}`} 
  passHref
  className="px-6  space-x-3 h-10 w-1/2 justify-center items-center py-3 flex border-2 rounded-lg hover:bg-slate-500 transition  gap-3"
> <Phone />
  Contact Seller
</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
