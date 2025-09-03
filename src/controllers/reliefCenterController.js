import ReliefCenter from '../models/ReliefCenter.js';
export const addCenter = async (req, res) => {
  // res.status(201).json({ name: ""})
  const shelterName = req.body.shelterName;
  const address = req.body.address;
  const coordinatorName = req.body.coordinatorName;
  const coordinatorNumber = req.body.coordinatorNumber;

  if (coordinatorNumber.length > 10) {
    return res.status(201).json({
      message: 'Please enter a valid number !!!s',
    });
  }

  try {
    const createdUser = await ReliefCenter.create({
      shelterName: shelterName,
      address: address,
      coordinatorName: coordinatorName,
      coordinatorNumber: coordinatorNumber,
    });

    return res.status(201).json({
      success: true,
      message: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.code === 11000 ? 'duplicate email' : error,
    });
  }
};

export const getAllReliefCenters = async (req, res) => {
  try {
    const allCenters = await ReliefCenter.find().lean();
    console.log(allCenters);
    return res.status(200).json({
      success: true,
      message: allCenters,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
};

export const deleteReliefCenter = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(403).json({
        success: false,
        message: 'id required',
      });
    }
    const deletedCenter = await ReliefCenter.findById(id);
    if (!deletedCenter) {
      return res.status(201).json({
        success: false,
        message: 'Database is empty',
      });
    }
    await deletedCenter.deleteOne();
    console.log(deletedCenter);
    return res.status(201).json({
      success: true,
      message: 'Deleted Sucessfully',
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete',
    });
  }
};
