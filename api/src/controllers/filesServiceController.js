const SendMail = require('../mailer')

const fileToUpload =async (req,res)=> {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

    let fileToUpload = req.files.name;
    let uploadPath   = `${__dirname}/public/${fileToUpload.name}`; 

    // Use the mv() method to place the file somewhere on your server
   fileToUpload.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).send(err);
      else {
          SendMail(req.files.name,uploadPath);
          return res.status(200).send('File uploaded!');
      }
   });

} 

module.exports = {
    fileToUpload
}