export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized: admin access required." });
  }
  next();
};

export const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor") {
  return  res.status(403).json({ message: "Unauthorized: instructor access required." });
  }
  next();
};
