import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import { buildUrl } from "utils/url";
import routes from "routes";
import AddToCart from "components/commons/AddToCart";


const ProductListItem = ({name, imageUrl, offerPrice, slug, availableQuantity}) =>(
    <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={buildUrl(routes.products.show, { slug })}
    >
        <img src={imageUrl} alt={name} className="h-40 w-40" />
        <Typography className="text-center" weight="semibold">{name}</Typography>
        <Typography>${offerPrice}</Typography>
        <AddToCart {...{availableQuantity, slug }}  />
    </Link>
);

export default ProductListItem;