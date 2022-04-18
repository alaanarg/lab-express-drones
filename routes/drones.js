const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model")


router.get("/drones", (req, res, next) => {
  Drone.find()
    .then(function (allDrones) {
      console.log("Found drones", allDrones);
      res.render("drones/list", { allDrones: allDrones });
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  console.log("BODY", req.body);
  Drone.create({ ...req.body })
  .then(function(results) {
    console.log("SUCCESS", results)
    res.redirect("/drones");
  })
  .catch(function(error) {
    console.log("FAILED", error.message);
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
