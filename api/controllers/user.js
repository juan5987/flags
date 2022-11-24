const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
const dataMapper = require('../dataMapper');
const nodemailer = require('nodemailer');
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
    const bestScore = parseInt(sanitizeHtml(data.bestScore));

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
              .status(409)
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
                    return res.status(409).json({
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
                              return res.status(201).json(result.rows[0]);
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
        .json({ message: 'Erreur de communication avec le serveur.' });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Tous les champs doivent être renseignés.' });
  }
};

exports.login = (req, res) => {
  const email = sanitizeHtml(req.body.email);
  const password = sanitizeHtml(req.body.password);

  res.setHeader('Access-Control-Allow-Origin', 'http://worldflags.fr');

  try {
    dataMapper.getUserByEmail(email, (error, result) => {
      let user = result.rows[0];
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
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              return res
                .status(401)
                .json({ message: 'Email ou mot de passe incorrect.' });
            } else {
              console.log(`Utilisateur ${user.username} connecté.`);
              res.status(200).json({
                userId: user.id,
                username: user.username,
                bestScore: user.best_score,
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

exports.resetPassword = (req, res) => {
  const email = sanitizeHtml(req.body.email);

  try {
    dataMapper.getUserByEmail(email, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Erreur de communication avec la base de données.',
        });
      } else {
        if (!result.rows[0]) {
          return res.status(404).json({
            message:
              "Aucun utilisateur n'est enregistré avec cette adresse email.",
          });
        } else {
          const token = jwt.sign(
            { userId: result.rows[0].id },
            process.env.RANDOM_TOKEN_SECRET,
            {
              expiresIn: '24h',
            }
          );

          let transporter = nodemailer.createTransport({
            host: 'wagon.o2switch.net',
            port: 465,
            secure: true,
            auth: {
              user: process.env.NM_USER,
              pass: process.env.NM_PASS,
            },
          });

          const mailOptions = {
            from: process.env.NM_USER,
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            html: `<p>Bonjour ${result.rows[0].username},</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe :</p>
            <a href="${process.env.FRONT_URL}/#/resetpassword/${token}">Réinitialiser mon mot de passe</a>
            <p>Ce lien est valable 24h.</p>
            <p>Si vous n'avez pas demandé à réinitialiser votre mot de passe, ignorez cet email.</p>
            <p>Cordialement,</p>
            <p>L'équipe de World Flags.</p>`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                message: 'Erreur de communication avec le serveur.',
              });
            } else {
              console.log(`Email envoyé à ${email}`);
              return res.status(200).json({
                message: `Un email a été envoyé à ${email}.`,
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

exports.updatePassword = (req, res) => {
  const password = sanitizeHtml(req.body.password);
  const token = req.params.token;

  try {
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;

    bcrypt.hash(password, 10).then((hash) => {
      dataMapper.updatePassword(hash, userId, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'Erreur de communication avec la base de données.',
          });
        } else {
          console.log(`Mot de passe de l'utilisateur ${userId} mis à jour.`);

          return res.status(200).json({
            message: 'Mot de passe mis à jour.',
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Erreur de communication avec le serveur.' });
  }
};
