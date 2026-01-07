import Brand from "../model/brand.model.js";
import fs from "fs";
import path from "path";


export const addBrand = async (req, res) => {
  try {
    const data = req.body;

    const brandImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newBrand = new Brand({
      ...data,
      image: brandImage,
    });

    await newBrand.save();

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: newBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating brand",
      error: error.message,
    });
  }
};



export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
      .populate({
        path: "salesMan",
        select: "name code phone email",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brands",
      error: error.message,
    });
  }
};


export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id).populate(
      "salesMan",
      "name code phone email"
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brand",
      error: error.message,
    });
  }
};


export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // ❌ Never allow code update
    delete data.code;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    let updatedImage = brand.image;

    if (req.file) {
      updatedImage = `/uploads/${req.file.filename}`;

      // Delete old image
      if (brand.image) {
        const oldPath = path.join(process.cwd(), brand.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      {
        ...data,
        image: updatedImage,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating brand",
      error: error.message,
    });
  }
};


export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    // Delete image if exists
    if (brand.image) {
      const filePath = path.join(process.cwd(), brand.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Brand.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting brand",
      error: error.message,
    });
  }
};
