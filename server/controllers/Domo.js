// DOMO B
const models = require('../models');

const { Domo } = models;
// end

const makerPage = async (req, res) => {
  // DOMO D
  res.render('app');
};

// DOMO B
const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.size || !req.body.age) {
    return res.status(400).json({ error: 'Both name, size, and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    size: req.body.size,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, size: newDomo.size, age: newDomo.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};
// end

// DOMO D
const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name size age').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  makerPage,
  // DOMO B
  makeDomo,
  // end
  getDomos,
};
