
import AddTestimonial from '../components/AddProducts';


// interface ProductsTypes {
//   id: number;
//   description: string;
//   title: string;
//   price:number
// }

function Page() {
  // const [, setData] = useState<ProductsTypes[]>([]);
  // const { toast } = useToast();

  // useEffect(() => {
  //   const getDataBase = async () => {
  //     const { data: fetchedData, error } = await supabase
  //       .from('products')
  //       .select('*');

  //     if (error) {
  //       toast({
  //         title: 'Error',
  //         description: error.message,
  //         variant: 'destructive',
  //       });
  //     } else {
  //       setData(fetchedData || []);
  //     }
  //   };

  //   getDataBase();
  // }, [toast]);

  // const deleteProduct = async (id: number) => {
  //   const { error } = await supabase
  //     .from('products')
  //     .delete()
  //     .eq('id', id);

  //   if (error) {
  //     toast({
  //       title: 'Error',
  //       description: error.message,
  //       variant: 'destructive',
  //     });
  //   } else {
  //     setData((prevData) => prevData.filter((item) => item.id !== id));
  //     toast({
  //       title: 'Success',
  //       description: `Item with ID ${id} deleted`,
  //       variant:'default'
  //     });
  //   }
  // };

  return (
    <div>
      <AddTestimonial />
      {/* <h1 className="text-2xl font-bold mt-6 mb-4">Products from the Database</h1> */}
      {/* <div className="space-y-4">
        {data.map((dt) => (
          <div
            key={dt.id}
            className="flex  items-center w-1/2 bg-gray-100 p-4 rounded shadow"
          >
            <span>{dt.title}</span>
           


              <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {dt.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {dt.description}
                  </p>
                  <div className="flex  items-center mt-4">
                    <span className="text-lg font-bold text-green-600">${dt.price}</span>
                  </div>
                </div>
                <button
              onClick={() => deleteProduct(dt.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <Trash />

              </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Page;
