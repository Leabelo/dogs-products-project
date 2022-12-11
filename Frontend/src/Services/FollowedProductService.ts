import axios from "axios";
import FollowedProductModel from "../Models/FollowedProductModel";
import { addFollowedProductAction,  deleteFollowedProductAction,  fetchFollowedProductsAction } from "../Redux/FollowedProductsState";
import { followedProductsStore } from "../Redux/Store";
import config from "../Utils/Config";

class FollowedProductsService {
    getFollowedProducts() {
        throw new Error("Method not implemented.");
    }

    public async getAllFollowedProducts(): Promise<FollowedProductModel[]> {
        if (followedProductsStore.getState().followedProducts.length === 0) {
            const response = await axios.get<FollowedProductModel[]>(config.urls.followedProducts);
            const followedProducts = response.data;
            followedProductsStore.dispatch(fetchFollowedProductsAction(followedProducts)); // Send downloaded followedProducts to Redux.
             return followedProducts;
        }
        else {
            const followedProducts = followedProductsStore.getState().followedProducts;
            return followedProducts;
        }
    }
   
    public async getUserFollowedProduct(id: number): Promise<FollowedProductModel[]> {
            const response = await axios.get<FollowedProductModel[]>(config.urls.followedProducts+ `${id}`);
            const followedProducts = response.data;

            return followedProducts; 
    }  

    public async addFollowedProduct(id: number, productId: number): Promise<FollowedProductModel> {
        const myFormData = new FormData();
        myFormData.append("userId", id.toString());
        myFormData.append("productId", productId.toString());
        const response = await axios.post<FollowedProductModel>(config.urls.followedProducts, myFormData); // Must send FormData and not followedProduct
        const addedFollowedProduct = response.data;
        followedProductsStore.dispatch(addFollowedProductAction(addedFollowedProduct));
        return addedFollowedProduct;
    }

    public async deleteFollowedProduct(id: number, productId: number): Promise<void> {
        await axios.delete(config.urls.followedProducts + `${id}/${productId}`);
        followedProductsStore.dispatch(deleteFollowedProductAction(id));
    }

}

// Single object:
const followedProductsService = new FollowedProductsService();
export default followedProductsService;