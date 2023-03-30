"use strict";
const nodemailer = require("nodemailer");


const sendMail=async(fileToSend)=> {
    const config = {
    host: 'smtp.gmail.com',
    port: '587',
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'enriquelopez@colegiocolumbia.edu.mx', // generated ethereal user
        pass: 'Abc1232023', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    }

  const mensaje = {
    from: "enriquelopez@colegiocolumbia.edu.mx",
    to: "enriquelopez@colegiocolumbia.edu.mx",
    subject: "Correo de pruebas",
    text: "Datos de prurba del email",
    attachments: {
        filename: fileToSend,
    }
  }

  const  transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);

  console.log(info);
  
}

module.exports = sendMail;