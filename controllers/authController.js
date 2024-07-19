const Realm = require("realm");

const app = new Realm.App({ id: process.env.REALM_APP_ID });

exports.login = async function (details) {
  try {
    const credentials = Realm.Credentials.emailPassword(details);
    const user = await app.logIn(credentials);
    console.log("Successfully logged in", user.id);
    return { userId: user.id, token: user.accessToken };
  } catch (err) {
    console.error("Failed to log in", err);
    throw new Error("Failed to log in");
  }
};

exports.register = async function (details) {
  try {
    await app.emailPasswordAuth.registerUser(details);
    console.log("Successfully registered", details.email);
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

exports.logout = async function (userId) {
  try {
    const user = app.allUsers[userId];
    if (user) {
      await user.logOut();
      console.log("Successfully logged out", user.id);
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
