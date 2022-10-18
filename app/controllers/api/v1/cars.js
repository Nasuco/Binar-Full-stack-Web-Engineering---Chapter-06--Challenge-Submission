/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const carsService = require("../../../services/cars");

module.exports = {
  async list(req, res) {
    postService
      try {
        const cars = await carsService.list();
        res.status(200).json({
          status: "Success",
          data: {
            cars
          }
        })
      } catch (err) {
        res.status(400).json({
          status: "Failed",
          message: [err.message]
        })
      }
  },

  async create(req, res) {
    try {
      const cars = await carsService.create(req.body);
      console.log(req.body)
      res.status(201).json({
        status: "Data have created successfully",
        data: {
          cars
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: [err.message]
      })
    }
  },

  async update(req, res) {
    try {
      const cars = await carsService.update(req.params.id, req.body);
      res.status(200).json({
        status: "Data have updated successfully",
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: [err.message]
      })
    }
  },

  async show(req, res) {
    try {
      const cars = await carsService.show(req.params.id);
      res.status(200).json({
        status: "OK",
        data: {
          cars
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: [err.message]
      })
    }
  },

  async destroy(req, res) {
    try {
      const cars = await carsService.delete(req.params.id);
      res.status(200).json({
        status: "Data have deleted successfully",
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: [err.message]
      })
    }
  },
};
