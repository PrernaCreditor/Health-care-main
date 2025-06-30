exports.getUserDashboard = async (req, res) => {
  try {
    const user = req.user; // comes from auth middleware
    res.status(200).json({
      message: "Dashboard data fetched successfully",
      userData: {
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin || new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
