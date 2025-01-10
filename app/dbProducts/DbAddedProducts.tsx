'use client'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Link from 'next/link'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { supabase } from '../supabase'
import { Input } from '@/components/ui/input'


interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
  }
  


function DbAddedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchInput,setSearchInput] = useState('')


 // Fetch products from Supabase
 useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
      
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);



 

  const deleteProduct = async (id: number, title: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setProducts((prevData) => prevData.filter((item) => item.id !== id));
      toast({
        title: 'Success',
        description: `${title} deleted`,
        variant: 'default',
      });
    }
  };

const searcedProduct = products.filter((prd)=> prd.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <Link href={'../components/productsForm'}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add New Products
          </button>
        </Link>
      </header>

      {/* Search Component */}
      <div className="mb-8">
        <Input onChange={(e)=>setSearchInput(e.target.value)}/>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {searcedProduct.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4"
            >
              <div className="flex flex-col items-center">
                <Link href={`/addedProducts/${product.id}`}>
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="h-56 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
                </Link>
                <p className="text-gray-500 text-wrap break-words w-2/3 line-clamp-3 mt-3">{product.description}</p>
                <div className="flex justify-between items-center w-full mt-4">
                  <span className="text-lg font-bold text-green-600">UGX {product.price}</span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=' w-2/3 rounded-md shadow'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this product and
                          remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='hover:bg-red-900'
                          onClick={() => deleteProduct(product.id, product.title)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>

  )
}

export default DbAddedProducts
