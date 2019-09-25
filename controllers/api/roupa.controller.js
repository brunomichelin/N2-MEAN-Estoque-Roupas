var config = require('config.json');
var express = require('express');
var router = express.Router();
var RoupaService = require('services/roupa.service');

// routes
router.post('/create', createItem);
router.delete('/:_id', deleteItem);
router.get('/list/:userid', getallItem);

module.exports = router;

function createItem(req, res) {
    RoupaService.createItem(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getallItem(req, res) {
    RoupaService.getallItem(req.params.userid).then(function (item)
     {
                res.send(item);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

   }
   function deleteItem(req, res) {
    RoupaService.delete(req.params._id).then(function ()
     {
         res.sendStatus(200);
     })
        .catch(function (err) {
            res.status(400).send(err);
        });
    }
