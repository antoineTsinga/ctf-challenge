module.exports = function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      console.log(req.user.role, role);
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
