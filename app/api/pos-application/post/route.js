import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PosApplications from '../../../../lib/models/posApplications';
import dbConnect from '@/lib/db';

export async function POST(req) {
  try {
    await dbConnect();

    const {
      fullName,
      email,
      phoneNumber,
      posType,
      businessName,
      areYouAMerchant,
      address,
      state,
      additionalComments,
      imageUrl,
    } = await req.json();

    console.log(imageUrl,'imageurl')
    // Save to MongoDB
    const PosApplication = new PosApplications({
      fullName,
      email,
      phoneNumber,
      posType,
      businessName,
      areYouAMerchant,
      address,
      state,
      additionalComments,
      imageUrl,
    });

    await PosApplication.save();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email template for the company (Theme is Orange now)
    const companyMailOptions = {
      from: `"Blord POS Application System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Replace with the company's email address
      subject: 'New Blord POS Application Received',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Blord POS Application</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
            .header { background: linear-gradient(to right, #ff7f00, #ffa500); color: white; padding: 20px; text-align: center; }
            .content { background-color: white; padding: 20px; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
            th { background-color: #ff7f00; color: white; }
            .img { width: 200px; height: 200px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>POS Application Received</h1>
              <p>New POS Application Details</p>
            </div>
            <div class="content">
              <p>A new Blord POS application has been submitted with the following details:</p>
              <table>
                <tr><th>Field</th><th>Value</th></tr>
                <tr><td>Full Name</td><td>${fullName}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
                <tr><td>Phone Number</td><td>${phoneNumber}</td></tr>
                <tr><td>POS Type</td><td>${posType}</td></tr>
                <tr><td>Business Name</td><td>${businessName}</td></tr>
                <tr><td>Are you a Merchant?</td><td>${areYouAMerchant}</td></tr>
                <tr><td>Address</td><td>${address}</td></tr>
                <tr><td>State</td><td>${state}</td></tr>
                <tr><td>Additional Comments</td><td>${additionalComments}</td></tr>
                ${imageUrl ? `<tr><td>Uploaded Image</td><td><img src="${imageUrl}" class="img"/></td></tr>` : ''}
              </table>
              <p>Please review this application and take appropriate action.</p>
            </div>
            <div class="footer">
              <p>© 2024 POS Application System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email to the company
    await transporter.sendMail(companyMailOptions);

    // Email template for the user
    const userMailOptions = {
      from: `"POS Application System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'POS Application Confirmation',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>POS Application Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
            .header { background: linear-gradient(to right, #ff7f00, #ffa500); color: white; padding: 20px; text-align: center; }
            .content { background-color: white; padding: 20px; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>POS Application Confirmation</h1>
              <p>Your POS Application Details</p>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for your POS application. We have received the following details:</p>
              <ul>
                <li><strong>Full Name:</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone Number:</strong> ${phoneNumber}</li>
                <li><strong>POS Type:</strong> ${posType}</li>
                <li><strong>Business Name:</strong> ${businessName}</li>
                <li><strong>Are you a Merchant?:</strong> ${areYouAMerchant}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>State:</strong> ${state}</li>
                <li><strong>Additional Comments:</strong> ${additionalComments}</li>
                 ${imageUrl ? `<li><strong>Uploaded Image</strong><li><img src="${imageUrl}" class="img"/></li></li>` : ''}
              </ul>
              <p>We will review your application and get back to you shortly. If you have any questions, please don't hesitate to contact us.</p>
            </div>
            <div class="footer">
              <p>© 2024 POS Application System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email to the user
    await transporter.sendMail(userMailOptions);

    // Respond with success message
    return NextResponse.json(
      { message: 'POS Application data saved and emails sent successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error}, { status: 500 });
  }
}
