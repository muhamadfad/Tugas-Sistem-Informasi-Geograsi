const express = require('express');
const router = express.Router();
const Masjid = require('../models/masjidModel');
const pool = require('../db_masjid');
const bcrypt = require('bcrypt');
const User = require('../models/user/authModel');
const getMasjid = require('../models/masjidModel');
const masjidModel = require('../models/masjidModel');
const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);
    try {
        const user = await User.CheckAccount(username, password);

        if (user) {
            req.session.user = user;
            req.session.lastAccess = new Date().getTime();
            console.log('Login successful for user:', user);
            return res.redirect('/');
        } else {
            console.log('Login failed: No user returned');
            return res.redirect('/login');
        }
    } catch (error) {
        if (error.isEmptyResult) {
            console.log('Login failed: Invalid username or password');
            return res.redirect('/login');
        } else {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login');
  });
});

router.use('/', checkAuth);

router.get('/', async (req, res) => {
    const rows = await masjidModel.getAllData() || [];
    res.render('index', { masjid: rows });
});
router.get('/profil', async (req, res) => {
    try {
        var pesan = '';
          var alert = '';
          if (req.query.berhasil) {
               pesan = req.query.berhasil;
               alert = {
                    status: 'berhasil',
                    pesan
               }
          }
          if (req.query.gagal) {
               pesan = req.query.gagal; 
                alert = {
                    status: 'gagal',
                    pesan
               }  
          }
    const rows = await User.getData(1);
    res.render('profil', { rows,alert });
    } catch (error) {
        console.error("Error in route handler:", error);
        res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
    }
});
router.post('/profil/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const { username,password } = req.body;
        updateData = await User.UpdateData(username, password, id)
        if (updateData) {
            res.redirect(`/profil?berhasil=Data Berhasil Di Update!`);
        }
        else {
            res.redirect(`/profil?gagal=Data Gagal Di Update!`);
        }
    } catch (error) {
        console.error("Error in route handler:", error);
        res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
    }
});


router.get('/tambah-lokasi', async (req, res) => {
    const rows = await masjidModel.getAllData() || [];
    res.render('tambah_mesjid', { masjid: rows });
});


router.get('/data-maps', async (req, res) => {
    try {
        var pesan = '';
          var alert = '';
          if (req.query.berhasil) {
               pesan = req.query.berhasil;
               alert = {
                    status: 'berhasil',
                    pesan
               }
          }
          if (req.query.gagal) {
               pesan = req.query.gagal; 
                alert = {
                    status: 'gagal',
                    pesan
               }  
          }
        const rows = await masjidModel.getAllData() || [];
        res.render('data-maps', {rows,alert})
    } catch (error) {
        console.error("Error in route handler:", error);
        res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
    }
})

router.get('/edit-lokasi/:id', async (req, res) => {
    try {
      var pesan = '';
          var alert = '';
          if (req.query.berhasil) {
               pesan = req.query.berhasil;
               alert = {
                    status: 'berhasil',
                    pesan
               }
          }
          if (req.query.gagal) {
               pesan = req.query.gagal; 
                alert = {
                    status: 'gagal',
                    pesan
               }  
          }
    const id = req.params.id;
    const masjid = await masjidModel.getDetails(id);
      res.render('edit_masjid', { masjid,alert });
      
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
  }
});

router.post('/edit-lokasi/:id', async (req, res) => {
  try {
    
      const id = req.params.id;
      const { name, lat, lng } = req.body;
      console.log(name, lat, lng);
        const masjid = await masjidModel.UpdateMesjid(name,lat,lng,id);
      if (masjid) {
            res.redirect(`/edit-lokasi/${id}?berhasil=Data Berhasil Di Update!`);
        }
        else {
            res.redirect(`/edit-lokasi/${id}?gagal=Data Gagal Di Update!`);
        }
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
  }
});
router.post('/hapus-lokasi/:id', async (req, res) => {
  try {
      const id = req.params.id;
    const masjid = await masjidModel.DeleteMesjid(id);
      if (masjid) {
            res.redirect(`/data-maps?berhasil=Data Berhasil Di Hapus!`);
        }
        else {
            res.redirect(`/data-maps?gagal=Data Gagal Di Hapus!`);
        }
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
  }
});

router.post('/add-masjid', async (req, res) => {
    try {
        const { name, lat, lng } = req.body;
        const CreateMasjid = await masjidModel.createMasjid(name, lat, lng);
        if (CreateMasjid) {
            res.redirect('/data-maps?berhasil=Data Berhasil Di tambahkan!');
        }
        else {
            res.redirect('/data-maps?gagal=Data Gagal Di tambahkan!');
        }
        
    } catch (error) {
        console.error('Error updating text_about:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
