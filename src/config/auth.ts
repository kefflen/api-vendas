const authsecrets = process.env.AUTHSECRETS
if (!authsecrets) throw new Error("Authsecrets key on enviroment variables not founded")

export default {
  jwt: {
    secret: authsecrets,
    expiresIn: '1d',
  },
};