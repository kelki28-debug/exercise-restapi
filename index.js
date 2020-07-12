const express = require('express')
const app = express();
const data = require('./data/data')
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static('views'));

const PORT = process.env.PORT || 5000;


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/data', (req, res) =>{
    res.send({users:data})
})



app.put('/data/upload/:id', (req, res) =>{
    const {id} = req.params
    let {name, hobby, age} = req.body
    data.splice(id -1 ,1,{name, hobby, age})
   res.send(data)
})

app.delete("/data/destroy/:id", (req, res) => {
    const { id } = req.params;

    const users = data.findIndex((user) => user.id === parseInt(id));

    data.splice(users, 1);

    res.send({ message: "Your data is successfully Updated", data: data });
});



app.listen(PORT, () =>  {
    console.log(`server running on port ${PORT}`)
})