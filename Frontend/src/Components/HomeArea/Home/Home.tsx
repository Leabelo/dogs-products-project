import { Component } from "react";
import "./Home.css";
import ProductModel from "../../../Models/ProductModel";
import Loading from "../../SharedArea/Loading/Loading";
import productsService from "../../../Services/ProductsService";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { Unsubscribe } from "redux";
import { productsStore } from "../../../Redux/Store";
import followedProductsService from "../../../Services/FollowedProductService";
import FollowedProductModel from "../../../Models/FollowedProductModel";
import config from "../../../Utils/Config";
import { TextField } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

interface HomeState {
    products: ProductModel[];
    user: UserModel;
    productsFollowedByUser: FollowedProductModel[];
    readyToDisplay: boolean;
    query: string;

}

class Home extends Component<{}, HomeState> {

    private unsubscribeMe: Unsubscribe;

    public async componentDidMount() {
        try {
            const user = await authService.getUser();
            switch (user.role) {

                case -1:
                    window.location.replace(config.loginPath);
                    break;

                default:
                    this.setState({ user: user });
                    const products = await productsService.getAllProducts();
                    this.setState({ products: products });
                    const productsFollowedByUser = await followedProductsService.getUserFollowedProduct(this.state.user.id);
                    this.setState({ productsFollowedByUser: productsFollowedByUser });
                    const followedByUser: ProductModel[] = this.state?.products.filter((el) => {
                        return this.state?.productsFollowedByUser.some((f) => {
                            return f.productId === el.productId
                        });
                    });

                    followedByUser.forEach(function (element) {
                        element.followedByUser = true;
                    });

                    const notFollowedByUser: ProductModel[] = this.state?.products.filter((el) => {
                        return !this.state?.productsFollowedByUser.some((f) => {
                            return f.productId === el.productId
                        });
                    });

                    notFollowedByUser.forEach(function (element) {
                        element.followedByUser = false;
                    });

                    const allVactions: ProductModel[] = [...followedByUser, ...notFollowedByUser];
                    this.setState({ products: allVactions });
                    this.setState({ readyToDisplay: true });
                    this.unsubscribeMe = productsStore.subscribe(async () => {
                        const products = await productsService.getAllProducts();
                        this.setState({ products });
                    });
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public query: string = "";

    public render(): JSX.Element {

        return (
            <div className="Home">

                <br />
                <TextField
                    id="filled-basic"
                    label="חפש מוצר"
                    variant="standard"
                    onChange={(e) => { this.query = e.target.value; this.setState({ query: e.target.value }); }}
                />
                <br />
                <hr />
                
                {this.state?.products === undefined && <Loading />}

                <div className="cards">
                    {this.state?.readyToDisplay && this.state?.products?.filter((post) => {
                        if (this.query === "") {
                            return post;
                        } else if (

                            post.name.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.priceRange.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.description.toLowerCase().includes(this.query.toLowerCase()) ||
                            post.productId.toString().includes(this.query) ||
                            post.followers.toString().includes(this.query)
                            
                        ) {
                            return post;
                        }
                    }).map(v => <ProductCard key={v.productId} product={v} user={this.state.user} />)}
                </div>

            </div>
        );
    }
}

export default Home;
