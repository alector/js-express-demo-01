var express = require("express")

var app = express()

// process.env is a global envirnment defined in my server
port = process.env.PORT || 3000

app.get("/", function (req_stream, res_stream) {

    var myhtml = "<html><body><h1>Hello my World!!!!</h1></body></html>"
    res_stream.send(myhtml)

})


app.get("/api", function (req_stream, res_stream) {

    var myjson = {name: "Peter", age:30}
    res_stream.json(myjson)

})


function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};


app.get("/request", function (req_stream, res_stream) {

    var myjson = req_stream
    var b =  simpleStringify(myjson)
    console.log(typeof(b))
    res_stream.json(b)

})



app.get("/blog/:id", function (req_stream, res_stream) {

    var myhtml = '<html><body><h1>Hello my World!!!!</h1><p> You are searching for: ' + req_stream.params.id + '</p></body></html>'

    res_stream.send(myhtml)

})


// run http server in port 3000
app.listen(port)