"use strict";
const nodemailer = require("nodemailer");


const sendMail=async(fileToSend, pathOfFile)=> {
  
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
        filename: fileToSend.name, //aqi simple y llanamente el nombre del archivo
        path: pathOfFile, // aqui la ruta a ese archivo completa.
    },
    contentType: "application/pdf", //type of file
  }

  const  transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);
  
}

module.exports = sendMail;