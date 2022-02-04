const express = require('express');
const cors = require('cors');
const routes = require('./routes');

class App {
  constructor() {
    // create a atribute
    this.app = express();
    this.middlewares();
    this.routes();
  }


  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static('./tmp'));
    // this.app.use('/tmp/uploads', express.static('images'));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, res, next) => {
      // the origins that's allow *=all
      res.header('Access-Controll-Allow-Origin', '*');
      res.header('Access-Controll-Allow-Methods', 'Get, POST, PUT, DELETE');
      res.header('Access-Controll-Allow-Headers', 'Access, Content-type, Authorization, Accept, Origin, X-Requested-With');
      this.app.use(cors());

      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;