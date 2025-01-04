'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
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



interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

function AddProducts() {
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // Fetch products from Supabase
  useEffect(()=>{
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
  
fetchProducts()
  },[toast])
  
 

  // Add product details
  const addDetails = async (title: string) => {
    const { data, error } = await supabase
      .from('products')
      .insert(form)
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${title} added successfully!`,
        variant: 'default',
      });

      if (data) {
        setProducts((prevProducts) => [data, ...prevProducts]);
      }

      setForm({ title: '', description: '', price: '', image: '' });
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteProduct = async (id: number, title: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

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
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    try {
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);
  
      if (error) throw error;
  
      return supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl;
    } catch (error: unknown) {  // Specify 'unknown' to handle non-Error objects
      if (error instanceof Error) {
        console.error('Upload error:', error.message, fileName);
      } else {
        console.error('Unexpected error:', error);
      }
      return null;
    }
  };
  
 
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setForm((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Product Title"
            name="title"
            value={form.title}
            onChange={handleFormChange}
      
          />
          <Input
            placeholder="Product Price (UGX)"
            name="price"
            value={form.price}
            onChange={handleFormChange}
          
          />
        </div>
        <textarea
          className="mt-4 w-full  rounded-md border border-gray-300 p-3 shadow-sm"
          placeholder="Product Description"
          name="description"
          value={form.description}
          onChange={handleFormChange}
        />
        <div className="flex items-center mt-4">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {form.image && <span className="ml-4 text-green-600">Image Uploaded</span>}
        </div>
        <Button onClick={() => addDetails(form.title)} className="mt-6 w-full">
          Add Product
        </Button>

        <h2 className="text-xl font-bold text-gray-800 mt-10">Product List</h2>
        <div className="grid grid-cols-3 max-sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
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
                      className="w-full h-48 object-cover rounded-md mb-4"
                      width={300}
                      height={300}
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3></Link>
                  <p className="text-gray-500 line-clamp-2 mt-3 w-1/2">{product.description}</p>
                  <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-lg font-bold text-green-600">
                      UGX {product.price}
                    </span>  
                   

                    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" 
                      className="text-red-500 hover:text-red-700" >Delete Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
            this product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProduct(product.id, product.title)}>Continue</AlertDialogAction>
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
  );
}

export default AddProducts;
