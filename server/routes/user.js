const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();



app.get('/user', function(req, res) {



    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);


    User.find({ status: true }, 'name email role status google role img') /** como segundo parametro mandamos las exclusiones */
        .skip(since)
        .limit(5)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.count({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    quantum: count

                });
            });
        });
});

app.post('/user', function(req, res) {

    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.put('/user/:id', function(req, res) {

    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.delete('/user/:id', function(req, res) {
    const id = req.params.id;
    let changeStatus = {
            status: false
        }
        // User.findByIdAndRemove(id, changeStatus, { new: true }, (err, deleteUser) => {
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, deleteUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!deleteUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no Encontrado'
                }

            });
        }
        res.json({
            ok: true,
            user: deleteUser
        });
    })
});

module.exports = app;