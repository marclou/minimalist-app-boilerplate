const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.nodemailer);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((e) =>
      logger.warn(`Unable to connect to email server. Make sure you have configured the SMTP options in .env > ${e}`)
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset your password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.appUrl}reset-password?token=${token}`;
  const text = `Hey there,

You can reset your password using this link: ${resetPasswordUrl}

If you did not request any password resets, then ignore this email.

Best,
Marc`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Verify your account';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.appUrl}verify-email?token=${token}`;
  const text = `Hey there,

You can verify your email with this link: ${verificationEmailUrl}

If you did not create an account, then ignore this email.

Best,
Marc`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
