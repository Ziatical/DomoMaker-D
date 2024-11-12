//DOMO B
const models = require('../models');
const Domo = models.Domo;
//end

const makerPage = async (req, res) => {
  // DOMO B
  try {
    const query = {owner: req.session.account._id};
    const docs = await Domo.find(query).select('name age').lean().exec();

    return res.render('app', {domos: docs});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
  //end
};

//DOMO B
const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try{
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.json({ redirect: '/maker'});
  } catch (err) {
    console.log(err);
    if(err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};
//end

module.exports = {
  makerPage,
  // DOMO B
  makeDomo,
  //end
};
