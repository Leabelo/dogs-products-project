import { UploadedFile } from "express-fileupload";
import Joi from "joi";


class ProductModel {
    public productId: number;
    public name: string;
    public description: string;
    public priceRange: string;
    public imageName: string;
    public image: UploadedFile; // Frontend uploads an image to Backend
    // public price: number;
    // public followers?: number // calculating and sending followers to the front end
    // price: any;

    public constructor(product: ProductModel) {
        this.productId = product.productId;
        this.name = product.name;
        this.description = product.description;
        this.priceRange = product.priceRange;
        this.imageName = product.imageName;
        this.image = product.image;
        // this.price = product.price;
    }

    // Post Validation Schema
    private static postValidationSchema = Joi.object({
        productId: Joi.forbidden(),
        name: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(2000),
        priceRange: Joi.string().required().min(2).max(2000),
        imageName: Joi.forbidden(),
        image: Joi.object().required(),
        // price: Joi.number().optional().positive().min(0).max(100000)

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        productId: Joi.forbidden(),
        name: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(20000),
        priceRange: Joi.string().required().min(2).max(100),
        imageName: Joi.forbidden(),
        image: Joi.object().required(),
        // price: Joi.number().required().positive().min(0).max(100000)

    });

    // Patch Validation Schema
    private static patchValidationSchema = Joi.object({
        productId: Joi.required(),
        name: Joi.string().optional().min(2).max(100),
        description: Joi.string().optional().min(2).max(2000),
        priceRange: Joi.string().required().min(2).max(100),
        imageName: Joi.forbidden(),
        image: Joi.object().optional(),
        // fromDate: Joi.date().optional().greater(Date.now() + 1 * 60 * 60 * 1000),
        // toDate: Joi.date().optional().greater(Date.now() + 24 * 60 * 60 * 1000 && Joi.ref('fromDate')),
        // price: Joi.number().optional().positive().min(0).max(100000)

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = ProductModel.postValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate put;
    public validatePut() {
        //Validate:
        const result = ProductModel.putValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate patch;
    public validatePatch() {
        //Validate:
        const result = ProductModel.patchValidationSchema.validate(this, { abortEarly: false });//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

}

export default ProductModel;
