class Product {
    constructor(product) {
        if (product.price < 0) {
            throw new Error("Incorrect price");
        }

        this.name =  product.name;
        this.id = product.id;
        this.price = product.price ?? 0;
        this.category = product.category ?? 'default';
    }

    get getName() {
        return this.name;
    }

    get getId() {
        return this.id;
    }

    get getPrice() {
        return this.price;
    }

    set changePrice(price) {
        this.price = price;
    }

    set changeName(name) {
        this.name = name;
    }
}

class ShoppingCart {
    #products = [];
    #cumultiveDiscount = 1;
    // constructor(name, args = []) {
    constructor (cartInfo) {
        this.name = cartInfo.name;

        if (cartInfo.args.length > 0) {
            for (let product of cartInfo.args) {
                if (this.validateId(product)) {
                    product.count = 1;
                    this.#products.push(product);
                } else {
                    throw new Error("duplicate insertion!use changeCount")
                }

            }

        }

    }

    addProduct(product, count = 1) {
        if (this.validateId(product)) {
            product.count = count;
            this.#products.push(product);
        } else {
            // if(!this.validateId(product)) {
                throw new Error("duplicate insertion!use changeCount");
            // }
            // console.log("Error in adding the product")
        }
    }

    removeProduct(product, count = 1) {
        for (let key of this.#products.keys()) {
            if (this.#products[key].id === product.id) {
                if (this.#products[key].count == count) {
                    this.#products.splice(key, 1);
                    return;
                } else if(this.#products[key].count > count) {
                    this.#products[key].count -= count;
                    return;
                } else {
                    throw new Error("Not enough items of this product in shopping product")
                }
            }



        }
        throw new Error("No such item");

    }

    get getTotal() {
        let total = 0;

        for (let product of this.#products) {
            total += product.count * product.price;
        }

        return this.#cumultiveDiscount * total;
    }

    set cumultiveDiscount(percent) {
        percent /= 100;
        this.#cumultiveDiscount -= percent;
        return true;
    }

    showItems() {
        for (let product of this.#products) {
            console.log(`${product.count} of ${product.name} : ${product.price}\n`)
        }
        return this.#products;

    }

    validateId(product) {
        for (let candidate of this.#products) {
            if(candidate.id == product.id)
                return false;
        }
        return true;
    }

    changeCount (product, count) {
        if (count > 0) {
            for (let item of this.#products) {
                if (item.id === product.id) {
                    item.count = count;
                    return true;
                }

            }

        } else {
        throw new Error("Not acceptable count!");
        }

    }
    clearCart() {
        this.#products.length = 0;
    }
}

let p1 = new Product({name:"t",id:2})
let s1 = new ShoppingCart({name:'e', args:[p1]})
s1.getTotal
// s1.addProduct(p1, 3)


s1.showItems()
s1.getTotal
