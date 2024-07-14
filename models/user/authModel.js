// models/authModel.js

const db = require('../../db_masjid');

const AuthModel = {
  CheckAccount: (username, password) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM adminaccount WHERE user = ? AND password = ?';
      db.query(query, [username, password], (error, results) => {
        if (error) {
          console.error('Error in CheckAccount query:', error);
          return reject(error);
        }

        console.log('CheckAccount results:', results);

        if (results.length > 0) {
          resolve(results[0]);
        } else {
          // Menangani kasus ketika hasil query kosong (tidak ada data)
          const emptyResultError = new Error('Invalid username or password');
          emptyResultError.isEmptyResult = true;
          reject(emptyResultError);
        }
      });
    });
    },
    getData: () => {
    // Implementasi untuk mendapatkan semua data relawan dari database
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM `adminaccount`";
      db.query(query, (error, results) => {
        if (error) {
          console.error("Error retrieving data from database:", error);
          reject("Terjadi kesalahan saat mengambil data kata Mereka");
        } else {
          resolve(results[0]);
        }
      });
    });
    },
    UpdateData: (username,password,id) => {
    // Implementasi untuk mendapatkan semua data relawan dari database
    return new Promise((resolve, reject) => {
    const query = "UPDATE adminaccount SET user = ? ,password =? WHERE id = ?";
      db.query(query,[username,password,id], (error, results) => {
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

module.exports = AuthModel;
