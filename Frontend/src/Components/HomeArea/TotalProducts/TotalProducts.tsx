import { Component } from "react";
import { Unsubscribe } from "redux";
// import { productsStore } from "../../../Redux/Store";
import { productsStore } from "../../../Redux/Store";
// import "./TotalProducts.css";
import "./TotalProducts.css";

interface TotalProductsState {
    count: number;
}

class TotalProducts extends Component<{}, TotalProductsState> {

    private unsubscribeMe: Unsubscribe;

    public componentDidMount() {
        this.unsubscribeMe = productsStore.subscribe(() => {
            const count = productsStore.getState().products.length;
            this.setState({ count }); 
        });
    }

    public render(): JSX.Element {
        return (
            <div className="TotalProducts">
                {this.state?.count && <span>Total Products: {this.state?.count}</span>}
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

}

export default TotalProducts;
