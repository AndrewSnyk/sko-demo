const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Validates email format
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the email format is valid
 */
function isValidEmail(email) {
  if (typeof email !== 'string' || !email.trim()) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length <= 254 && emailRegex.test(email.trim());
}

/**
 * Password reset endpoint - accepts email, validates it, returns success.
 * Returns a generic message to prevent user enumeration.
 * @route POST /api/reset-password
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Email address for password reset
 * @returns {Object} Success message (200) or validation error (400)
 */
app.post('/api/reset-password', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'If an account exists with that email, you will receive password reset instructions.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred processing your request'
    });
  }
});

/**
 * Health check endpoint
 * @returns {Object} Status object with current timestamp
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Server is running'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
