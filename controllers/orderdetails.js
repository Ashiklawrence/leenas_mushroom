const orderdb = require("../models/orderdb");
const asyncHandler = require("express-async-handler");

//  add order details
exports.addOrderdetails = asyncHandler(async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      date,
      order_type,
      item,
      name,
      address,
      pincode,
      phone_number,
      catalogue,
      quantity,
      courier_data,
      courier_provider,
      courier_ref_no,
      tracking_id,
      tracking_status,
      payment_status
    } = req.body;

    // Check if all required fields are provided
    if (
      !date ||
      !order_type ||
      !name ||
      !address ||
      !pincode ||
      !phone_number ||
      !catalogue ||
      !quantity ||
      !courier_provider ||
      !courier_ref_no ||
      !tracking_status
    ) {
      return res.status(400).json({status:"failed", message: "All fields are required" });
    }

    // Create a new document with the provided data
    const newOrder = new orderdb({
      date,
      item,
      order_type,
      name,
      address,
      pincode,
      phone_number,
      catalogue,
      quantity,
      courier_data,
      courier_provider,
      courier_ref_no,
      tracking_id,
      tracking_status,
      payment_status
    });

    // Save the new document to the database
    const savedData = await newOrder.save();

    // Send the saved data in the response
    res.status(201).json({status:"success",data:savedData});
  } catch (error) {
    console.error("Error creating order entry:", error);
    res.status(500).json({status:"failed", message: "Server error", error: error.message });
  }
});

//get
exports.getOrderdetails = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Fetch call details with pagination
    const data = await orderdb.find().skip(skip).limit(limit);

    // Get the total count of documents for pagination info
    const totalCount = await orderdb.countDocuments();

    // Check if data is found
    if (!data || data.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No order details found",
      });
    }

    // Calculate total pages based on the count and limit
    const totalPages = Math.ceil(totalCount / limit);

    // Return success response with data and pagination info
    return res.status(200).json({
      status: "success",
      data: data,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limit,
      },
    });
  } catch (err) {
    // Log the error for better tracking
    console.log(`Error fetching order details: ${err.message}`);

    // Return a structured error response
    return res.status(500).json({
      status: "failed",
      message:
        "An error occurred while fetching the data. Please try again later.",
      error: err.message,
    });
  }
});

//patch
exports.updateOrderdetails = asyncHandler(async (req, res) => {
  try {
    const {
      id,
      date,
      item,
      order_type,
      name,
      address,
      pincode,
      phone_number,
      catalogue,
      quantity,
      courier_data,
      courier_provider,
      courier_ref_no,
      tracking_id,
      tracking_status,
      payment_status
    } = req.body;

    if(!id) {
      return res.status(400).json({status:"failed", message: 'Id is required' });
    }
    // Find the document by ID and update only the provided fields
    const updatedOrder = await orderdb.findByIdAndUpdate(
      id, // The document ID
      {
        date,
        item,
        order_type,
        name,
        address,
        pincode,
        phone_number,
        catalogue,
        quantity,
        courier_data,
        courier_provider,
        courier_ref_no,
        tracking_id,
        tracking_status,
        payment_status
      }, // Fields to update
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If the document doesn't exist, return a 404 error
    if (!updatedOrder) {
      return res.status(404).json({status:"failed", message: "Order details not found" });
    }

    // Return the updated document
    res.status(200).json({
      status: "success",
      message: "Order details updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating call details:", error);
    res.status(500).json({status:"failed", message: "Server error", error: error.message });
  }
});


//delete

exports.deleteOrderdetails = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body; // Get the list of IDs from the request body

        // Check if IDs are provided and they are in an array
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({status:"failed", message: 'Please provide an array of IDs' });
        }

        // Delete multiple documents by their IDs
        const deletedCalls = await orderdb.deleteMany({
            _id: { $in: ids } // Use $in to match any of the IDs in the array
        });

        // Check if any documents were deleted
        if (deletedCalls.deletedCount === 0) {
            return res.status(404).json({status:"failed", message: 'No order details found to delete' });
        }

        // Return a success message
        res.status(200).json({
            status: 'success',
            message: `${deletedCalls.deletedCount} order details deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting call details:', error);
        res.status(500).json({status:"failed", message: 'Server error', error: error.message });
    }
});