import express, { NextFunction, Request, Response } from "express";
import path from "path";
import verifyAdmin from "../02-Middleware/verify-admin";
import verifyToken from "../02-Middleware/verify-token";
import FollowProductModel from "../03-Models/follow-product-model";
import logic from "../05-BLL/follow-product-logic";

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const followProducts = await logic.getAllFollowedProducts();
        response.json(followProducts);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const followProduct = await logic.getUserAllFollowedProduct(id);
        response.json(followProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// POST
router.post("/", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const info = request.body;
        const followProduct = new FollowProductModel(request.body);
        const addedFollow = await logic.followProduct(followProduct);
        response.status(201).json(addedFollow);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE
router.delete("/:userId/:productId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const userId = +request.params.userId;
        const productId = +request.params.productId;
        await logic.deleteFollowedProduct(+userId, +productId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;