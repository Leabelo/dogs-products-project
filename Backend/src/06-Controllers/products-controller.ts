import {log} from "console";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import verifyAdmin from "../02-Middleware/verify-admin";
import verifyToken from "../02-Middleware/verify-token";
import ProductModel from "../03-Models/product-model";
import logic from "../05-BLL/product-logic";

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProducts();
        response.json(products);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await logic.getOneProduct(id);
        response.json(product);
    }
    catch(err: any) {
        next(err);
    }
});

// POST
router.post("/",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // console.log(request.body)
        // request.body doesn't contain files.
        request.body.image = request.files?.image; // "image" is the parameter name sent from Frontend
        // console.log(request.body.image)
        const product = new ProductModel(request.body);
        
        
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

// PUT
router.put("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.productId = id;
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updateFullProduct(product);
        response.json(updatedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

router.patch("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
// router.patch("/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // console.log( request.body)
        const id = +request.params.id;
        request.body.productId = id;
        request.body.image = request.files?.image;        
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updatePartialProduct(product);
        response.json(updatedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

// // DELETE
router.delete("/:id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteProduct(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "Assets", "Images", "products", imageName);
        console.log(absolutePath);
        
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;