const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const api = express.Router()

// Connexion à la base de données
var mysql = require('mysql');
const { request } = require('express');

// File System pour parcourir l'ensemble des fichiers d'un répertoire
const fs = require('fs');

/**
 * Avant de se connecter, exécuter la commande suivante sur la console mysql pour configurer l'authentification de l'utilisateur root
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '@toDbm20!'; 
*/ 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '@toDbm20!',
    database : 'visuum_db'
  });
   
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected to database as id ' + connection.threadId);
});

/***
 * Requêtes d'extraction de données sur le serveur de base de données
*/

/**
 * Renvoie l'ensemble des boutiques
*/
api.get('/shops', (req, res) => {
    let request = 'SELECT * FROM shop;'
    connection.query(request, (err, result, fields) => {
        res.json({ success: true, shops: result})
    })
})

/**
 * Boutique en fontion d'un id
 */
api.get('/shops/:id', (req, res) => {
    let request = `SELECT * FROM shop WHERE shop_id = ${connection.escape(req.params.id)};`
    connection.query(request, (err, result, fields) => {
        if(err) throw err;
        if(result.length  === 1) {
            shop_found = result[0]

            fs.readdir('/home/karim/code/node/visuum' + shop_found.pictures, (errf, files) => {
                if(errf) return console.error(errf);
                images_path = files.join('|||')
                res.json({ success: true, shop_found, images_path});
            });
          } else {
            res.json({ success: false, message: `Il n'y a pas de boutique correspondant à l'id ${req.params.id}`});
          }
    })
})

/**
 * Rercherche d'une boutique en fonction de sa catégorie de son nom ou de sa localisation 
 * Toutes les variables de recherches sont optionnelles 
 */
api.get('/search', (req, res) => {
    let category = ''
    let name = ''
    let location = ''

    if(req.query.category) {
        category = connection.escape(parseInt(req.query.category))
    }

    if(req.query.name) {
        name = connection.escape(req.query.name)
    }

    if(req.query.location) {
        location = connection.escape(req.query.location)
    }

    if(isNaN(category)) throw `Le paramètre '${req.query.category}' doit être un nombre`
    
    let request =  'SELECT * FROM shop'
    
    categoryFilter = ''
    nameFilter = ''
    locationFilter = ''

    if(category != 0) {
        categoryFilter += 'type_of_shops_id = ' + category
    }
    
    if(name) {
        name = name.toLowerCase().trim()
        nameFilter = "name LIKE '%" + name.substring(1, name.length - 1) + "%'"
    }

    if(location) {
        location = location.toLowerCase().trim()
        let locationStr = location.substring(1, location.length - 1)
        locationFilter = "(district LIKE '%" + locationStr + "%' OR sub_prefecture LIKE '%" + locationStr + "%')"
    }

    if(categoryFilter || nameFilter || locationFilter) {
        request += ' WHERE ' + [categoryFilter, nameFilter, locationFilter].filter(Boolean).join(" AND ")
    }

    request += ';'

    connection.query(request, (err, result, fields) => {
        if(err) throw err;
        if(result.length >= 1) {
            res.json({ success: true, shops: result})
        } else {
            res.json({ success: false, message: 'Aucun résultat ne correspond à votre recherche'});
        }
    })

})

app.use('/api', api)

const port = 4201

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})