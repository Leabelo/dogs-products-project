import { v4 as uuid } from "uuid";
import safeDelete from "../01-Utils/safe-delete";
import ClientError from "../03-Models/client-error";
import { OkPacket } from "mysql";
import ProductModel from "../03-Models/product-model";
import dal from "../04-DAL/dal";
import socketLogic from "./product-socket-logic";
import moment from "moment";
import config from "../01-Utils/config";

async function getAllProducts(): Promise<ProductModel[]> {

    const sql = `SELECT v.* ,count(f.productId) as followers 
                FROM products as V
                LEFT join followedproducts as F
                ON V.productId=F.productId
                GROUP by V.productId `;
    const products = await dal.execute(sql);
    socketLogic.emitAddFollowedProduct(products);
    socketLogic.emitUpdateFollowedProduct(products);

    return products;
}

async function getOneProduct(id: number): Promise<ProductModel> {

    const sql = `SELECT v.* ,count(f.productId) as followers 
    FROM products as V LEFT join followedproducts as F ON V.productId=F.productId
     where V.productId= ${+id} GROUP by V.productId;`;


    const products = await dal.execute(sql);
    const product = products[0];
    if (!product) {
        throw new ClientError(404, `productId ${product.productId} not found`);
    }
    return product;
}

async function addProduct(product: ProductModel): Promise<ProductModel> {

    const errors = product.validatePost();
    if (errors) {
        throw new ClientError(400, errors);
    }
    // console.log(product);


    // 1. Take the original extension (tiff, jpg, jpeg, gif, png, bmp, ....... ): 
    const extension = product.image.name.substr(product.image.name.lastIndexOf(".")); // ".jpg" / ".png" / ".gif"

    // 2. Create uuid file name including the original extension: 
    product.imageName = uuid() + extension;

    // 3. Save the image to the disk:
    // await product.image.mv(config.imagePath + "/products/" + product.imageName);
    await product.image.mv(config.imagePath + "/products/" + product.imageName);


    // 4. Delete the image from the model so it won't get back to user:
    delete product.image;

    const sql = `INSERT INTO Products(name, description,priceRange, imageName)
                 VALUES("${product.name}", "${product.description}","${product.priceRange}", "${product.imageName}")`;
    console.log(sql);

    const info: OkPacket = await dal.execute(sql);
    product.productId = info.insertId;

    // Socket.io:
    socketLogic.emitAddProduct(product);

    return product;
}

async function updateFullProduct(product: ProductModel): Promise<ProductModel> {

    // 1. Set image name:
    const products = await getOneProduct(+product.productId);
    if (products.productId === -1) {
        throw new ClientError(404, `productId ${products.productId} not found`);
    }
    product.imageName = products.imageName;

    // 2. If we have an image to update: 
    if (product.image) {

        // 3. Delete prev image from disk:
        safeDelete(config.imagePath + "/products/" + product.imageName);

        // 4. Take the original extension (tiff, jpg, jpeg, gif, png, bmp, ....... ): 
        const extension = product.image.name.substr(product.image.name.lastIndexOf(".")); // ".jpg" / ".png" / ".gif"

        // 5. Create uuid file name including the original extension: 
        product.imageName = uuid() + extension;

        // 6. Save the image to the disk:
        await product.image.mv(config.imagePath + "/products/" + product.imageName);

        // 7. Delete the image from the model so it won't get back to user:
        delete product.image;
    }

    const sql = `UPDATE Products SET
    name = "${product.name}",
    description = "${product.description}",
    priceRange = "${product.priceRange}",
    ImageName = "${product.imageName}" WHERE ProductId = "${+product.productId}"`;


        console.log (sql);

    const info: OkPacket = await dal.execute(sql);

    // Socket.io:
    socketLogic.emitUpdateProduct(product);

    return product;
}

async function updatePartialProduct(product: ProductModel): Promise<ProductModel> {


    // Get existing database product:
    const dbProduct = await getOneProduct(product.productId);
    if (!dbProduct) {
        throw new ClientError(404, `productId ${dbProduct.productId} not found`);
    }

    // Update it only with the given values from frontend:
    for (const prop in product) {

        if (Boolean(product[prop]) !== false) {

            dbProduct[prop] = product[prop];
        }

    }

    // Update to database:
    product = await updateFullProduct(dbProduct);

    // Socket.io:
    socketLogic.emitUpdateProduct(product);
    // socketLogic.emitUpdateFollowedProduct(product);

    // Return updated product:
    return product;
}

async function deleteProduct(id: number): Promise<ProductModel> {
    const product = await getOneProduct(+id);
    if (product.productId === -1) {
        throw new ClientError(404, `productId ${id} not found`);
    }
    const sql = "DELETE FROM Products WHERE ProductId = " + id;
    const info: OkPacket = await dal.execute(sql);
    // 1. Delete prev image from disk:
    safeDelete(config.imagePath + "/products/" + product.imageName);


    // Socket.io:
    socketLogic.emitDeleteProduct(id);
    return product;
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateFullProduct,
    updatePartialProduct,
    deleteProduct
};
