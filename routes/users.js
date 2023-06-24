const express = require('express');
const router = express.Router();

const db = require('../connection');
const response = require('../template/response');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  const sql = 'Select * from tbl_users';
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, 'Success get all data from tbl_users', res)
  });
})

router.get('/:username', (req, res) => {
  const sql = "Select * from tbl_users where username ='" + req.params.username + "'";
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, 'Success find data from tbl_users by username', res)
  });
})

router.post('/', (req, res) => {
  const {
    username,
    password
  } = req.body

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      const sql = "Insert into tbl_users (username,password) values ('" + username + "','" + hash + "')";
      db.query(sql, (error, result) => {
        if (error) response(500, error.sqlMessage, "Error insert data to tbl_users", res)
        if (result?.affectedRows) {
          const data = {
            isSuccess: result.affectedRows,
            id: result.insertId
          }
          response(200, data, 'Success insert data to tbl_users', res)
        }
      });
    }
  });
})

router.put('/', (req, res) => {
  const {
    username,
    password
  } = req.body
  const sql = "Update tbl_users set password='" + password + "'' where username=" + username;
  db.query(sql, (error, result) => {
    if (error) response(500, error.sqlMessage, "Error update data users", res)
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message
      }
      response(200, data, 'Success update data users', res)
    } else {
      response(500, "User not found", "Error update data users", res)
    }
  });
})

router.delete('/', (req, res) => {
  const {
    username
  } = req.body
  const sql = "Delete from tbl_users where username=" + username;
  db.query(sql, (error, result) => {
    if (error) response(500, error.sqlMessage, "Error delete data users by nim", res)
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows
      }
      response(200, data, 'Success delete data users by nim', res)
    } else {
      response(500, "User not found", "Error delete data users by nim", res)
    }
  });
})

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body

  const sql = "select * from tbl_users where username='" + username + "'";
  db.query(sql, (error, result) => {
    if (error) response(500, error.sqlMessage, "Error get password from tbl_users", res)

    if (result.length === 0) {
      response(403, "Failed Login", "Wrong Username", res)
    } else if (result.length > 0) {
      const usernameFromDB = result[0].username;
      const passwordfromDB = result[0].password;
      const dataUser = {
        id: result[0].id,
        username: usernameFromDB
      }
      bcrypt.compare(password, passwordfromDB, (err, rslt) => {
        if (err) {
          response(500, 'Failed Login', 'Error compare Password', res)
        } else {
          if (rslt === true) {
            const token = jwt.sign(dataUser, 'keyScrttt', { expiresIn: '1h' });
            dataUser.token = token
            response(200, dataUser, 'Success Login', res)
          } else {
            response(403, "Failed Login", "Wrong Password", res)
          }
        }
      });
    }
  });
});

module.exports = router;