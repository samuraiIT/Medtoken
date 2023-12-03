const contextPath = '/' //import.meta.env.BASE_URL;

export default class ProductService {
    getProductsSmall() {
        return fetch(contextPath + 'data/products-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
