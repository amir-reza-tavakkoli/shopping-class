class Product {

    constructor(name, price = 0, id, category = {'name' : 'default'}) {
        this.name = name;
        this.id = id;
        this.price = Number(price);
        this.category = category;
    }

    changePrice(price) {
        this.price = price;
    }

    changeName(name) {
        this.name = name;
    }
}

class Category{

    constructor(name = "default") {
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set name(name) {

        if (name.length < 1) {
            console.log('badInput');
            return;
        }

        this._name = name;
      }
}

class ShoppingCart{
    products = [];
    constructor(name, args = []) {
        this.name = name;

        if (args.length > 0) {

            for (let product of args) {

                if (this.validateId(product)) {
                    product.count = 1;
                    this.products.push(product);
                }
            }
        }
    }

    addProduct(product, count = 1){

        if (product.name.length > 0 && Number(product.price) >= 0 && this.validateId(product)) {
            product.count = count;
            this.products.push(product);
        } else {

            // if(!this.validateId(product)) {
                console.log("Already exist! use changeCount instead");
                return;
            // }
            // console.log("Error in adding the product")
        }
    }

    removeProduct(product, count = 1) {

        for (let key in this.products) {

            if (this.products[key].id === product.id) {

                if (this.products[key].count == count) {
                    this.products.splice(key, 1);
                } else if(this.products[key].count > count) {
                    this.products[key].count -= count;
                } else {
                    console.log("Not enough items of this product in shopping product");
                }
            }
            else {
                console.log("No such item")
            }
        }
    }

    getTotal(){
        let total = 0;

        for (const product of this.products) {
            total += product.count * Number(product.price);
        }

        return total;
    }

    showItems() {

        for (const product of this.products) {
            console.log(`${product.count} of ${product.name} : ${product.price}\n`)
        }
    }

    validateId(product) {
        for (const candidate of this.products) {
            if(candidate.id == product.id)
                return false;
        }
        return true;
    }

    changeCount (product, count) {

        if (count > 0) {

            for (const item of this.products) {

                if (item.id == product.id) {
                    item.count = count;
                }
            }

        }
    }
}

let p1 = new Product('jeans', 150, 1)
let p2 = new Product('shoes', 110, 2)
let p3 = new Product('socks', 40, 2)
let s1 = new ShoppingCart('one', [])
s1.addProduct(p1)
s1.addProduct(p2)
s1.addProduct(p3)
s1.getTotal()
s1.addProduct(p2, 3)


s1.showItems()
s1.getTotal()
