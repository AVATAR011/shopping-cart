import { Input, NoData } from "neetoui";
import { Search } from "neetoicons";
import { useEffect,useState } from "react";
import { isEmpty,without } from "ramda";

import productsApi from "apis/products";
import ProductListItem from "./ProductListItem";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import AddToCart from "components/commons/AddToCart";

const ProductList =()=>{

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchKey, setSearchKey] = useState("");
    const debouncedSearchKey = useDebounce(searchKey);

    const fetchProducts = async () =>{
        try{
            const { products } = await productsApi.fetch({searchTerm: debouncedSearchKey});
            setProducts(products);
        }
        catch(error){
            console.log("An error occured", error);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() =>{
        fetchProducts();
    },[debouncedSearchKey]);

    if (isLoading) {
        return (
          <PageLoader />
        );
      }
      return(
        
        <div className="flex h-screen flex-col">
            <div className="m-2">
                <Header 
                    shouldShowBackButton={false} 
                    title="Smile Cart" 
                    actionBlock={
                        <Input
                          placeholder="Search products"
                          prefix={<Search />}
                          type="search"
                          value={searchKey}
                          onChange={event=> setSearchKey(event.target.value)}
                        />
                      }
                />
            </div>
            {isEmpty(products) ? (
                <NoData className="h-full w-full" title="No products to show" />
            ) : (
            <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                <ProductListItem key={product.slug} {...product} />
                ))}
            </div>
            )}
        </div>
      )
}

export default ProductList;