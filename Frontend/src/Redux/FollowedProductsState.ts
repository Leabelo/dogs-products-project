import FollowedProductModel from "../Models/FollowedProductModel";

// followedProducts AppState - The application level data:
export class followedProductsState {
    public followedProducts: FollowedProductModel[] = [];
}

// followedProducts ActionType - Which actions we can perform on the data:
export enum followedProductsActionType {
    FetchFollowedProducts = "FetchFollowedProducts", // Must be a strings
    AddFollowedProduct = "AddFollowedProduct",
    UpdateFollowedProduct = "UpdateFollowedProduct",
    UpdatePartialFollowedProduct = "UpdatePartialFollowedProduct",
    DeleteFollowedProduct = "DeleteFollowedProduct"
    // ...
}

// followedProducts Action - A single object containing data to perform for a single ActionType
export interface followedProductsAction {
    type: followedProductsActionType; // The action type
    payload: any; // The action data
}

// followedProducts Action Creators - functions for creating action object for sending to dispatch
export function fetchFollowedProductsAction(followedProducts: FollowedProductModel[]): followedProductsAction {
    return { type: followedProductsActionType.FetchFollowedProducts, payload: followedProducts };
}
export function addFollowedProductAction(followedProductToAdd: FollowedProductModel): followedProductsAction {
    return { type: followedProductsActionType.AddFollowedProduct, payload: followedProductToAdd };
}
export function updateFollowedProductAction(followedProductToUpdate: FollowedProductModel): followedProductsAction {
    return { type: followedProductsActionType.UpdateFollowedProduct, payload: followedProductToUpdate };
}
export function updatePartialFollowedProductAction(followedProductToUpdate: FollowedProductModel): followedProductsAction {
    return { type: followedProductsActionType.UpdatePartialFollowedProduct, payload: followedProductToUpdate };
}
export function deleteFollowedProductAction(idToDelete: number): followedProductsAction {
    return { type: followedProductsActionType.DeleteFollowedProduct, payload: idToDelete };
}

// followedProducts Reducer - the function actually performing the operations:
export function followedProductsReducer(currentFollowedProductsState: followedProductsState = new followedProductsState(), action: followedProductsAction): followedProductsState {

    // Duplicate the current followedProducts state int a new one:
    const newFollowedProductsState = { ...currentFollowedProductsState };

    switch (action.type) {

        case followedProductsActionType.FetchFollowedProducts: // Here action.payload is followedProducts array downloaded from the server
            newFollowedProductsState.followedProducts = action.payload;
            break;

        case followedProductsActionType.AddFollowedProduct: // Here action.payload is a single followedProduct to add
            const followedProduct = action.payload;
            if (newFollowedProductsState.followedProducts.find(p => p.userId === followedProduct.id) === undefined) {
                newFollowedProductsState.followedProducts.push(action.payload);
            }
            break;

        case followedProductsActionType.UpdateFollowedProduct: // Here action.payload is a single followedProduct to update
            const indexToUpdate = newFollowedProductsState.followedProducts.findIndex(p => p.userId === action.payload.id);
            newFollowedProductsState.followedProducts[indexToUpdate] = action.payload;
            break;

        case followedProductsActionType.UpdatePartialFollowedProduct: // Here action.payload is a single followedProduct to update
            const indexToPartialUpdate = newFollowedProductsState.followedProducts.findIndex(p => p.userId === action.payload.id);
            newFollowedProductsState.followedProducts[indexToPartialUpdate] = action.payload;
            break;

        case followedProductsActionType.DeleteFollowedProduct: // Here action.payload is the id of the followedProduct to delete
            const indexToDelete = newFollowedProductsState.followedProducts.findIndex(p => p.userId === action.payload);
            if (indexToDelete >= 0) {
                newFollowedProductsState.followedProducts.splice(indexToDelete, 1); // 1 = delete only one item
            }
            break;
    }

    return newFollowedProductsState;
}
