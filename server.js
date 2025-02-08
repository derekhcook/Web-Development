// server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware for parsing form data and enabling CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// Configure Nodemailer transporter using Outlook SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Outlook's SMTP server
  port: 587,
  secure: false, // Use TLS (secure:false for TLS)
  auth: {
    user: process.env.OUTLOOK_USER, // from .env file
    pass: process.env.OUTLOOK_PASS  // from .env file
  }
});

// Sample vendors data (in a real application, use a database)
let vendors = [
  {
    id: 1,
    name: "ABC Manufacturing",
    description: "High-quality materials for construction and industrial use.",
    imageUrl: "https://via.placeholder.com/300",
    website: "https://www.abcmanufacturing.com",
    reviews: [
      { user: "John Doe", comment: "Great quality and fast shipping!" },
      { user: "Jane Smith", comment: "Reliable service and competitive prices." }
    ]
  },
  {
    id: 2,
    name: "XYZ Materials",
    description: "Specializing in eco-friendly building materials and supplies.",
    imageUrl: "https://via.placeholder.com/300",
    website: "https://www.xyzmaterials.com",
    reviews: [
      { user: "Alice Johnson", comment: "Love their sustainable approach!" }
    ]
  }
];

// Route: Home page showing all vendors with a link for vendors to post themselves
app.get('/', (req, res) => {
  res.render('index', { vendors });
});

// Route: Page to submit a new vendor (for vendors to post themselves)
app.get('/vendor/new', (req, res) => {
  res.render('vendor_form');
});

// Route: Handle new vendor submission with email notification
app.post('/vendor/new', (req, res) => {
  const { name, description, imageUrl, website } = req.body;
  
  // Auto-increment ID based on the last vendor's ID
  const newId = vendors.length ? vendors[vendors.length - 1].id + 1 : 1;
  const newVendor = {
    id: newId,
    name,
    description,
    imageUrl,
    website,
    reviews: []
  };

  // Add new vendor to the vendors array (or save to a database)
  vendors.push(newVendor);

  // Dynamically build the email content using the submitted vendor information
  const mailOptions = {
    from: `"Vendor Submission" <${process.env.OUTLOOK_USER}>`, // Sender address from .env
    to: 'derekhcook@outlook.com', // Recipient address
    subject: `New Vendor Submission: ${name}`,
    text: `A new vendor has been submitted to your site.

Name: ${name}
Description: ${description}
Image URL: ${imageUrl}
Website: ${website}

Please review the submission and take appropriate action.`
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  // Redirect back to the home page after submission
  res.redirect('/');
});

// Route: Display a specific vendor's details
app.get('/vendor/:id', (req, res) => {
  const vendorId = parseInt(req.params.id);
  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) {
    return res.status(404).send("Vendor not found");
  }
  res.render('vendor', { vendor });
});

// Route: Handle review submissions for a vendor
app.post('/vendor/:id/review', (req, res) => {
  const vendorId = parseInt(req.params.id);
  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) {
    return res.status(404).send("Vendor not found");
  }
  const { user, comment } = req.body;
  vendor.reviews.push({ user, comment });
  res.redirect(`/vendor/${vendorId}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
