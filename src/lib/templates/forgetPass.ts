export function forgetTemplate(to?: string, resetUrl?: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome Admin</title>
      <style>
        body {
          background-color: #f9fafb;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .header {
          background-color: #1a6540;
          color: white;
          text-align: center;
          padding: 24px;
        }
        .header img {
          width: 80px;
          margin-bottom: 12px;
        }
        .content {
          padding: 32px;
        }
        .button {
          display: inline-block;
          background-color: #1a6540;
          color: white;
          margin: auto;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
        }
        .dlex {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1px;
        }
        .footer {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="dlex">
            <img src="https://res.cloudinary.com/orestech/image/upload/v1759767961/econo_elexj1.png" width="50" height="50" alt="Ecometrics Logo" />
            <h3 style="color: #fff; font-size:28px; font-style: bold">Ecometrics</h3>
          </div>
        </div>
        <div class="content">
          <h2>Hello 👋</h2>
          <p>You are receiving this email because we received a password reset request for your account.</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          <p>This password reset link will expire in 60 minutes.</p>
          <p>If you did not request a password reset, no further action is required.</p>
          <p>Regards,<br />Ecometricsnews</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
