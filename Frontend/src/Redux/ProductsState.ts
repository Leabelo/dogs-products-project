import ProductModel from "../Models/ProductModel";

// Products AppState - The application level data:
export class ProductsState {
    public products: ProductModel[] = [];
}

// Products ActionType - Which actions we can perform on the data:

export enum ProductsActionType {
    FetchProducts = "FetchProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    UpdatePartialProduct = "UpdatePartialProduct",
    DeleteProduct = "DeleteProduct"
    // ...
    ,
    emptyProductsOnLogout = "emptyProductsOnLogout"
}

// Products Action - A single object containing data to perform for a single ActionType
export interface ProductsAction {
    type: ProductsActionType; // The action type
    payload: any; // The action data
}

// Products Action Creators - functions for creating action object for sending to dispatch
export function fetchProductsAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.FetchProducts, payload: products };
}
export function addProductAction(productToAdd: ProductModel): ProductsAction {
    return { type: ProductsActionType.AddProduct, payload: productToAdd };
}
export function updateProductAction(productToUpdate: ProductModel): ProductsAction {
    return { type: ProductsActionType.UpdateProduct, payload: productToUpdate };
}
export function updatePartialProductAction(productToUpdate: ProductModel): ProductsAction {
    return { type: ProductsActionType.UpdatePartialProduct, payload: productToUpdate };
}
export function deleteProductAction(idToDelete: number): ProductsAction {
    return { type: ProductsActionType.DeleteProduct, payload: idToDelete };
}
export function emptyProductsStore(): ProductsAction {
    return { type: ProductsActionType.emptyProductsOnLogout, payload: null };
}

// Products Reducer - the function actually performing the operations: 
export function productsReducer(currentProductsState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState {

    // Duplicate the current products state int a new one:
    const newProductsState = { ...currentProductsState };

    switch (action.type) {

        case ProductsActionType.FetchProducts: // Here action.payload is products array downloaded from the server
            newProductsState.products = action.payload;
            break;

        case ProductsActionType.AddProduct: // Here action.payload is a single product to add
            newProductsState.products.push(action.payload);
            break;

        case ProductsActionType.UpdateProduct: // Here action.payload is a single product to update
            const indexToUpdate = newProductsState.products.findIndex(p => p.productId === action.payload.productId);
            newProductsState.products[indexToUpdate] = action.payload;
            break;
        
        case ProductsActionType.UpdatePartialProduct: // Here action.payload is a single product to update
            const indexPartialToUpdate = newProductsState.products.findIndex(p => p.productId === action.payload.productId);
            newProductsState.products[indexPartialToUpdate] = action.payload;
            break;

        case ProductsActionType.DeleteProduct: // Here action.payload is the id of the product to delete
            const indexToDelete = newProductsState.products.findIndex(p => p.productId === action.payload);
            newProductsState.products.splice(indexToDelete, 1); // 1 = delete only one item
            break;
        // for logout and re-login with a different user purposes
        case ProductsActionType.emptyProductsOnLogout: {
            newProductsState.products = [];
            break;
        }
    }

    return newProductsState;
}