import { v4 as uuid } from "uuid";
import ClientError from "../03-Models/client-error";
import { OkPacket } from "mysql";
import FollowProductModel from "../03-Models/follow-product-model";
import productLogic from "../05-BLL/product-logic";
import dal from "../04-DAL/dal";
import socketLogic from "./product-socket-logic";
import ProductModel from "../03-Models/product-model";

async function followProduct(followedProduct: FollowProductModel): Promise<FollowProductModel[]> {
    let followedProducts;
    followedProducts = await getAllFollowedProducts();
    const followProduct = followedProducts.find(product => +product.userId === +followedProduct.userId && +product.productId === +followedProduct.productId);
    if (followProduct) { // if the user already follows the product
        throw new ClientError(400, "You already follow this product");
    };

    const sql = `INSERT INTO followedProducts (userId,productId)
    VALUES( ${+followedProduct.userId} , ${+followedProduct.productId})`;
    const userFollowedProducts = await dal.execute(sql);
    const info: OkPacket = userFollowedProducts;

    // userFollowedProducts.userId = followedProduct.userId;
    userFollowedProducts.userId = followedProduct.userId;
    userFollowedProducts.productId = followedProduct.productId;
    //    const products:ProductModel[] =await getAllProducts();
    const product: ProductModel = await productLogic.getOneProduct(+followedProduct.productId);

    // Socket.io:
    socketLogic.emitAddFollowedProduct(product);

    return userFollowedProducts;
}

async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT v.* ,count(f.productId) as followers 
    FROM products as V
    LEFT join followedProducts as F
    ON V.productId=F.productId
    GROUP by V.productId `;
    const products = await dal.execute(sql);
    return products;
}

async function getUserAllFollowedProduct(userId: number): Promise<FollowProductModel[]> {

    const sql = `SELECT * FROM followedProducts WHERE userId = ${+userId}`;
    const followedProducts = await dal.execute(sql);
    return followedProducts;
}
async function getAllFollowedProducts(): Promise<FollowProductModel> {

    const sql = 'SELECT * FROM `followedProducts`';
    const followedProducts = await dal.execute(sql);
    return followedProducts;
}

async function deleteFollowedProduct(userId: number, productId: number): Promise<void> {

    const sql = `DELETE FROM followedProducts WHERE userID = ${+userId} and productID = ${+productId}`
    const info: OkPacket = await dal.execute(sql);
    const product: ProductModel = await productLogic.getOneProduct(productId);

    // Socket.io:
    socketLogic.emitDeleteFollowedProduct(product);

}

export default {
    followProduct,
    getUserAllFollowedProduct,
    getAllFollowedProducts,
    deleteFollowedProduct
};

