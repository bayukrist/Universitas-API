const express = require('express');
const router = express.Router();

const db = require('../connection');
const response = require('../template/response')

router.get('/', (req, res) => {
    const sql = 'Select * from tbl_mahasiswa';
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success get all data from tbl_mahasiswa', res)
    });
  })
  
  router.get('/:nim', (req, res) => {
    const sql = 'Select * from tbl_mahasiswa where nim ='+req.params.nim;
    db.query(sql, (error, result) => {
      if(error) throw error
      response(200, result, 'Success find data from tbl_mahasiswa by nim', res)
    });
  })
  
  router.post('/', (req, res) => {
    const{
      nim,
      nama,
      alamat,
      jenisKelamin,
      tanggalLahir,
      tahunMasuk,
      tahunLulus,
      tempatLahir,
      progdi,
      fakultas
    } = req.body
    const sql = "Insert into tbl_mahasiswa (nim,nama,alamat,jenis_kelamin,tanggal_lahir,tahun_masuk,tahun_lulus,tempat_lahir,progdi,fakultas) values ('"+nim+"','"+nama+"','"+alamat+"','"+jenisKelamin+"','"+tanggalLahir+"','"+tahunMasuk+"','"+tahunLulus+"','"+tempatLahir+"','"+progdi+"','"+fakultas+"')";
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error insert data to tbl_mahasiswa", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          id: result.insertId
        }
        response(200, data, 'Success insert data to tbl_mahasiswa', res)
      }
    });
  })
  
  router.put('/', (req, res) => {
    const{
      nim,
      nama,
      alamat,
      jenisKelamin,
      tanggalLahir,
      tahunMasuk,
      tahunLulus,
      tempatLahir,
      progdi,
      fakultas
    } = req.body
    const sql = "Update tbl_mahasiswa set nama='"+nama+"', alamat='"+alamat+"', jenis_kelamin='"+jenisKelamin+"', tanggal_lahir='"+tanggalLahir+
    "', tahun_masuk='"+tahunMasuk+"', tahun_lulus='"+tahunLulus+"', tempat_lahir='"+tempatLahir+"', progdi='"+progdi+
    "', fakultas='"+fakultas+"' where nim="+nim;
    db.query(sql, (error, result) => {
      if(error) response(500, error.sqlMessage, "Error update data mahasiswa by nim", res)
      if(result?.affectedRows){
        const data = {
          isSuccess: result.affectedRows,
          message: result.message
        }
        response(200, data, 'Success update data mahasiswa by nim', res)
      }else{
        response(500, "User not found", "Error update data mahasiswa by nim", res)
      }
    });
  })
  
  router.delete('/', (req, res) => {
    const{
      nim
    } = req.body
    const sql = "Delete from tbl_mahasiswa where nim="+nim;
    db.query(sql, (error, result) => {
      if(error) response(500, "Invalid", "Error delete data mahasiswa by nim", res)
      if(result?.affectedRows){
        const data = {
          isDeleted: result.affectedRows
        }
        response(200, data, 'Success delete data mahasiswa by nim', res)
      }else{
        response(500, "User not found", "Error delete data mahasiswa by nim", res)
      }
    });
  })

module.exports = router;