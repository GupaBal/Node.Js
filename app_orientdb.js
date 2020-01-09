var express = require('express');
var fs = require('fs'); //파일 시스템을 사용하기위한
var app = express();
var bodyParser = require('body-parser'); // bodyParser사용하기 위한 require
var encoding = 'utf8';

var OrientDB = require('orientjs');
var server = OrientDB({
  host: "localhost",
  prot: 2480,
  username:'root',
  password:'1039'
});
var db = server.use('orientDB');
app.use(bodyParser.urlencoded({extended:false})) //bodyParser모듈을 사용하기 위한 준비
app.locals.pretty = true; // jade html 줄바꿈 사용하겠다
app.set('views','./views_orientdb'); //app.set은 설정하는것 (views들은 views_flie밑에 두겠다는 설정)
app.set('view engine', 'jade'); //어떠한 엔진과 템플릿을 쓰겠다는 설정

app.get('/topic/new', function(req,res){
  res.render('new'); //new라는 jade를 보여줌
})

app.get(['/topic', '/topic/:id'], function(req,res){  //id값을 알아내고 id값에 맞는것을 실행
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(topics){

    res.render('view', {topics:topics});
  });
});

app.post('/topic', function(req,res){ //라우터 설치 post로 들어오는 정보를 확인 bodyParser로 확인
  var title = req.body.title;
  var description = req.body.description;
  console.log(title);
  console.log(description);
  fs.writeFile('data/'+ title, description, function(err){
    if(err){
      res.status(500).send('internal Server Error');
    }
      res.send('Success!!');
  });
})

app.listen(3000, function(){
  console.log('Conneted, 3000 port!!!');
})
