/* eslint-disable nonblock-statement-body-position */
const router = require('express').Router();
const axios = require('axios');

const locationAPI = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=`
const weatherAPI = `https://api.darksky.net/forecast/${process.env.DARK_SKY_SECRET}/`;

router.get('/:zip', async (req, res, next) => {
  const location = await axios.get(locationAPI + req.params.zip);

  const lat = location.data.records[0].fields.latitude;
  const lon = location.data.records[0].fields.longitude;

  const { data } = await axios.get(`${weatherAPI}${lat},${lon}`);

  res.json({...data, ...location.data});
})

module.exports = router;
