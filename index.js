const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//viewport
app.set('view engine', 'html');


app.use(express.static(path.join(__dirname, 'public')));


//serve the home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home1.html'));
});
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
//serve the dashboard
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


//Register user(functionality for signup)
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collection.findOne({ email: data.email });

    if (existingUser) {
        res.send("User already exist. You can login now.");
        
    }
    else {
        //hash password for privacy using bcrypt
        const saltRounds = 10; //Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        // res.send("Signup successfully");
        res.send("Signup sucessfully");
    
    }


});

// login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.send("user not found!!")
        }

        //comparing the hash password from the data base with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.redirect(`/dashboard?username=${check.name}`);
        }
        else {
            req.send("worng password");
        }
    } catch {
        res.send("worng details");

    }
})



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})