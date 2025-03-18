import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});
var titles=[];
var author_names=[];
var descriptions=[];
app.post("/submit",(req,res)=>{
    let title=req.body['title'];
    let author_name=req.body['author_name'];
    let description=req.body['description'];
    titles.push(title);
    author_names.push(author_name);
    descriptions.push(description);

    res.redirect("/MyBlogs")
});

app.get("/MyBlogs",(req,res)=>{
    res.render("MyBlogs.ejs",
        {titles:titles,
         author_names:author_names,
         descriptions:descriptions,
        }
    );
});

app.get("/create1",(req,res)=>{
    res.render("create1.ejs");
});

app.get("/home1",(req,res)=>{
    res.render("home1.ejs");
});

app.get("/blogPage",(req,res)=>{
    const{index}=req.query;
    res.render("blogPage.ejs",{title:titles[index],author_name:author_names[index],description:descriptions[index]});
});

app.get("/delete",(req,res)=>{
    const{title}=req.query;
    let index=titles.indexOf(title);
    if(index!=-1){
        titles.splice(index,1);
        author_names.splice(index,1);
        descriptions.splice(index,1);
    };
    res.redirect("/MyBlogs")
})
app.get("/edit",(req,res)=>{
    const index=Number(req.query.index);
    res.render("edit.ejs",{index:index,title:titles[index],
        author_name:author_names[index],
    description:descriptions[index]});
});



app.post("/submit1", (req, res) => {
    const index = Number(req.body.index); // Convert to number
    if (index !== -1) {
        titles[index] = req.body.new_title;
        author_names[index] = req.body.new_author_name;
        descriptions[index] = req.body.new_description;
    }
    res.redirect("/MyBlogs");
});

app.listen(port,()=>{
    console.log("Port is runnig successfully");
});