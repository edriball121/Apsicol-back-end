//llamar a la dependencia de faker
const { faker } = require('@faker-js/faker');
//llamar la libreria boom
const boom = require('@hapi/boom');

class productsService {

  constructor() {
    this.products = [];
    this.generateProducts();
  }

  //crear producto
  async createProduct(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      //solicitar los demas datos
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  //Genera N productos con data falsa
  async generateProducts() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  //buscar los productos creados
  findProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  //buscar un producto por su id
  async findProduct(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('No se encontro el producto');
    }
    if (product.isBlock) {
      throw boom.conflict('El producto esta bloqueado');
    }
    return product;
  }

  //actualizar un producto
  async updateProduct(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const products = this.products[index]
    this.products[index] = {
      ...products,
      ...changes
    };
    return this.products[index];
  }

  //eliminar un producto
  async deleteProduct(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}
module.exports = productsService;
