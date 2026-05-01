const nodemailer = require('nodemailer');

const REQUIRED_ENV_VARS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...CORS_HEADERS, Allow: 'POST' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Mail service is not configured' })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request payload' })
    };
  }

  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const phone = String(payload.phone || '').trim();
  const service = String(payload.service || 'Not specified').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || !phone || !message) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing required fields' })
    };
  }

  if (!isEmailValid(email)) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid email address' })
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Nikita Traders Quote Bot" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New Request a Quote: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        '',
        'Message:',
        message
      ].join('\n')
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    console.error('Failed to send quote email:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Unable to send your request right now' })
    };
  }
};
