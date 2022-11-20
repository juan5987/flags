const sanitizeHtml = require('sanitize-html');
const dataMapper = require('../dataMapper');

exports.getRank = (req, res) => {
  try {
    dataMapper.getRank((error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Erreur de communication avec la base de données.',
        });
      } else {
        console.log('Classement récupéré.');
        let count = 0;
        const data = [];
        result.rows.forEach((row) => {
          count++;
          data.push({
            rank: count,
            username: row.username,
            score: row.best_score,
          });
        });
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};

exports.updateScore = (req, res) => {
  const newScore = parseInt(sanitizeHtml(req.body.newScore));
  const userId = parseInt(sanitizeHtml(req.body.userId));

  try {
    dataMapper.updateScore(newScore, userId, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Erreur de communication avec la base de données.',
        });
      } else {
        console.log(`Score de l'utilisateur ${userId} mis à jour.`);
        return res.status(200).json({ message: 'Score mis à jour.' });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};
