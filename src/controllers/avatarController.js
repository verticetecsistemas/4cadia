const connection = require('../database/connection');
var multer = require('multer');
var FTPStorage = require('multer-ftp');
//const aws = require('aws-sdk');
//const multerS3 = require('multer-s3');


module.exports =  { 

async create(req, res) {

const token = req.headers.authorization;        

async function upAvatar() {

const avatar = token+'.png';
await connection('dados_tatuador').update({ avatar }).where('token', token);

}

const imageName = token;

var upload = multer({
storage: new FTPStorage({
//basepath: '/public_html/img/gettattoo',
destination: function (req, file, options, callback) {
callback(null, `/public_html/img/gettattoo/${imageName}.png`) // custom file destination, file extension is added to the end of the path
},
ftp: {
host: 'ftp.codeone.inf.br',
secure: false, // enables FTPS/FTP with TLS
user: 'codeone1',
password: 'TufeK@tara2021'
}
})

})


upload.single('image')(req, res, err => {
if (err) {
console.log(err);
res.status(500).json({ error: 1, payload: err }); 
}
else {

upAvatar();

const image = {};
image.id = req.file.filename;

res.status(200).json({ error: 0, payload: { id: image.id } });

}

});
}

}
