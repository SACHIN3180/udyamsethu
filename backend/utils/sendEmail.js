const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendResetEmail = async (email, resetLink, fullName) => {

    const mailOptions = {
        from: `"Udyam Sethu" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Udyam Sethu Password",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
            ">

                <h2 style="color: #0B1F3A;">
                    Udyam Sethu
                </h2>

                <p>
                    Hello ${fullName},
                </p>

                <p>
                    We received a request to reset your Udyam Sethu
                    account password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <div style="margin: 30px 0;">
                    <a
                        href="${resetLink}"
                        style="
                            background: #0B1F3A;
                            color: white;
                            padding: 14px 24px;
                            text-decoration: none;
                            border-radius: 8px;
                            display: inline-block;
                            font-weight: bold;
                        "
                    >
                        Reset Password
                    </a>
                </div>

                <p>
                    This link will expire in 15 minutes.
                </p>

                <p style="color: #6b7280;">
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

                <hr style="border: none; border-top: 1px solid #e5e7eb;">

                <p style="font-size: 12px; color: #9ca3af;">
                    Udyam Sethu Analytics Platform
                </p>

            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;