const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = new User({
      userName,
      email,
      password,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log("Error registering user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
};
