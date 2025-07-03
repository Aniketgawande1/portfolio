const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Experience.find(JSON.parse(queryStr)).populate({
      path: 'user',
      select: 'name avatar'
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-order -startDate');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Experience.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const experiences = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: experiences.length,
      pagination,
      data: experiences
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
exports.getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id).populate({
      path: 'user',
      select: 'name avatar bio'
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: `Experience not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new experience
// @route   POST /api/experiences
// @access  Private
exports.createExperience = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // If current is true, set endDate to null
    if (req.body.current) {
      req.body.endDate = null;
    }

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private
exports.updateExperience = async (req, res, next) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: `Experience not found with id of ${req.params.id}`
      });
    }

    // Make sure user is experience owner
    if (experience.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this experience`
      });
    }

    // If current is true, set endDate to null
    if (req.body.current) {
      req.body.endDate = null;
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private
exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: `Experience not found with id of ${req.params.id}`
      });
    }

    // Make sure user is experience owner
    if (experience.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this experience`
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get current experiences
// @route   GET /api/experiences/current
// @access  Public
exports.getCurrentExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({ current: true })
      .sort('-order -startDate')
      .populate({
        path: 'user',
        select: 'name avatar'
      });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
