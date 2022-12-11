import Joi from "joi";

class FollowProductModel {
 
    public userId : number;
    public productId: number;
 
    public constructor(followProduct: FollowProductModel) {
        this.userId = followProduct.userId;
        this.productId = followProduct.productId;
    }

     // Post Validation Schema
     private static postValidationSchema = Joi.object({
        
        userId: Joi.number().required().positive().integer(),
        productId: Joi.number().required().positive().integer()
       

    });

    // Put Validation Schema
    private static putValidationSchema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        productId: Joi.number().required().positive().integer()
       

    });

     // Patch Validation Schema
     private static patchValidationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        productId: Joi.number().optional().positive().integer()
       

    });


    //Validate Post;
    public validatePost() {
        //Validate:
        const result = FollowProductModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors
        // const result = FollowProductModel.postValidationSchema.validate(this);

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Put;
    public validatePut() {
        //Validate:
        const result = FollowProductModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }

    //Validate Patch;
    public validatePatch() {
        //Validate:
        const result = FollowProductModel.postValidationSchema.validate(this,{abortEarly:false});//abortEarly --> stop after checking all errors

        //Return error message if exists, or undefined if no errors:
        return result.error?.message;
    }
 
}

export default FollowProductModel;