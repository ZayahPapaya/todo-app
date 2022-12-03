const { request } = require("http");
const User = require("./model");

class Collection {
  constructor(model, app, routeName) {
    this.model = model;
    this.routeModel(app, routeName);
  }

  async create(req, res) {
    this.signup(req, res);
    console.log(`Requester: ${req.user}`);
    if (req.user.create) {
      try {
        res.status(201).send(
          await this.model.build(
            await this.model.findOne({ where: { email } })
              .posts.push(req.body))
            .save());
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  async read(req, res) {
    this.signup(req, res);
    console.log(req)
    if (!req.user.read) res.status(403).send('Unauthorized action');
    try {
      if (req.user.readOthers) {
        res.status(200).send(await this.model.findAll());
      } else {
        let records = null;
        const email = req.user.email;
        email ? records = await this.model.findOne({ where: { email } }) : records = await this.model.findAll({ where: { email } });
      }
      res.status(200).send(records);
    } catch (error) {
      res.status(500).send(error);
    }
  }
/////////////////////////////////////////
// TODO: Update && Delete
  async update(req, res) {
    this.signup(req, res);
    if (req.user?.role === 'admin' || req.user?.role === 'editor') {
      const id = req.params.id;
      try {
        if (!id) throw new Error('No target ID');
        res.status(200).send(await this.model.update(req.body, { where: { id } }));
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  async delete(req, res) {
    this.signup(req, res);
    if (req.user?.delete) {
      const id = req.body;
      try {
        if (!id) throw new Error('No target ID');
        await this.model.destroy({ where: { id } });
        res.status(200).send('destroyed');
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(403).send('Unauthorized action');
    }
  }

  async signup(req, res) {
    const account = await User.findOne({ email: request.user.email });
    if(!account) {
      await new User({ email: req.user.email, create: true, read: true, update: true, delete: true, readOthers: true, updateOthers: true, deleteOthers: true, posts: []}).save();
    }
  }

  routeModel = (app, routeName) => {
    app.get(`/${routeName}`, (req, res) => this.read(req, res));
    app.post(`/${routeName}`, (req, res) => this.create(req, res));
    app.get(`/${routeName}/:id`, (req, res) => this.read(req, res));
    app.put(`/${routeName}/:id`, (req, res) => this.update(req, res));
    app.delete(`/${routeName}/:id`, (req, res) => this.delete(req, res));
  };
}
module.exports = Collection;