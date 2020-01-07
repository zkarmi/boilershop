const { db, Customer, Product } = require("./server/db");

const customerData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "ewfr@gmail.com",
    address: "123 e 54th, NY NY 20033",
    imageUrl: ""
  },
  {
    firstName: "Ziv",
    lastName: "K",
    email: "ziv@gmail.com",
    password: "password",
    address: "225 e 54th, NY NY, 10322",
    imageUrl: ""
  },
  {
    firstName: "Roy",
    lastName: "T",
    email: "roy@gmail.com",
    address: "337 e 67th NY NY 10022",
    imageUrl: ""
  }
];

const productData = [
  {
    name: "table",
    imageUrl: "",
    description: "this is a table",
    price: 122,
    quantity: 100
  },
  {
    name: "lamp",
    imageUrl: "",
    description: "this is a lamp",
    price: 65,
    quantity: 33
  }
];

const seed = async () => {
  try {
    await Promise.all(
      customerData.map(customer => {
        return Customer.create(customer);
      })
    );
    await Promise.all(
      productData.map(product => {
        return Product.create(product);
      })
    );
  } catch (error) {
    console.error(error);
  }
};

const init = () => {
  console.log("syncing db");
  db.sync({ force: true })
    .then(() => {
      console.log("seeding db");
      return seed();
    })
    .catch(error => {
      console.log("error while seeding");
      console.log(error.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};
init();
