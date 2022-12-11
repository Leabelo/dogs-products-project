import { Component } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import config from "../../../Utils/Config";
import "./ProductDetails.css";

interface ProductDetailsProps {
}

interface ProductDetailsState {
    product: ProductModel;
}

class ProductDetails extends Component<ProductDetailsProps, ProductDetailsState> {

    public async componentDidMount() {
        try {
            const lastSlashIndex = window.location.pathname.lastIndexOf("/");
            const id = +window.location.pathname.substr(lastSlashIndex + 1);
            const product = await productsService.getOneProduct(id);
            this.setState({ product });
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="ProductDetails Box">

                <h2>Product Details: </h2>
                <h3>{this.state?.product?.name}</h3>
                <h3>{this.state?.product?.description} </h3>
                <h3>{this.state?.product?.priceRange}</h3>
                <img src={config.urls.productImages + this.state?.product?.imageName} alt={this.state?.product?.imageName} />
                <h3>Followers:{this.state?.product?.followers}</h3>
            
               <h2> <NavLink to="/home">Back</NavLink></h2>

            </div>
        );
    }
}

export default ProductDetails;
