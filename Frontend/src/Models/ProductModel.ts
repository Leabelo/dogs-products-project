class ProductModel {
    public productId: number;
    public name: string;
    public description: string;
    public priceRange: string;
    public imageName: string;
    public image: FileList; // Frontend uploads an image to Backend
    public followers?: number // calculating and sending followers to the front end
    public followedByUser?: boolean; // calculated in Home component and being send to card
    assigned: any;


}


export default ProductModel;
