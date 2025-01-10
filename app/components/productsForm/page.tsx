'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent, useState } from 'react';
import { supabase } from '../../supabase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';


function AddProductsForm() {
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '',contact:'' });

  const { toast } = useToast();

   // Add product details
   const addDetails = async (title: string) => {
    const { error } = await supabase.from('products').insert(form).single();

    if ( error) {
      toast({
        title: 'Error',
        description: 'all fields must be filled',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `${title} added successfully!`,
        variant: 'default',
      });

      // if (data) {
      //   setProducts((prevProducts) => [data, ...prevProducts]);
      // }

      setForm({ title: '', description: '', price: '', image: '',contact:'' });
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 



  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    try {
      const { error } = await supabase.storage.from('product-images').upload(fileName, file);

      if (error) throw error;

      return supabase.storage.from('product-images').getPublicUrl(fileName).data.publicUrl;
    } catch (error: unknown) {
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
    <><div className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
          required
            placeholder="Product Title"
            name="title"
            value={form.title}
            onChange={handleFormChange} />
            
          <Input
            placeholder="Product Price (UGX)"
            name="price"
            value={form.price}
            onChange={handleFormChange} required />
  <Input
          required
            placeholder="Seller's Contact"
            name="contact"
            value={form.contact}
            onChange={handleFormChange} />


        </div>
        <textarea
        required
          className="mt-4 w-full rounded-md border border-gray-300 p-3 shadow-sm"
          placeholder="Product Description (Optional)"
          name="description"
          value={form.description}
          onChange={handleFormChange} />
        <div className="flex items-center mt-4">
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Upload Image
            <input required
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden" />
          </label>
          {form.image && (
            <div className="ml-4">
              <Image
                src={form.image}
                alt="Uploaded image"
                width={100}
                height={100}
                className="rounded-md" />
              <p className="text-green-600 text-sm mt-2">Image Added</p>
            </div>
          )}
        </div>
        <Button onClick={() => addDetails(form.title)} className="mt-6 w-full">
          Add Product
        </Button>

      </div>

    </div></>
  );
}

export default AddProductsForm;
