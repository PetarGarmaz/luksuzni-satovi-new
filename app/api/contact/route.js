import nodemailer from "nodemailer";

export async function POST(req) {
	try {
		const { firstName, lastName, subject, email, textMessage, htmlMessage, images} = await req.json();
		var attachedImages = [];

		if(images) {
			for (let i = 0; i < images.length; i++) {
				const imageUrl = images[i];

				attachedImages.push({
					filename: imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
					path: imageUrl,
					contentDisposition: "attachment"
				})
			};
		}

		// configure transporter
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST, // e.g. smtp.gmail.com or smtp.zoho.com
			port: parseInt(process.env.SMTP_PORT), // ensure it's a number
			secure: true, // true for 465, false for 587
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// send mail
		await transporter.sendMail({
			from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
			to: process.env.SMTP_USER,
			replyTo: email,
			subject: subject,
			text: textMessage,
			html: htmlMessage,
			attachments: attachedImages
		});

		return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Email error:", error.message);
		
		return new Response(JSON.stringify({ message: "Error sending email" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
