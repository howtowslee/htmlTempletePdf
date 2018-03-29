var fs = require('fs');
var htmlPdf = require('html-pdf-chrome');
var htmlTemplate = require('angular-template');
var defaultAngularOptions = {
  prefix: 'ng'
}
var defaultConfig = {
  angularOptions: defaultAngularOptions, // angular-template options
  returnType: ["pdf"] // string | html | pdf
}

function generate(params){
  return new Promise((resolve, reject) => {


    params.config = {...defaultConfig, ...params.config}
  
    if(!params.templatePath) {
      reject("html 이 정의되지 않았습니다.")
    }
    if(!params.data){
      reject("data 가 정의되지 않았습니다.")
    }
  
    var dataHtml = htmlTemplate(params.templatePath, params.data, params.config.angularOptions)
    var nameDate = new Date().getTime();
  
    // config.returnType : html :: 데이터가 바인딩 된 html파일이 필요할 경우
    if(params.config.returnType.indexOf('html') != -1){
      fs.writeFileSync('./htmlTemp'+nameDate+'.html', dataHtml);
    }
  
    htmlPdf.create(dataHtml, {
      printOptions: {
        printBackground: true,
        scale: 0.2,
        marginBottom: 0,
        marginTop: 0
      }
    })
    .then((res) => res.toFile('./htmlTemp'+nameDate+'.pdf'))

  })
}

module.exports = {
  generate,
}