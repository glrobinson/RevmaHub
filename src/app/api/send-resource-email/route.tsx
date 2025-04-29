import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const {
    first_name,
    last_name,
    email,
    phone,
    description,
    resource_type,
    file_link,
  } = await req.json();

  if (!email || !description || !first_name || !last_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Resource Submission',
    text: `
New Resource Submission:

First Name: ${first_name}
Last Name: ${last_name}
Email: ${email}
Phone: ${phone || 'N/A'}
Type: ${resource_type || 'N/A'}
Description: ${description}
File Link: ${file_link || 'N/A'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resource email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
