// // dengan sintak es6
// import express from 'express';
// const router = express.Router();
// // get home page
// router.get('/', function (req, res, next) {
//   res.send("Belajar REST API Express JS")
// });
// export default router;

// bawaan express generator
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Belajar REST API Express JS.'
  });
});

module.exports = router;