const Clarifai = require('clarifai');

//You must add your own API key here to connect to Clarifai.
const app = new Clarifai.App({
  apiKey: '32e6553e88c94bfb8d25f62d826fd97e'
 });

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries!'))
}
module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}