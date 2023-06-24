const express = require('express')
const app = express()
const port = 3000
const bodyPasrer = require('body-parser')
const db = require('./connection')
const verifyToken = require('./verifyToken')

app.use(bodyPasrer.json())

app.use(verifyToken);

const mahasiswaRouter = require('./routes/mahasiswa');
app.use('/mahasiswa', mahasiswaRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const dosenRouter = require('./routes/dosen');
app.use('/dosen', dosenRouter);

const kelasRouter = require('./routes/kelas');
app.use('/kelas', kelasRouter);

const kartuKelasRouter = require('./routes/kartuKelas');
app.use('/kartu_kelas', kartuKelasRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})