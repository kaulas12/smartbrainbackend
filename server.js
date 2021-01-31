const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});



const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());
const database = {
	users : [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries:0,
			joined: new Date()
		},
		{

			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'banana',
			entries:0,
			joined: new Date()
		}
	]
}

app.get('/', (req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
		if(req.body.email === database.users[0].email
			&& req.body.password === database.users[0].password){
			res.json('success');
		}
		else{
			res.status(400).json('error logging in');
		}


})


app.post('/register', (req, res)=>{
	const{email, name, password} = req.body;
// This is bcrypt for securing the password
	db('users')
	.returning('*')
	.insert({
		email:email,
		name:name,
		joined:new Date()
	}).
	then(response =>{
		res.json(user[0]);
	})	
	.catch(err => res.status(400).json('unable to register'))

	
})

//this route is for getting the profile data

app.get('/profile/:id',(req,res)=>{
	const{ id } = req.params;
	let found = false;
	database.users.forEach(user=>{
		if(user.id === id){
			found = true;
			return(res.json(user));
		}
		
	})
	if(!found){
		res.status(400).json('not found');
	}

})

app.post('/image', (req,res)=>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(user=>{
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})


	if(!found){
		res.status(400).json('not found');
	}
})





app.listen(5555, ()=>{
	console.log('hellooo!');
})