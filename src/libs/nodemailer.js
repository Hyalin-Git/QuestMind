import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: `${process.env.HOST}`,
	port: 587,
	secure: false,
	auth: {
		user: `${process.env.EMAIL}`,
		pass: `${process.env.PASS}`,
	},
	tls: { rejectUnauthorized: false },
	debug: true,
});

// vfvv hari xtvv otmg

export async function sendMail(sender, receiver, subject, text) {
	// send mail with defined transport object
	const mail = await transporter.sendMail({
		from: sender, // sender address
		to: receiver, // list of receivers
		subject: subject, // Subject line
		html: text, // html body
	});

	console.log("Message sent: %s", mail.messageId);
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
