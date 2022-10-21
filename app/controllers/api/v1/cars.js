/**
 * @file contains entry point of controllers api v1 module
 * @author Kelompok5
 */

const carService = require("../../../services/cars")

module.exports = {
  async list(req, res) {
    try {
      const cars = await carService.list();
      res.status(200).json({
        status: "Success",
        data: {
          cars
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

  // async create(req, res) {
  //   try {
  //     const cars = await carService.create(req.body);
  //     console.log(req.body)
  //     res.status(201).json({
  //       status: "Data have created successfully",
  //       data: {
  //         cars
  //       }
  //     })
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "Failed",
  //       errors: [err.message]
  //     })
  //   }
  // },

  async create(req, res) {
    try {
      const name = req.body.name;
      const type = req.body.type;
      const size = req.body.size;
      const price = req.body.price;
      const image = req.body.image;
      const created_by = req.user.email;
      const updated_by = req.user.email;
      const cars = await carService.create({
        name,
        type,
        size,
        price,
        image,
        created_by,
        updated_by
      });
      // console.log(req.body)
      res.status(201).json({
        status: "Data have created successfully",
        data: {
          cars
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

  async update(req, res) {
    try {
      const name = req.body.name;
      const type = req.body.type;
      const size = req.body.size;
      const price = req.body.price;
      const image = req.body.image;
      const created_by = req.body.created_by;
      const updated_by = req.user.email;
      const cars = await carService.update(req.params.id, {
        name,
        type,
        size,
        price,
        image,
        created_by,
        updated_by
      });
      res.status(200).json({
        status: "Data have updated successfully",
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

  async show(req, res) {
    try {
      const cars = await carService.get(req.params.id);
      res.status(200).json({
        status: "OK",
        data: {
          cars
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

  async destroy(req, res) {
    try {
      const cars = await carService.delete(req.params.id);
      res.status(200).json({
        status: "Data have deleted successfully",
        // data: {
        //   cars
        // }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

}