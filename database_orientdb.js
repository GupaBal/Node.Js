var OrientDB = require('orientjs');

var server = OrientDB({
  host: "localhost",
  prot: 2480,
  username:'root',
  password:'1039'
});

var db = server.use('orientDB');

/*
* CREATE
* READ
* UPDATE
* DELETE
*/
/* CREATE WHERE 조건이 들어갈 경우 객체를 전달?
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
    params:{
        rid:'#10:0'
    }
};
db.query(sql,param).then(function(results){
  console.log(results);
});
*/


// INSERT
/*
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
db.query(sql,{
  params:{
      title:'Express',
      desc:'Express is framework for web'
  }
}).then(function(results){
  console.log(results);
});
*/

// UPDATE
/*
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
db.query(sql, {params:{title:'crazy',rid:'#12:0'}}).then(function(results){
  console.log(results);
})
*/

// DELETE

var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql,{params:{rid:'#11:0'}}).then(function(results){
  console.log(results);
});
