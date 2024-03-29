const fs = require('fs');
const { get } = require('https');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);

    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
    getProductsFromFile(products => {
       
      //updating the existing product
    if(this.id)
    {
      const existingProductIndex= products.findIndex(prod => prod.id === this.id);
      const updatedProducts=[...products];
      updatedProducts[existingProductIndex]=this;
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });

    }
    else 
    //in case of new products
    {
       // toString() to get a strings of number
    this.id=Math.random().toString();

    products.push(this);
    fs.writeFile(p, JSON.stringify(products), err => {
      console.log(err);
    });
    }
   
    });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findbyid(id,cb)
  {
    getProductsFromFile(products => {
      //finding product as we are reading complete file coz we are not using db
      //p.id is a id of product we are currently looking at
      const product= products.find(p => p.id === id);
      cb(product);
    })
  }


};
