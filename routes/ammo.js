'use strict';
var express = require('express');
var router = express.Router();
var svc = require('../svc/ammo');
var bodyParser = require('body-parser');
var Ammo = require('../svc/ammo')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get('/', function(req, res) {
    var ammosvc = new Ammo();
    ammosvc.getAllAmmo(function(ammo) {
        ammosvc.caliberLookup(function(calibers) {
            ammosvc.roundLookup(function(rounds) {
                ammosvc.caseLookup(function(cases) {
                    res.render('ammo', {
                        calibers: calibers,
                        cases: cases,
                        rounds: rounds,
                        ammo: ammo
                    });
                });
            });
        });
    });
});

router.get('/add', function(req, res) {
    var ammosvc = new Ammo();
    ammosvc.caliberLookup(function(calibers) {
        ammosvc.roundLookup(function(rounds) {
            ammosvc.caseLookup(function(cases) {
                res.render('addAmmo', {
                    calibers: calibers,
                    cases: cases,
                    rounds: rounds
                });
            });
        });
    });
});

router.get('/:id', function(req, res) {
    var ammosvc = new Ammo();
    var id = req.params.id;
    ammosvc.getAmmo(id, function(ammo) {
        console.log(ammo)
        res.send({
            _id: ammo._id,
            name: ammo.name,
            caliber: ammo.caliber,
            round: ammo.round,
            case: ammo.case,
            numRounds: ammo.numRounds,
            cpr: ammo.cpr
        });
    });
});

router.post('/add', function(req, res) {
    var ammosvc = new Ammo()
    ammosvc.add(req.body);
    res.redirect('/');
});

router.post('/edit', function(req, res) {
    var ammosvc = new Ammo()
    ammosvc.edit(req.body);
    res.redirect('/');
});


module.exports = router;