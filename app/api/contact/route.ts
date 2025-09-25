import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "ryanmoshi77@gmail.com";
// IMPORTANT: Emails can't load images from localhost. Default to your live site,
// and allow overriding via env SITE_URL when deploying elsewhere.
const SITE_URL = process.env.SITE_URL || "https://ryan-moshi-portfolio.lindy.site";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const FROM_EMAIL = process.env.MAIL_FROM || "Ryan Moshi <noreply@your-domain.com>";

async function sendEmail(to: string, subject: string, html: string) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("SMTP Configuration Check:");
    console.error("SMTP_USER:", SMTP_USER ? "Set" : "Missing");
    console.error("SMTP_PASS:", SMTP_PASS ? "Set" : "Missing");
    console.error("SMTP_HOST:", SMTP_HOST);
    console.error("SMTP_PORT:", SMTP_PORT);
    throw new Error("SMTP not configured. Set SMTP_USER and SMTP_PASS in .env.local");
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    }
  });
  await transporter.sendMail({ from: FROM_EMAIL, to, subject, html });
}

function renderUserTemplate(name: string, projectData: any) {
  // Image URLs with fallbacks
  const profileImage = `${SITE_URL}/images/ryan-profile-red.jpg`;
  const retrosoftLogo = `${SITE_URL}/images/retrosoft-logo.png`;
  const retroworldLogo = `${SITE_URL}/images/retroworld-logo.png`;
  const dropexLogo = `${SITE_URL}/images/dropex-logo-blue.png`;
  
  // Format project type for display
  const formatProjectType = (type: string) => {
    const types: { [key: string]: string } = {
      'brand-strategy': 'Brand Strategy',
      'web-development': 'Web Development',
      'mobile-app': 'Mobile App',
      'digital-transformation': 'Digital Transformation',
      'other': 'Other'
    };
    return types[type] || type;
  };
  
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Thank You - Ryan Moshi</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
      /* Reset styles */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      
      /* Mobile styles */
      @media only screen and (max-width: 600px) {
        .mobile-center { text-align: center !important; }
        .mobile-padding { padding: 20px !important; }
        .mobile-font-large { font-size: 24px !important; }
        .mobile-font-medium { font-size: 16px !important; }
        .mobile-button { 
          display: block !important; 
          width: 100% !important; 
          text-align: center !important; 
        }
        .mobile-stack { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0f16;font-family:Arial,Helvetica,sans-serif;">
    <!-- Preheader -->
    <div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
      Thank you for your project inquiry, ${name}! I'll get back to you within 24-48 hours.
    </div>
    
    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0f16;padding:20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#111827;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
            
            <!-- Header Section -->
            <tr>
              <td style="background-color:#ef4444;padding:40px 30px;text-align:center;position:relative;">
                <!-- Profile Image -->
                <img src="${profileImage}" alt="Ryan Moshi - Chief Technology & Brand Strategist" width="80" height="80" style="border-radius:50%;border:3px solid rgba(255,255,255,0.3);display:block;margin:0 auto 16px;max-width:80px;height:auto;" />
                
                <!-- Name and Title -->
                <h1 style="margin:0;font-size:28px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-0.5px;text-shadow:0 2px 4px rgba(0,0,0,0.3);">Ryan Moshi</h1>
                <p style="margin:8px 0 0;font-size:16px;color:rgba(255,255,255,0.9);font-family:Arial,Helvetica,sans-serif;font-weight:500;">Chief Technology & Brand Strategist</p>
              </td>
            </tr>
            
            <!-- Main Content -->
            <tr>
              <td style="padding:40px 30px;" class="mobile-padding">
                <!-- Personalized Greeting -->
                <h2 style="margin:0 0 20px;font-size:24px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-0.3px;" class="mobile-font-large">Thank you, ${name}!</h2>
                
                <!-- Confirmation Message -->
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#e5e7eb;font-family:Arial,Helvetica,sans-serif;" class="mobile-font-medium">
                  Your project inquiry has been received successfully. I'm excited to learn more about your vision and how we can bring it to life together.
                </p>
                
                <!-- Project Summary (if data available) -->
                ${projectData && (projectData.projectName || projectData.projectType) ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:8px;margin:24px 0;border-left:4px solid #ef4444;">
                  <tr>
                    <td style="padding:20px;">
                      <h3 style="margin:0 0 12px;font-size:18px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">Project Summary</h3>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${projectData.projectName ? `
                        <tr>
                          <td style="padding:4px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Project:</strong> ${projectData.projectName}
                          </td>
                        </tr>
                        ` : ''}
                        ${projectData.projectType ? `
                        <tr>
                          <td style="padding:4px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Type:</strong> ${formatProjectType(projectData.projectType)}
                          </td>
                        </tr>
                        ` : ''}
                        ${projectData.budget ? `
                        <tr>
                          <td style="padding:4px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Budget:</strong> ${projectData.budget}
                          </td>
                        </tr>
                        ` : ''}
                        ${projectData.timeline ? `
                        <tr>
                          <td style="padding:4px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Timeline:</strong> ${projectData.timeline}
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </td>
                  </tr>
                </table>
                ` : ''}
                
                <!-- Response Timeline -->
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#e5e7eb;font-family:Arial,Helvetica,sans-serif;" class="mobile-font-medium">
                  I'll review your request carefully and get back to you within <strong style="color:#ef4444;">24-48 hours</strong> with next steps and a detailed proposal.
                </p>
                
                <!-- CTA Button -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                  <tr>
                    <td align="center">
                      <a href="https://ryanmoshiportfolio.vercel.app/" style="display:inline-block;background-color:#ef4444;color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:8px;font-weight:bold;font-size:16px;font-family:Arial,Helvetica,sans-serif;border:2px solid #ef4444;" class="mobile-button">
                        🔗 View My Portfolio
                      </a>
                    </td>
                  </tr>
                </table>
                
                <!-- What's Next Section -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:8px;margin:24px 0;">
                  <tr>
                    <td style="padding:20px;">
                      <h3 style="margin:0 0 12px;font-size:18px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">What's Next?</h3>
                      <ul style="margin:0;padding-left:20px;color:#d1d5db;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                        <li style="margin-bottom:8px;">I'll analyze your project requirements</li>
                        <li style="margin-bottom:8px;">Prepare a detailed proposal with timeline and pricing</li>
                        <li style="margin-bottom:8px;">Schedule a discovery call to discuss your vision</li>
                        <li>Begin crafting your digital solution</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color:#0f172a;padding:30px;text-align:center;">
                <!-- Social Media Links -->
                <h3 style="margin:0 0 16px;font-size:18px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">Connect With Me</h3>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                  <tr>
                    <td style="padding:0 8px;">
                      <a href="https://www.linkedin.com/in/ryan-moshi" style="display:inline-block;width:40px;height:40px;background-color:#ef4444;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;text-decoration:none;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">in</a>
                    </td>
                    <td style="padding:0 8px;">
                      <a href="https://www.instagram.com/ryan_moshi" style="display:inline-block;width:40px;height:40px;background-color:#ef4444;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;text-decoration:none;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">ig</a>
                    </td>
                    <td style="padding:0 8px;">
                      <a href="mailto:ryanemmanuelmoshi@gmail.com" style="display:inline-block;width:40px;height:40px;background-color:#ef4444;border-radius:50%;text-align:center;line-height:40px;color:#ffffff;text-decoration:none;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">@</a>
                    </td>
                  </tr>
                </table>
                
                <!-- Company Logos -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px auto;border-top:1px solid #374151;padding-top:20px;">
                  <tr>
                    <td style="text-align:center;padding-bottom:12px;">
                      <p style="margin:0 0 16px;font-size:14px;color:#9ca3af;font-family:Arial,Helvetica,sans-serif;font-weight:500;">My Companies</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">
                      <img src="${retrosoftLogo}" alt="Retrosoft" width="32" height="32" style="border-radius:4px;margin:0 8px;max-width:32px;height:auto;" />
                      <img src="${retroworldLogo}" alt="RetroWorld Studios" width="32" height="32" style="border-radius:4px;margin:0 8px;max-width:32px;height:auto;" />
                      <img src="${dropexLogo}" alt="DropEx Logistics" width="32" height="32" style="border-radius:4px;margin:0 8px;max-width:32px;height:auto;" />
                    </td>
                  </tr>
                </table>
                
                <!-- Copyright -->
                <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
                  © 2025 Ryan Moshi. All rights reserved.<br>
                  Building Brands. Engineering Solutions. Leading Innovation.
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

function renderOwnerTemplate(payload: any) {
  const logo = `${SITE_URL}/images/ryan-profile-red.jpg`;
  const retrosoft = `${SITE_URL}/images/retrosoft-logo.png`;
  const retroworld = `${SITE_URL}/images/retroworld-logo.png`;
  const dropex = `${SITE_URL}/images/dropex-logo-blue.png`;
  
  // Format project type for display
  const formatProjectType = (type: string) => {
    const types: { [key: string]: string } = {
      'brand-strategy': 'Brand Strategy',
      'web-development': 'Web Development',
      'mobile-app': 'Mobile App',
      'digital-transformation': 'Digital Transformation',
      'other': 'Other'
    };
    return types[type] || type;
  };
  
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>New Project Inquiry - Ryan Moshi</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
      /* Reset styles */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      
      /* Mobile styles */
      @media only screen and (max-width: 600px) {
        .mobile-center { text-align: center !important; }
        .mobile-padding { padding: 20px !important; }
        .mobile-font-large { font-size: 20px !important; }
        .mobile-font-medium { font-size: 14px !important; }
        .mobile-button { 
          display: block !important; 
          width: 100% !important; 
          text-align: center !important; 
        }
        .mobile-stack { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0f16;font-family:Arial,Helvetica,sans-serif;">
    <!-- Preheader -->
    <div style="display:none;font-size:1px;color:#fefefe;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
      New project inquiry from ${payload.name || 'Unknown'} - ${payload.projectName || 'Project Inquiry'}
    </div>
    
    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0f16;padding:20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;background-color:#111827;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#ef4444;padding:30px;text-align:center;">
                <img src="${logo}" width="60" height="60" alt="Ryan Moshi" style="border-radius:50%;border:3px solid rgba(255,255,255,0.3);display:block;margin:0 auto 12px;max-width:60px;height:auto;" />
                <h1 style="margin:0;font-size:24px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;letter-spacing:-0.3px;" class="mobile-font-large">New Project Inquiry</h1>
                <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.9);font-family:Arial,Helvetica,sans-serif;">Portfolio Contact Form</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:30px;" class="mobile-padding">
                <!-- Project Details Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:8px;margin-bottom:20px;border-left:4px solid #ef4444;">
                  <tr>
                    <td style="padding:24px;">
                      <h2 style="margin:0 0 16px;font-size:20px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">Project Details</h2>
                      
                      <!-- Client Information -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;width:30%;">
                            <strong style="color:#ffffff;">Client Name:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.name || 'Not provided'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Email:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <a href="mailto:${payload.email}" style="color:#ef4444;text-decoration:none;">${payload.email || 'Not provided'}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Project Name:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.projectName || 'Not specified'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Project Type:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${formatProjectType(payload.projectType) || 'Not specified'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Budget:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.budget || 'Not specified'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Timeline:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.timeline || 'Not specified'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Source:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.source || 'Not specified'}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            <strong style="color:#ffffff;">Submitted:</strong>
                          </td>
                          <td style="padding:8px 0;color:#d1d5db;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                            ${payload.submittedAt || 'Just now'}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Project Description Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:8px;margin-bottom:20px;">
                  <tr>
                    <td style="padding:24px;">
                      <h3 style="margin:0 0 12px;font-size:18px;font-weight:bold;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">Project Description</h3>
                      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;" class="mobile-font-medium">${(payload.description || 'No description provided').replace(/</g, "&lt;")}</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Quick Actions -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${payload.email}?subject=Re: ${payload.projectName || 'Your Project Inquiry'}&body=Hi ${payload.name},%0D%0A%0D%0AThank you for reaching out about your project. I'd love to discuss this further with you.%0D%0A%0D%0ABest regards,%0D%0ARyan Moshi" style="display:inline-block;background-color:#ef4444;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;font-size:14px;font-family:Arial,Helvetica,sans-serif;border:2px solid #ef4444;" class="mobile-button">
                        📧 Reply to Client
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color:#0f172a;padding:20px;text-align:center;">
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 12px;font-size:14px;color:#9ca3af;font-family:Arial,Helvetica,sans-serif;font-weight:500;">Portfolio Contact System</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                    <tr>
                      <td style="padding:0 6px;">
                        <img src="${retrosoft}" width="24" height="24" alt="Retrosoft" style="border-radius:4px;max-width:24px;height:auto;" />
                      </td>
                      <td style="padding:0 6px;">
                        <img src="${retroworld}" width="24" height="24" alt="RetroWorld Studios" style="border-radius:4px;max-width:24px;height:auto;" />
                      </td>
                      <td style="padding:0 6px;">
                        <img src="${dropex}" width="24" height="24" alt="DropEx Logistics" style="border-radius:4px;max-width:24px;height:auto;" />
                      </td>
                    </tr>
                  </table>
                </div>
                <p style="margin:0;font-size:12px;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">© 2025 Ryan Moshi Portfolio System</p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, projectName, projectType, budget, timeline, description, source } = data;

    // Enhanced validation
    if (!name || !email || !projectName || !projectType || !description) {
      return NextResponse.json({ 
        error: "Missing required fields. Please fill in all required fields." 
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Please provide a valid email address." 
      }, { status: 400 });
    }

    // Prepare enhanced data for email templates
    const enhancedData = {
      name: name.trim(),
      email: email.trim(),
      projectName: projectName.trim(),
      projectType: projectType,
      budget: budget ? `$${Number(budget).toLocaleString()}` : 'Not specified',
      timeline: timeline ? `${timeline} months` : 'Not specified',
      description: description.trim(),
      source: source || 'Not specified',
      submittedAt: new Date().toLocaleString()
    };

    await Promise.all([
      sendEmail(email, "Thanks for reaching out to Ryan Moshi", renderUserTemplate(name, enhancedData)),
      sendEmail(NOTIFY_EMAIL, "New Project Inquiry - Portfolio Contact", renderOwnerTemplate(enhancedData)),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json({ 
      error: err?.message || "Failed to send message. Please try again later." 
    }, { status: 500 });
  }
}


