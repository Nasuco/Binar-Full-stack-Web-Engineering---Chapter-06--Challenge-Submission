/**
 * @file contains entry point of controllers api module
 * @author Kelompok5
 */

const carsRepository = require("../repositories/cars");

module.exports = {
    create(requestBody) {
        return carsRepository.create(requestBody);
      },
    
      update(id, requestBody) {
        return carsRepository.update(id, requestBody);
      },
    
      delete(id) {
        return carsRepository.delete(id);
      },
    
      async list() {
        try {
          const cars = await carsRepository.findAll();
          return {
            data: cars,
          };
        } catch (err) {
          throw err;
        }
      },
    
      get(id) {
        return carsRepository.find(id);
      },
    
}