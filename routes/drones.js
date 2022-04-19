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

router.get("/drones/:id/edit", (req, res, next) => {
  Drone.findById(req.params.id)
    .then(function (foundDrone) {
      res.render("drones/update-form", { drone: foundDrone });
    })
    .catch(function (error) {
      console.log("Something went wrong", error.message);
    });

});

router.post("/drones/:id/edit", (req, res, next) => {
  Drone.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
    .then(function () {
      res.redirect("/drones");
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  Drone.findByIdAndRemove(req.params.id)
    .then(function () {
      res.redirect("/drones");
    })
    .catch(function (err) {
      console.log("Something went wrong", err.message);
    });
});

module.exports = router;