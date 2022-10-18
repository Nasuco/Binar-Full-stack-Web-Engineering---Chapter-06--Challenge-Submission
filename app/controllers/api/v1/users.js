/**
 * @file contains authentication request handler and its business logic
 * @author kelompok5
 */

const userServices = require('../services/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT = 10;
 
 function encryptPassword(password) {
   return new Promise((resolve, reject) => {
     bcrypt.hash(password, SALT, (err, Password) => {
       if (!!err) {
         reject(err);
         return;
       }
 
       resolve(Password);
     });
   });
 }
 
 function checkPassword(Password, password) {
   return new Promise((resolve, reject) => {
     bcrypt.compare(password, Password, (err, isPasswordCorrect) => {
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
     const Password = await encryptPassword(req.body.password);
     const role = req.body.role;
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
     })
 
     if (!user) {
       res.status(404).json({ message: "Email tidak ditemukan" });
       return;
     }
 
     const isPasswordCorrect = await checkPassword(
       user.Password,
       password
     );
 
     if (!isPasswordCorrect) {
       res.status(401).json({ message: "Password salah!" });
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
       res.status(401).json({ message: "Unauthorized" });
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
         message: "You are not superadmin, therefore you're not allowed to continue"
       });
       return;
     }
     next();
   },
 
   async getUsers(req, res) {
     try {
       const users = await userServices.getUsers();
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
       const users = await userServices.create(req.body);
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
       const users = await userServices.update(req.params.id, req.body);
       res.status(200).json({
         status: "Successfully updated member to admin",
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
 
   async show(req, res) {
     try {
       const users = await userServices.findByPk(req.params.id);
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
 
   async destroy(req, res) {
     try {
       const users = await userServices.delete(req.params.id);
       res.status(200).json({
         status: "Successfully deleted user",
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
};
 