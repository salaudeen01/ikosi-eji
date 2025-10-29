export function adminWelcomeTemplate(name?: string, password?: string) {
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
            background-color: #0070f3;
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
          .content h2 {
            color: #111827;
            font-size: 22px;
            margin-bottom: 16px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 16px;
          }
          .button {
            display: inline-block;
            background-color: #0070f3;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
          }
          .dlex {
              display: flex;
                gap: 1px;
                align-items: center
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
                <h3 style="color: #1a6540; font-size:28px; font-style: bold">Ecometrics</h3>
            </div>
            <h1>Welcome to the Admin Portal</h1>
          </div>
          <div class="content">
            <h2>Hello${name ? `, ${name}` : ""} 👋</h2>
            <p>
              Your admin account has been successfully created. You can now log in
              using your registered email address and this password: ${password}.
            </p>
            <p>
              Please keep your credentials safe and do not share them with anyone.
            </p>
            <a href="https://econometric.vercel.app/admin/login" class="button">Go to Admin Portal</a>
            <p>
              If you didn’t request this, please ignore this email.
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
  }
  