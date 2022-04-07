const connection = require('../database/connection');
const mailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

module.exports = {


    async create(request, response) {
 
        
        const { nome, email } = request.body;

        const token = await connection('login_tatuador')
        .select('token_senha')
        .where('email_login', email);

       const tokenObj = Object.values(JSON.parse(JSON.stringify(token)));
       const token_senha = tokenObj.map(v => (v.token_senha)).toString();

 

        const url = `https://gettattoo-frontend.herokuapp.com/redefinir/${token_senha}`;

        //var body = info.response.toString();
        //body.should.contain('<h1>This is a test</h1>');
        //body.should.contain(nome);
        //done();
         

    const smtpTransport = mailer.createTransport({
        host: 'smtp.codeone.inf.br',
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'contato@codeone.inf.br',
            pass: '@Alice2012'
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    var options = {
      viewEngine : {
        extname: '.hbs', // handlebars extension
        layoutsDir: 'views/', // location of handlebars templates
        defaultLayout: false, // name of main template
        partialsDir: 'views/', // location of your subtemplates aka. header, footer etc
    },
      viewPath: path.resolve(__dirname, './views'),
      extName: '.hbs'
      
      };

smtpTransport.use('compile', hbs(options));
smtpTransport.sendMail({
  from: "GetTattoo <contato@codeone.inf.br>",
  to: email,
  subject: 'Redefinição de Senha!',
  template: 'template',
  context: {
    nome,
    url,

  }

}, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});

return response.send(); 
    /*
    const mail = {
        from: "contato@codeone.inf.br",
        to: email,
        subject: 'GetTattoo te enviou uma mensagem',
        template: 'template',
          
    }
     
    
    smtpTransport.sendMail(mail, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

    return response.send(); */

}
};