// models/masjidModel.js
const fs = require("fs");
const db = require('../db_masjid');

const masjid = {
  getAllData: () => {
    // Implementasi untuk mendapatkan semua data relawan dari database
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `masjid`";
      db.query(query, (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results);
        }
      });
    });
  },
  createMasjid : (name,lat,lng) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO masjid (name, lat, lng) VALUES (?, ?, ?)";
      db.query(query,[name,lat,lng], (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results);
        }
      });
    });
  },
  getDetails: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM masjid WHERE id=?";
      db.query(query,[id], (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  UpdateMesjid: (name,lat,lng,id) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE masjid SET name = ? ,lat =?,lng=? WHERE id = ?";
      db.query(query,[name,lat,lng,id], (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results);
        }
      });
    });
  },
  DeleteMesjid: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM masjid WHERE id= ?";
      db.query(query,[id], (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results);
        }
      });
    });
  },




};

module.exports = masjid;
