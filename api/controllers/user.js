const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const dataMapper = require('../dataMapper');

exports.signup = (req, res) => {
  const data = req.body;

  if (
    data.email &&
    data.emailConfirm &&
    data.password &&
    data.passwordConfirm &&
    data.username
  ) {
    const email = sanitizeHtml(data.email);
    const emailConfirm = sanitizeHtml(data.emailConfirm);
    const password = sanitizeHtml(data.password);
    const passwordConfirm = sanitizeHtml(data.passwordConfirm);
    const username = sanitizeHtml(data.username);
    const bestScore = sanitizeHtml(data.bestScore);

    if (email !== emailConfirm) {
      return res
        .status(400)
        .json({ message: 'Les emails ne correspondent pas.' });
    }

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    try {
      dataMapper.getUserByUsername(username, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Erreur de communication avec la base de données.',
          });
        } else {
          if (result.rows[0]) {
            return res
              .status(400)
              .json({ message: 'Ce pseudo est déjà utilisé.' });
          } else {
            try {
              dataMapper.getUserByEmail(email, (error, result) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({
                    message: 'Erreur de communication avec la base de données.',
                  });
                } else {
                  if (result.rows[0]) {
                    res.status(400).json({
                      message: 'Cette adresse email est déjà utilisée.',
                    });
                  } else {
                    try {
                      bcrypt.hash(password, 10).then((hash) => {
                        dataMapper.signup(
                          username,
                          email,
                          hash,
                          bestScore,
                          (error, result) => {
                            if (error) {
                              console.log(error);
                              return res.status(500).json({
                                message:
                                  'Erreur de communication avec la base de données.',
                              });
                            } else {
                              console.log('utilisateur créé');
                              res
                                .status(201)
                                .json({ message: 'Utilisateur créé !' });
                            }
                          }
                        );
                      });
                    } catch (error) {
                      console.log(error);
                      return res.status(500).json({
                        message: 'Erreur de communication avec le serveur.',
                      });
                    }
                  }
                }
              });
            } catch (error) {
              console.log(error);
              return res
                .status(500)
                .json({ message: 'Erreur de communication avec le serveur' });
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Erreur de communication avec le serveur' });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Tous les champs doivent être renseignés.' });
  }
};

exports.login = (req, res, next) => {
  const email = sanitizeHtml(req.body.email);
  const password = sanitizeHtml(req.body.password);

  try {
    dataMapper.getUserByEmail(email, (error, result) => {
      const user = result.rows[0];
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Erreur de communication avec la base de données.',
        });
      } else {
        if (!user) {
          return res
            .status(401)
            .json({ message: 'Email ou mot de passe incorrect.' });
        } else {
          bcrypt.compare(password, user.password).then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: 'Email ou mot de passe incorrect 2.' });
            } else {
              console.log(`Utilisateur ${user.username} connecté.`);
              res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  process.env.RANDOM_TOKEN_SECRET,
                  {
                    expiresIn: '24h',
                  }
                ),
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};
