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

  async create(req, res) {
    try {
      const cars = await carService.create(req.body);
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
        errors: [err.message]
      })
    }
  },

  async update(req, res) {
    try {
      const cars = await carService.update(req.params.id, req.body);
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