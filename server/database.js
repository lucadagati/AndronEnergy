var sqlite3=require('sqlite3').verbose();
var bcrypt=require('bcrypt');

const DBSOURCE="db.sqlite";


let db= new sqlite3.Database(DBSOURCE,(err)=>{
    if(err){
        console.log("Error opening the database:",err);
    }
    else{
        

        console.log("Connected to sql database");
        
        /*db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text UNIQUE, 
            username text UNIQUE,
            password text, 
            random_val text UNIQUE,
            active INTEGER NOT NULL DEFAULT 0 CHECK(active IN(0,1)),
            CONSTRAINT email_unique UNIQUE (email)
            )`,(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    var insert = 'INSERT INTO user (email,username, password) VALUES (?,?,?)'
                    db.run(insert, ["paonelucio97@gmail.com",'admin',bcrypt.hashSync("blodines2",10)])
                    //db.run(insert, ["user","user@example.com",md5("user123456")])
                }
            
            })
        db.run(`CREATE TABLE token (
            token_data TEXT NOT NULL,
            username text PRIMARY KEY,
            FOREIGN KEY (username) REFERENCES user (username) 
            )`,(err)=>{
                    if(err){
                        console.log(err);
                    }  
            })*/
    }
})

module.exports=db;