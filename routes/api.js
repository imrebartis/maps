var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.route('/')
	.get((req, res) => {
	  Restaurant.find((error, restaurants) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(restaurants);
	  	}
	  })
	});

router.route('/search')
	.get((req, res) => {
		var latitude = req.query.lat;
		var longitude = req.query.lng;
		var maxDistance = req.query.dis;
		Restaurant.where('location')
							.near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance })
							.find((error, restaurants) => {
								if (error) {
									res.status(500).json({message: error});
								} else {
									res.status(200).json(restaurants);
								}
							});
	})

router.route('/:restaurant_id')
	.get((req, res) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(restaurant);
			}
		})
	});



module.exports = router;