 // Importations
const db = require('../dbConnect');
const fs = require('fs');

const projectBasePath = '/home/karim/code/node'
const imgSrcFolder = '/visuum/src/assets/images/shops'

var pool = db.getPool()

module.exports = {
    /**
     * Renvoie l'ensemble des boutiques de la base de données
     * @param {*} req 
     * @param {*} res 
    */
    getAll: (req, res) => {
        const query = 'SELECT * FROM shop;'
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(query, (err, result) => {
                if (err) return res.status(500).json({ 'error': 'unable to get shops' })
                res.status(200).json({
                    'shops': result
                })
            })
            connection.release();
        })
    },
    /**
     * Renvoie la boutique dont le nom correspond au paramètre
     * @param {*} req 
     * @param {*} res 
     */
    getShopByName: (req, res) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            const query = `SELECT * FROM shop WHERE name = ${connection.escape(req.params.name)};`
            connection.query(query, (err, result) => {
                if(err) return res.status(500).json({ 'message': 'unable to get shop' })
                if(result.length  === 1) {
                    shopFound = result[0]
                    fs.readdir(projectBasePath + imgSrcFolder + shopFound.pictures, (errf, files) => {
                        if(errf) return console.error(errf);
                        imagesPath = files.join('|||')
                        res.status(200).json({
                            'shop_found': shopFound,
                            'images_path': imagesPath
                        });
                    });
                  } else {
                    return res.status(404).json({ message: `the shop ${req.params.name} not exist`});
                  }
            })
            connection.release();
        })
    },
    /**
     * Rercherche d'une boutique en fonction de sa catégorie de son nom ou de sa localisation 
     * Toutes les variables de recherches sont optionnelles 
     */
    searchShop: (req, res) => {
        pool.getConnection(function(err, connection) {
            var category = ''
            var name = ''
            var location = ''
            if (err) throw err; // not connected!
            if(req.query.categorie) {
                category = connection.escape(parseInt(req.query.categorie))
                if(isNaN(category)) return res.status(400).json({ 
                    success: false, 
                    message: `invalid parameter ${req.query.categorie}, must be number` 
                })
            }
            if(req.query.nom) {
                name = connection.escape(req.query.nom)
            }
            if(req.query.localisation) {
                location = connection.escape(req.query.localisation)
            }

            let query =  'SELECT * FROM shop'
            categoryFilter = ''
            nameFilter = ''
            locationFilter = ''

            if(category != 0) {
                categoryFilter = 'type_of_shops_id = ' + category
            }
            if(name) {
                name = name.toLowerCase().trim()
                nameFilter = "name LIKE '%" + name.substring(1, name.length - 1) + "%'"
            }
            if(location) {
                location = location.toLowerCase().trim()
                locationStr = location.substring(1, location.length - 1)
                locationFilter = "(district LIKE '%" + locationStr + "%' OR sub_prefecture LIKE '%" + locationStr + "%')"
            }

            if(categoryFilter || nameFilter || locationFilter) {
                query += ' WHERE ' + [categoryFilter, nameFilter, locationFilter].filter(Boolean).join(" AND ")
            }
            query += ';'
            connection.query(query, (err, result) => {
                if(err) res.status(500).json({ 
                    success: false, 
                    message: 'cannot fetch shop' 
                });
                if(result.length >= 1) {
                    res.status(200).json({ 
                        success: true,
                        shops_found: result
                    })
                } else {
                    res.json({ 
                        success: false, 
                        message: 'no shop found'
                    });
                }
            })

            connection.release();
        })
    }
}