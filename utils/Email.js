const nodemailer = require('nodemailer');

class Email {
	constructor(props) {
		const {
			EMAIL_HOST,
			EMAIL_PORT,
			EMAIL_USERNAME,
			EMAIL_PASSWORD
		} = process.env;
		const {
			subject,
			message,
			name,
			email_address
		} = props;
		const transport_options = {
	    host: EMAIL_HOST,
	    port: EMAIL_PORT,
	    secure: false,
	    auth: {
	      user: EMAIL_USERNAME,
	      pass: EMAIL_PASSWORD
	    }
	  }

		this.subject = subject;
		this.message = message;
		this.name = name;
		this.email_address = email_address;
		this.transporter = nodemailer.createTransport(transport_options);
		this.sendMail = this.sendMail.bind(this);
	}

	generateHTML() {
		return (
			`<!DOCTYPE html>
			<html>
			  <head>
			    <meta charset="utf-8">
			    <title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css"></title>
			    <style>
			      body {
			        padding: 20px;
			      }
			    </style>
			  </head>
			  <body>
			    <h2>Message From ${this.name} :</h2>
			    <hr />
			    <p>${this.message}</p>
					<hr />
					<p>Reply to ${this.email_address}</p>
			  </body>
			</html>`
		)
	}
	async sendMail() {
		const mail_options = {
			from: '< Lydia Cournoyer Photo Website >',
			to: process.env.EMAIL_ADDRESS,
			subject: this.subject,
			html: this.generateHTML()
		}

		await new Promise((res, rej) => {
			this.transporter.sendMail(mail_options, (err, info) => err ? rej(err) : res(info));
		});
	}
}

module.exports = Email;
