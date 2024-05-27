import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctors = await Doctor.findById(id).populate('reviews').select("-password");
    res.status(200).json({
      status: true,
      message: "Doctor found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "No doctor found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $Option: "i" } },
          { specialization: { $regex: query, $Option: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      status: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "No doctor found" });
  }
};
