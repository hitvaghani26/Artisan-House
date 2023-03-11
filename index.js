const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const async = require("hbs/lib/async");
const port = process.env.port || 5000;

var contactobj = []

async function main() {
    await mongoose.connect('mongodb+srv://hit2:hit738@cluster0.lxngmp3.mongodb.net/AST')
}
main().catch(err => console.log(err));
const app = express();
app.set('view engine', 'ejs');
app.set(__dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + 'public/css'));



// mogodb Schema 
const ContactScema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String }
})

const contact = mongoose.model('contact', ContactScema);







app.post("/contact", function (req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.message);
    contactobj.name = req.body.name;
    contactobj.email = req.body.email;
    contactobj.message = req.body.message;
    console.log(contactobj);
    let connectdb = new contact({
        name: contactobj.name,
        email: contactobj.email,
        message: contactobj.message
    })
    connectdb.save();
    res.redirect("submit");
});


app.get("/index", function (req, res) {
    res.render(__dirname + "/views/index")
});
app.get("/about", function (req, res) {
    res.render(__dirname + "/views/about")
});
app.get("/contact", function (req, res) {
    res.render(__dirname + "/views/contact")
});
app.get("/submit", function (req, res) {
    res.render(__dirname + "/views/submit")
});
// async  function getdata(){
//    const contact01 = await contact.find();
//   contactobj = (...contactobj , contact01)
//   console.log(contactobj);
// }
// app.get("/admin", function (req, res) {
//      getdata();
// console.log(contactobj);
//     res.render(__dirname + "/views/admin", {
//         contactobj

//     })
// });
// app.get('/admin', (req, res) => {
//     contact.find({}, (err, users) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const data = Object.assign({ title: 'Users' }, { users: users });
//         res.render('admin', data);
//       }
//     });
//   });
app.get('/admin',async (req, res) => {
    try {
        const users = await contact.find({});
        console.log(typeof users);  
        res.render('admin', {users});
        console.log(contactobj);
      } catch (error) {
        console.error(error);
      }
  });
app.post('/admin',async (req,res) => {
    const id = req.body.id;
    console.log(id);
    try {
        const users = await  contact.find({_id: id});
        console.log(users.name);  
        
        console.log(contactobj);
      } catch (error) {
        console.error(error);
      } 


    try {
        const deleteitem =await contact.deleteOne({_id: id});
        console.log("delete ");
    } catch (error) {
        console.log(error);
    }
    res.redirect("admin")
});
app.post('/index', (req,res) => {
    
    res.redirect('admin');
})

app.listen(port, () => console.log("server is runnig on 5500")) 