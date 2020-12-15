let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let clients = [
   {name: "Harry Potter ",
    email: "Harry@grffondor.com",
    amount: "100 $",
    message: "Happy New Year",
    num: "14745577551452",}

   
    
];
app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "template.ejs"), {clients: clients}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
     let options = {
            "height": "12.25in",
            "width": "10.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile("giftcard.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
    }
});
})
app.listen(3000);