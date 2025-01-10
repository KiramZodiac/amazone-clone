// 'use client';

// import React, { useState } from 'react';

// import Search from './Search';
// import Link from 'next/link';
// import Image from 'next/image';


// interface Product {
//   id: number;
//   title: string;
//   images: string[];
//   description: string;
//   price: number;
// }

// async function fetchProducts(): Promise<Product[]> {
//   const res = await fetch('https://dummyjson.com/products');
//   const data = await res.json();
//   return data.products;
// }

// export default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filtered products based on search
//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // React.useEffect(() => {
//   //   const loadProducts = async () => {
//   //     const fetchedProducts = await fetchProducts();
//   //     setProducts(fetchedProducts);
//   //   };


//   // },[]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 pt-24">
//       <div className="container mx-auto px-4">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
//           <Link href={'./dbProducts'}>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//               Add New Products
//             </button>
//           </Link>
//         </header>

//         {/* Search Component */}
//         <div className="mb-8">
//           <Search
//             onSearchChange={(query: string) => setSearchQuery(query)}
//           />
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <Link href={`/products/${product.id}`}>
//                 <div className="relative w-full h-56">
//                   <Image
//                     src={product.images[0]}
//                     alt={product.title}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded-t-lg"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-gray-800 truncate">
//                     {product.title}
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                     {product.description}
//                   </p>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-lg font-bold text-green-600">${product.price}</span>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
      
//     </div>
//   );
// }
