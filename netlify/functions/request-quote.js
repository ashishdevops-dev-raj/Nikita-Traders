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
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

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

    const textBody = [
      'New quote request received',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Submitted At: ${submittedAt}`,
      '',
      'Message:',
      message
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f6f8fb; padding:20px;">
        <div style="max-width:620px; margin:0 auto; background:#ffffff; border:1px solid #e6e8ee; border-radius:10px; overflow:hidden;">
          <div style="background:#0f2b46; color:#ffffff; padding:16px 20px; font-size:20px; font-weight:700;">
            New Request a Quote
          </div>
          <div style="padding:18px 20px; color:#1d2939;">
            <p style="margin:0 0 12px; font-size:14px;">A new inquiry was submitted from your website contact form.</p>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr><td style="padding:8px 0; color:#475467; width:130px;">Name</td><td style="padding:8px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding:8px 0; color:#475467;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0; color:#475467;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><td style="padding:8px 0; color:#475467;">Service</td><td style="padding:8px 0;">${service}</td></tr>
              <tr><td style="padding:8px 0; color:#475467;">Submitted</td><td style="padding:8px 0;">${submittedAt}</td></tr>
            </table>
            <div style="margin-top:14px; padding:12px; background:#f9fafb; border:1px solid #e4e7ec; border-radius:8px;">
              <div style="font-size:13px; color:#475467; margin-bottom:6px;">Message</div>
              <div style="white-space:pre-wrap; font-size:14px; color:#101828;">${message}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Nikita Traders Quote Bot" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      bcc: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Request a Quote: ${name}`,
      text: textBody,
      html: htmlBody
    });

    if (Array.isArray(info.rejected) && info.rejected.length > 0) {
      console.error('SMTP rejected recipients:', info.rejected);
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Recipient rejected by mail server' })
      };
    }

    console.log('Quote mail sent:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });

    const autoReplyText = [
      `Hi ${name},`,
      '',
      'Thank you for contacting Nikita Traders.',
      'We have received your request and our team will get back to you within 24 hours.',
      '',
      'Your submitted details:',
      `- Service: ${service}`,
      `- Phone: ${phone}`,
      `- Submitted At: ${submittedAt}`,
      '',
      'If your inquiry is urgent, please call us at +91-7735479750.',
      '',
      'Regards,',
      'Nikita Traders',
      'Transport and Supply Services'
    ].join('\n');

    const autoReplyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f6f8fb; padding:20px;">
        <div style="max-width:620px; margin:0 auto; background:#ffffff; border:1px solid #e6e8ee; border-radius:10px; overflow:hidden;">
          <div style="background:#0f2b46; color:#ffffff; padding:16px 20px; font-size:20px; font-weight:700;">
            Thank you for your inquiry
          </div>
          <div style="padding:18px 20px; color:#1d2939;">
            <p style="margin:0 0 12px; font-size:14px;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 12px; font-size:14px;">
              We have received your request at Nikita Traders. Our team will review it and get back to you within 24 hours.
            </p>
            <div style="margin:14px 0; padding:12px; background:#f9fafb; border:1px solid #e4e7ec; border-radius:8px; font-size:14px;">
              <div><strong>Service:</strong> ${service}</div>
              <div><strong>Phone:</strong> ${phone}</div>
              <div><strong>Submitted:</strong> ${submittedAt}</div>
            </div>
            <p style="margin:0; font-size:14px;">
              For urgent support, call <a href="tel:+917735479750">+91-7735479750</a>.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Nikita Traders" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'We received your request - Nikita Traders',
      text: autoReplyText,
      html: autoReplyHtml
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
