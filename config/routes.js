const express = require("express");
const controllers = require("../app/controllers");
const cors = require("cors")

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

// configure and initialization swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));
apiRouter.use(cors())

/**
 * TODO: Roles API
 *       implementations
 */
// Register Members
apiRouter.post("/api/v1/users/register", controllers.api.v1.users.register);

// Login as superadmin, admin, and members
apiRouter.post("/api/v1/users/login", controllers.api.v1.users.login);

// Update by superadmin only
apiRouter.put(
  "/api/v1/users/:id",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.isSuperAdmin,
  controllers.api.v1.users.update
);

// Delete Users
apiRouter.delete("/api/v1/users/:id", 
controllers.api.v1.users.authorize,
controllers.api.v1.users.isSuperAdmin,
controllers.api.v1.users.destroy);

// Authorize Users
apiRouter.get(
  "/api/v1/users/whoami",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.whoAmI
);

// Get All Users
apiRouter.get("/api/v1/users", controllers.api.v1.users.getUsers);

// Create Cars
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.isAdminOrSuperAdmin,
  controllers.api.v1.cars.create
);

// Update Cars
apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.isAdminOrSuperAdmin,
  controllers.api.v1.cars.update
);

// Show Cars By ID
apiRouter.get(
  "/api/v1/cars/:id",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.isAdminOrSuperAdmin,
  controllers.api.v1.cars.show
);

// Delete Cars
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.users.authorize,
  controllers.api.v1.users.isAdminOrSuperAdmin,
  controllers.api.v1.cars.destroy
);

// Show All Cars List
apiRouter.get("/api/v1/cars", controllers.api.v1.cars.list);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;