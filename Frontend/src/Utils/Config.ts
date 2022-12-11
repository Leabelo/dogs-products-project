abstract class Config {
    public urls = {
        products: "",
        productImages: "",
        productsDelayed: "",
        register: "",
        login: "",
        socketServer: "",
        followedProducts:"",


    }

    public constructor(baseUrl: string) {
        this.urls = {
            followedProducts: baseUrl + "products/follow/",
            products: baseUrl + "products/",
            productImages: baseUrl + "products/images/",
            productsDelayed: baseUrl + "products/delayed/",
            register: baseUrl + "auth/register/",
            login: baseUrl + "auth/login/",
            socketServer: "http://localhost:3001"
        };
    }
    public loginPath: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
        this.loginPath = "http://localhost:3000/login";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("https://follow-flights-react-practice.herokuapp.com/api/");
        this.loginPath = "https://follow-flights-react-practice.herokuapp.com/login";
        this.urls.socketServer = "https://follow-flights-react-practice.herokuapp.com" // for heroku purposes


    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
