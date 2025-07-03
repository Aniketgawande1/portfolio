const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    // Add IP address and user agent
    req.body.ipAddress = req.ip || req.connection.remoteAddress;
    req.body.userAgent = req.get('User-Agent');

    const contact = await Contact.create(req.body);

    // Send email notification
    await sendEmailNotification(contact);

    // Send auto-reply to user
    await sendAutoReply(contact);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
exports.getContacts = async (req, res, next) => {
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
    query = Contact.find(JSON.parse(queryStr));

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
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const contacts = await query;

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
      count: contacts.length,
      pagination,
      data: contacts
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id of ${req.params.id}`
      });
    }

    // Update responded date if status is being changed to responded
    if (req.body.status === 'Responded' && contact.status !== 'Responded') {
      req.body.respondedAt = new Date();
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id of ${req.params.id}`
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// Helper function to send email notification
const sendEmailNotification = async (contact) => {
  try {
    const transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const message = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USERNAME,
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
        ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
        ${contact.projectType ? `<p><strong>Project Type:</strong> ${contact.projectType}</p>` : ''}
        ${contact.budget ? `<p><strong>Budget:</strong> ${contact.budget}</p>` : ''}
        ${contact.timeline ? `<p><strong>Timeline:</strong> ${contact.timeline}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted on: ${contact.createdAt}</small></p>
        <p><small>IP Address: ${contact.ipAddress}</small></p>
      `
    };

    await transporter.sendMail(message);
  } catch (err) {
    console.error('Error sending notification email:', err);
  }
};

// Helper function to send auto-reply
const sendAutoReply = async (contact) => {
  try {
    const transporter = nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const message = {
      from: process.env.EMAIL_FROM,
      to: contact.email,
      subject: `Thank you for contacting me - ${contact.subject}`,
      html: `
        <h2>Thank You for Your Message!</h2>
        <p>Hi ${contact.name},</p>
        <p>Thank you for reaching out to me. I have received your message and will get back to you as soon as possible.</p>
        
        <h3>Your Message Details:</h3>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        
        <p>I typically respond within 24-48 hours. If your inquiry is urgent, please feel free to follow up.</p>
        
        <p>Best regards,<br>
        Your Name</p>
        
        <hr>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `
    };

    await transporter.sendMail(message);
  } catch (err) {
    console.error('Error sending auto-reply email:', err);
  }
};
