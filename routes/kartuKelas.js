const express = require('express');
const router = express.Router();

const db = require('../connection');
const response = require('../template/response')

router.get('/', (req, res) => {
    const sql = 'Select * from tbl_kartu_kelas';
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success get all data from tbl_kartu_kelas', res)
    });
  })
  
  router.get('/:nim', (req, res) => {
    const sql = 'Select * from tbl_kartu_kelas where nim ='+req.params.nim;
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success find data from tbl_kartu_kelas by nim', res)
    });
  })
  
  router.post('/', (req, res) => {
    const{
      nim,
      kode_kelas,
      semester,
      tahun
    } = req.body
    const sql = "Insert into tbl_kartu_kelas (nim,kode_kelas,semester,tahun) values ('"+nim+"','"+kode_kelas+"','"+semester+"','"+tahun+"')";
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error insert data to tbl_kartu_kelas", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId
        }
        response(200, data, 'Success insert data to tbl_kartu_kelas', res)
      }
    });
  })
  
  router.put('/', (req, res) => {
    const{
      nim,
      kode_kelas,
      semester,
      tahun
    } = req.body
    const sql = "Update tbl_kartu_kelas set kode_kelas='"+kode_kelas+"', semester='"+semester+"', tahun='"+tahun+"' where nim="+nim;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error update data kartu_kelas by nim", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          message: result.message
        }
        response(200, data, 'Success update data kartu_kelas by nim', res)
      }else{
        response(500, "User not found", "Error update data kartu_kelas by nim", res)
      }
    });
  })
  
  router.delete('/', (req, res) => {
    const{
      nim
    } = req.body
    const sql = "Delete from tbl_kartu_kelas where nim="+nim;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error delete data kartu_kelas by nim", res)
      if(result?.affectedRows){
        const data = {
          isDeleted: result.affectedRows
        }
        response(200, data, 'Success delete data kartu_kelas by nim', res)
      }else{
        response(500, "User not found", "Error delete data kartu_kelas by nim", res)
      }
    });
  })

module.exports = router;