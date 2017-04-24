var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4300);
app.use(express.static('public'));

app.get('/',function(req,res,next){
	var content = {};
	
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    content = JSON.stringify(rows);
	res.send(content);
	});
});

app.post('/insert',function(req,res,next){
  var content = {};

  var post = {
	name: req.body.name,
    reps: req.body.reps,
	weight: req.body.weight,
	date: req.body.date,
	lbs: req.body.lbs
  };
  
  mysql.pool.query("INSERT INTO workouts SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send(null);
  });
});

app.post('/delete',function(req,res,next){
	var content = {};
	
		mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
		if(err){
			console.log(err);
			next(err);
			return;
		}
		
		res.send(null);
	});
});

app.post('/update',function(req,res,next){
	var content = {};
	
	var post = {
	id: req.body.id,
	name: req.body.name,
    reps: req.body.reps,
	weight: req.body.weight,
	date: req.body.date,
	lbs: req.body.lbs
  };
  
  
	mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
		if(err){
			next(err);
		return;
		}
		
		var current = result[0];
		
		mysql.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', [req.body.name || current.name, req.body.reps || current.reps, req.body.weight || current.weight, req.body.date || current.date, req.body.lbs || current.lbs, req.body.id],
		function(err, result) {
                   if (err) {
                        next(err);
                        return;
                    }
					res.send(null);
                });
	});
});

//create the table
app.get('/reset-table',function(req,res,next){
  var content = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      content.results = "Table reset";
      res.render('home',content);
    })
  });
});




app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


