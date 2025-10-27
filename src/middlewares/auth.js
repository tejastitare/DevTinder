const adminAuth = (req, res, next) => {
  const token = "xyz";
  const adminAuthorized = token === "xyz";
  if (adminAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};
const userAuth = (req, res, next) => {
  const token = "xyz";
  const userAuthorized = token === "xyz";
  if (userAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
