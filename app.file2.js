// app_file.js > 코드를 경량화
var express = require('express');
var fs = require('fs'); //파일 시스템을 사용하기위한
var app = express();
var bodyParser = require('body-parser'); // bodyParser사용하기 위한 require
var encoding = 'utf8';
app.use(bodyParser.urlencoded({extended:false})) //bodyParser모듈을 사용하기 위한 준비
app.locals.pretty = true; // jade html 줄바꿈 사용하겠다
app.set('views','./views_file'); //app.set은 설정하는것 (views들은 views_flie밑에 두겠다는 설정)
app.set('view engine', 'jade'); //어떠한 엔진과 템플릿을 쓰겠다는 설정

app.get('/topic/new', function(req,res){
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('internal Server Error');
    }
      res.render('new',{topics:files}); //new라는 jade를 보여줌
  });

})

app.get(['/topic','/topic/:id' ],function(req,res){ //GET방식 템플릿 사용
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('internal Server Error');
    }
    var id = req.params.id;  //id값에 해당되는 값을 찾아와서 실행
    if(id){
      //id값이 있을 때 실행
      fs.readFile('data/'+id, 'utf8', function(err, data){ //id값에 해당하는 것을 읽어 온다.
        if(err){
          console.log(err);
          res.status(500).send('internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    }else{
      //id값이 없을 때 실행
      res.render('view',{topics:files, title:'Welcome', description:'Hello, JavaScript for server.'}); //render (파일이름, 주입할 데이터)
    }
  })

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
      res.redirect('/topic/'+title);  //주소를 입력하면 사용자를 원하는 페이지로 보냄
  });
})

app.listen(3000, function(){
  console.log('Conneted, 3000 port!!!');
})
