import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const transportConfig = {
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
}

if (process.env.SMTP_USER)
  transportConfig.auth = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }

const transporter = nodemailer.createTransport(transportConfig)

const message = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: process.env.EMAIL_SUBJECT,
  text: process.env.EMAIL_TEXT,
}

if (process.env.DKIM_DOMAIN)
  message.dkim = {
    domainName: process.env.DKIM_DOMAIN,
    keySelector: process.env.DKIM_KEY_SELECTOR,
    privateKey: process.env.DKIM_PRIVATE_KEY.split('\\n').join('\n'),
  }

transporter.sendMail(message)
  .then(response => {
    console.log(response)
    process.exit()
  })
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })

