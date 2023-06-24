const express = require('express');
const router = express.Router();

const db = require('../connection');
const response = require('../template/response')

router.get('/', (req, res) => {
    const sql = 'Select * from tbl_kelas';
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success get all data from tbl_kelas', res)
    });
  })
  
  router.get('/:kode', (req, res) => {
    const sql = 'Select * from tbl_kelas where kode ='+req.params.kode;
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success find data from tbl_kelas by kode', res)
    });
  })
  
  router.post('/', (req, res) => {
    const{
      kode,
      nama,
      nid_dosen,
      kapasitas,
      jumlah_mahasiswa,
      progdi,
      lintas_fakultas,
      jadwal,
      semester,
      fakultas,
      tahun
    } = req.body
    console.log(req.body)
    const sql = "Insert into tbl_kelas (kode,nama,nid_dosen,kapasitas,jumlah_mahasiswa,progdi,fakultas,lintas_fakultas,jadwal,semester,tahun) values ('"+kode+"','"+nama+"',"+nid_dosen+","+kapasitas+","+jumlah_mahasiswa+",'"+progdi+"','"+fakultas+"','"+lintas_fakultas+"','"+jadwal+"',"+semester+","+tahun+")";
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error insert data to tbl_kelas", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId
        }
        response(200, data, 'Success insert data to tbl_kelas', res)
      }
    });
  })
  
  router.put('/', (req, res) => {
    const{
      kode,
      nama,
      nid_dosen,
      kapasitas,
      jumlah_mahasiswa,
      progdi,
      lintas_fakultas,
      jadwal,
      semester,
      fakultas,
      tahun
    } = req.body
    const sql = "Update tbl_kelas set nama='"+nama+"', nid_dosen='"+nid_dosen+"', kapasitas='"+kapasitas+"', jumlah_mahasiswa='"+jumlah_mahasiswa+
    "', progdi='"+progdi+"', lintas_fakultas='"+lintas_fakultas+"', jadwal='"+jadwal+"', semester='"+semester+
    "', fakultas='"+fakultas+"', tahun='"+tahun+"' where kode="+kode;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error update data kelas by kode", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          message: result.message
        }
        response(200, data, 'Success update data kelas by kode', res)
      }else{
        response(500, "User not found", "Error update data kelas by kode", res)
      }
    });
  })
  
  router.delete('/', (req, res) => {
    const{
      kode
    } = req.body
    const sql = "Delete from tbl_kelas where kode="+kode;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error delete data kelas by kode", res)
      if(result?.affectedRows){
        const data = {
          isDeleted: result.affectedRows
        }
        response(200, data, 'Success delete data kelas by kode', res)
      }else{
        response(500, "User not found", "Error delete data kelas by kode", res)
      }
    });
  })

module.exports = router;