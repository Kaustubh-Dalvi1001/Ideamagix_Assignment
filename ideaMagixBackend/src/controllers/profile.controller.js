export const userProfile = (req, res) => {
  try {
    const user = req.user;

    res.json({
      message: "user fetched successfully.",
      user,
    });
  } catch (error) {
    console.error(`Error in getting user profile: ${error}`);
    res.status(500).json({ message: `Error in getting user profile: ${error}` });
  }
};
