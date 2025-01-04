import Image from 'next/image';

type tParams = Promise <{id:number[] }>;


export default async function ProductPage(props:{params:tParams}) {

  const {id} = await props.params

  
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok){
      return <div>Failed to load item... Check your network connection</div>
    }
    const product = await res.json();
    

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{product.title}</h1>
        <div className="flex gap-8">
          <div className="w-1/2 mt-20">
            <Image
              src={product.images[0]}
              alt={product.title}
              className="rounded-lg shadow-lg w-full"
              width={500}
              height={500}
            />
          </div>
          <div className="w-1/2">
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-6">
              ${product.price}
            </p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
