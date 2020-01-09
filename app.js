const express = require('express'); // express 를 사용
const app = express(); // express라는 모듈로 app이란 객체를 생성
var bodyParser = require('body-parser'); // bodyparser을 사용
app.use(express.static('public')); // 정적인 파일이 위치할 디렉토리를 지정하는 기
app.get('/', function(req,res){
  res.send('Hello home page');
});
app.use(bodyParser.urlencoded({extended: false}))  //app.use로 bodyParser를 사용하겠 (bodyparser미들웨이임 )
app.get('/topic/:id',function(req,res){
  var topics = [
    'Javascript is....',
    'Nodejs is.....',
    'Express is....'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Node.js</a><br>
  <a href="/topic?id=2">Express</a><br>
  ${topics[req.query.id]}`

  res.send(output);
})

app.get('/topic/:id/:mode',function(req, res){
  res.send(req.params.id+','+req.params.mode)
})

app.get('/apros',function(req,res){
  res.send('<h1>Login plase</h1>');
});
app.get('/apros/login',function(req,res){
  res.send('<h1>Hello Router</h1><img src= "/태양판.png">');
});
app.listen(3000,function(){
  console.log('Conneted 3000 port!!')
})
