const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async (event) => {
  // CORS preflight
  if (event.http && event.http.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://renergence.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  let body;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const { name, email, subject, message } = body || {};

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'All fields are required' }),
    };
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Invalid email address' }),
    };
  }

  try {
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Renergence Contact'}" <${process.env.FROM_EMAIL}>`,
      to: 'support@multiplenatures.com',
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escHtml(name)}</p>
        <p><strong>Email:</strong> ${escHtml(email)}</p>
        <p><strong>Subject:</strong> ${escHtml(subject)}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${escHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Mail error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'https://renergence.com',
    'Content-Type': 'application/json',
  };
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
