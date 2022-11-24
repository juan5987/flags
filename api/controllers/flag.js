const dataMapper = require('../dataMapper');

exports.getFlags = (req, res) => {
  try {
    dataMapper.getFlags((error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Erreur de communication avec la base de données.',
        });
      } else {
        console.log('Drapeaux récupérés.');
        return res.status(200).json(result.rows);
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};
exports.addFlag = (req, res) => {
  let flags = [];
  try {
    console.log({
      name: req.body.translations.fr,
      flag: req.body.flag,
      region: req.body.region,
    });

    dataMapper.addFlag(
      req.body.translations.fr,
      req.body.flag,
      req.body.region,
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Erreur de communication avec la base de données.',
          });
        } else {
          console.log('Drapeau ajouté.');
          return res.status(200).json(result.rows);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};
