import express from 'express';
import { missingRequiredLocationChangeInputs } from '../utils/responseUtils.js';
import { LocationChangeInput } from '../types/location.js';
import { publishLocationUpdate } from '../services/kafka/kafkaProducer.js';

const eventRoutes = express.Router();

eventRoutes.post('/location-change', async (req, res) => {
  if (
    !req.body ||
    !req.body.userId ||
    !req.body.position ||
    !req.body.position.latitude ||
    !req.body.position.longitude ||
    !req.body.time
  ) {
    return res.status(400).json(missingRequiredLocationChangeInputs);
  }

  const request = {
    user: req.body.id,
    position: {
      lat: req.body.position.latitude,
      lon: req.body.position.latitude,
    },
    time: new Date(req.body.time),
  } as LocationChangeInput;
  try {
    await publishLocationUpdate(request);
  } catch (err) {
    return res.status(500).json({ error: `There was an error sennding message to Kakfa  ${err}` });
  }
  return res.status(200).json({ message: `Message sent successfully` });
});
