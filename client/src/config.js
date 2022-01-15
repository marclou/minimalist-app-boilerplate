const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    REACT_APP_API_URL: Joi.string().required().description('URL for the API'),
    REACT_APP_EMAIL_SUPPORT_TO: Joi.string().required().description('The email app users can reach out for support'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  apiUrl: envVars.REACT_APP_API_URL,
  emailSupport: envVars.REACT_APP_EMAIL_SUPPORT_TO,
};

export default config;
