
const fileUpload =async (req,res)=> {
    const name = req.files.name;
    let EDFile = name;
    console.log(EDFile)
    EDFile.mv(`../filesPdfs/${EDFile}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ message : 'File upload' })
    })
    res.send(200);
}

module.exports = {
    fileUpload
}