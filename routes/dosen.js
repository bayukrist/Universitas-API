const express = require('express');
const router = express.Router();

const db = require('../connection');
const response = require('../template/response')

router.get('/', (req, res) => {
    const sql = 'Select * from tbl_dosen';
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success get all data from tbl_dosen', res)
    });
  })
  
  router.get('/:nid', (req, res) => {
    const sql = 'Select * from tbl_dosen where nid ='+req.params.nid;
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success find data from tbl_dosen by nid', res)
    });
  })
  
  router.post('/', (req, res) => {
    const{
      nid,
      nama,
      fakultas,
      jenisKelamin
    } = req.body
    const sql = "Insert into tbl_dosen (nid,nama,fakultas,jenis_kelamin) values ('"+nid+"','"+nama+"','"+fakultas+"','"+jenisKelamin+"')";
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error insert data to tbl_dosen", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId
        }
        response(200, data, 'Success insert data to tbl_dosen', res)
      }
    });
  })
  
  router.put('/', (req, res) => {
    const{
      nid,
      nama,
      fakultas,
      jenisKelamin
    } = req.body
    const sql = "Update tbl_dosen set nama='"+nama+"', fakultas='"+fakultas+"', jenis_kelamin='"+jenisKelamin+"' where nid="+nid;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error update data dosen by nid", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          message: result.message
        }
        response(200, data, 'Success update data dosen by nid', res)
      }else{
        response(500, "User not found", "Error update data dosen by nid", res)
      }
    });
  })
  
  router.delete('/', (req, res) => {
    const{
      nid
    } = req.body
    const sql = "Delete from tbl_dosen where nid="+nid;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error delete data dosen by nid", res)
      if(result?.affectedRows){
        const data = {
          isDeleted: result.affectedRows
        }
        response(200, data, 'Success delete data dosen by nid', res)
      }else{
        response(500, "User not found", "Error delete data dosen by nid", res)
      }
    });
  })

module.exports = router;