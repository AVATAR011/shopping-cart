import { append, isNotNil } from "ramda";
import { useEffect, useState } from "react";
import { Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";
import AddToCart from "components/commons/AddToCart";
import routes from "routes";
import Carousel from "./Carousel";
import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";
import useSelectedQuantity from "hooks/useSelectedQuantity";

const Product = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const {slug} = useParams();

    const {selectedQuantity, setSelectedQuantity} = useSelectedQuantity(slug);

    const fetchProduct = async () =>{
        try{
            const response = await productsApi.show(slug);
            setProduct(response);
        }
        catch{
            setIsError(true);
        }
        finally{
            setIsLoading(false);
        }
    };
    
    useEffect(()=>{
        fetchProduct();
    },[]);

    const {name, description, mrp, offerPrice, imageUrls, imageUrl, availableQuantity} = product;
    const totalDiscount = mrp - offerPrice;
    const discountPercentage = ((totalDiscount/mrp)*100).toFixed(1);
    if(isError) return <PageNotFound />

    if (isLoading) {
        return (
          <PageLoader />
        );
      }
    return(
        <>
        <Header title={name} />
        <div className="flex gap-4 mt-6">
            <div className="w-2/5">
                <div className="m-16 flex justify-center gap-16">
                    {isNotNil(imageUrls) ? (
                        <Carousel  title={name} imageUrls={append(imageUrl, imageUrls)} />
                    ) : (
                        <img alt={name} className="w-48" src={imageUrl} />
                    )}
                </div>
            </div>
            <div className="w-3/5 space-y-4">
                <Typography>{description}</Typography>
                <Typography>MRP: {mrp}</Typography>
                <Typography className="font-semibold">Offer price: {offerPrice}</Typography>
                <Typography className="font-semibold text-green-600"s>{discountPercentage}% off</Typography>
                <div className="flex space-x-10">
                    <AddToCart {...{availableQuantity, slug }} />
                    <Button
                        className = "bg-neutral-800 hover:bg-neutral-950"
                        label="Buy now"
                        size="large"
                        to={routes.checkout}
                        onClick={() => setSelectedQuantity(selectedQuantity || 1)}
                    />
                </div>
            </div>
        </div>
    </>
);}

export default Product;