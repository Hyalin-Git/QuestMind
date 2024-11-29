import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "localhost",
	port: 1025,
	secure: false, // true for port 465, false for other ports
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(receiver, subject, text) {
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"QuestMind" <questmind@gmail.com>', // sender address
		to: receiver, // list of receivers
		subject: subject, // Subject line
		html: text, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
