/**
 * @file contains entry point of controllers api v1 module
 * @author Kelompok5
 */

const userService = require("../../../services/users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const SALT = 10;

function encryptPassword(userPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(userPassword, SALT, (err, password) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(password);
    });
  });
}

function checkPassword(password, userPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, password, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
  async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password);
    const role = "member";
    const user = await userService.create({
      name,
      email,
      password,
      role
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async login(req, res) {
    console.log(req.body.email)
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await userService.findOne({
      where: {
        email
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Sorry, email not found!"
      });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      user.password,
      password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Wrong Password!"
      });
      return;
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },

  async whoAmI(req, res) {
    res.status(200).json(req.user);
  },

  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      console.log(token)
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );
      req.user = await userService.findByPk(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async isAdminOrSuperAdmin(req, res, next) {
    if (!(req.user.role === "superadmin" || req.user.role === "admin")) {
      res.json({
        message: "You are not superadmin or admin, therefore you're not allowed to continue"
      });
      return;
    }
    next();
  },

  async isSuperAdmin(req, res, next) {
    if (!(req.user.role === "superadmin")) {
      res.json({
        message: "You're not superadmin, therefore you're not allowed to change anything",
      });
      return;
    }
    next();
  },

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({
        status: "Success",
        data: {
          users
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
      const users = await userService.create(req.body);
      res.status(201).json({
        status: "Data have created successfully",
        data: {
          users
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
      const email = req.body.email;
      const password = await encryptPassword(req.body.password);
      const role = req.body.role;
      const users = await userService.update(req.params.id, {
        name,
        email,
        password,
        role
      });
      res.status(200).json({
        status: "the update was successful"
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
      const users = await userService.findByPk(req.params.id);
      res.status(200).json({
        status: "OK",
        data: {
          users
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
      const users = await userService.delete(req.params.id);
      res.status(200).json({
        status: "Data have deleted successfully",
        data: {
          users
        }
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        errors: [err.message]
      })
    }
  },

}