const express = require('express'); // express 를 사용
const app = express(); // express라는 모듈로 app이란 객체를 생성

app.use(express.static('public')); // 정적인 파일이 위치할 디렉토리를 지정하는 기
app.get('/', function(req,res){
  res.send('Hello home page');
});
app.get('/dynamic',function(req,res){
var lis = '';
for(var i=0; i<5; i++){
  lis = lis +'<li>coding</li>';
}

app.get('/topic',function(req,res){
  var topics = [
    'Javascript is....',
    'Nodejs is.....',
    'Express is....'
  ];
  var str = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=0">Node.js</a><br>
  <a href="/topic?id=0">Express</a><br>
  `;
  var output2 = str + topics[req.query.id]
  res.send(output2);
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
