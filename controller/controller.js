const express = require('express')
const fs = require('fs')

function Uid () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

class Controller {
    
    homepage(req,res) {
        res.render('index', {title: "Home page"})
    }
    addRender(req, res) {
        res.render('add_event')
    }
    addFunction(req,res) {
        const name = req.body.name
        const description = req.body.description
        const location = req.body.location
        const date = req.body.date

        fs.readFile('./database/db.json', (err, data) => {
            if(err){
                console.log(err)
            }
            const event = JSON.parse(data)

            event.push({
                id: Uid(),
                name:name,
                description: description,
                location:location,
                date:date
            })
            fs.writeFile('./database/db.json', JSON.stringify(event), err => {
                if(err){
                    console.log(err)
                }
                res.render('index')
            })
        })
    }
    listRender(req,res){
        fs.readFile('./database/db.json', (err, data)=>{
            if(err){
                console.log(err)
            }
    
            const event = JSON.parse(data)
            res.render('list', 
            {
                events: event
            })
    
        })
    }
    deleteFunction (req,res) {
        const id = req.params.id

        fs.readFile('./database/db.json', (err, data) =>{
            if(err){
                console.log(err)
            }

        const events = JSON.parse(data)
        const event = events.filter(event => event.id != id)

        fs.writeFile('./database/db.json', JSON.stringify(event), (err) =>{
            if(err){
                console.log(err)
            }
            res.render('list', {events: event, deleted:true})
        })
        })
    }
    editFunction(req,res) {
        const id = req.params.id
        
        fs.readFile('./database/db.json', (err, data) => {
            if(err){
                console.log(err)
            }
            const events = JSON.parse(data)
            const event = events.filter(event => event.id == id)[0]

            res.render('edit_event', {event: event})
        })
    }
    insertEdit(req,res) {
        const id = req.body.id

        fs.readFile('./database/db.json', (err, data) => {
            if(err){
                console.log(err)
            }
            const events = JSON.parse(data)

            const event = events.filter(event => event.id == id)
            console.log(event)

            event.name = req.body.name;
            event.description = req.body.description;
            event.location = req.body.location;
            event.date = req.body.date;

            fs.writeFile('./database/db.json', JSON.stringify(events), err => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                    return;
                }
    
                res.render('index');
            })
        })
    }
}
module.exports =  new Controller()