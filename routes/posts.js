const {
    response
} = require('express');
var express = require('express');

const models = require('../models/index');
var router = express.Router();

/* Router mengambil semua data artikel */
router.get('/', async function (req, res, next) {
    try {
        // mengambil semua data
        const posts = await models.posts.findAll({});

        if (posts.length !== 0) {
            res.json({
                'status': '200',
                'message': 'Success',
                'data': posts
            });
        } else {
            res.json({
                'status': '204',
                'message': 'Empty',
                'data': {}
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': '404',
            'message': 'Error',
            'error': err
        })
    }
});

// router membuat artikel baru
router.post('/', async function (req, res, next) {
    try {
        // tangkap data yang dikirim melalui dikirm melalui request body
        const {
            title,
            content,
            tags,
            published
        } = req.body;

        // membuat data bari di db menggunakan method create
        const post = await models.posts.create({
            title,
            content,
            tags,
            published
        });

        // jika data berhasil dibuat, kembalikan response denga kode 201 dan status ok
        if (post) {
            res.status(201).json({
                'status': '201',
                'messages': 'Data sukses ditambah',
                'data': post
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': '404',
            'messages': err.message
        })
    }
})

// router mengambil data per id
router.get('/:id', async function (req, res, next) {
    try {
        // menangkap param ID
        const id = req.params.id;
        const post = await models.posts.findByPk(id);

        if (post) {
            res.json({
                'status': '200',
                'message': '',
                'data': post
            });
        } else {
            res.status(404).json({
                'status': '404',
                'message': 'Not Found',
                'data': null
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': '404',
            'message': 'Error'
        })
    }
})

// route mengupdate data per id
router.put('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const {
            title,
            content,
            tags,
            published
        } = req.body

        const post = await models.posts.update({
            title,
            content,
            tags,
            published
        }, {
            where: {
                id: id
            }
        })

        if (post) {
            res.json({
                'status': '200',
                'messages': 'Update berhasil'
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': '404',
            'messages': err.message
        })
    }
});

// router hapus per id
router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const post = models.posts.destroy({
            where: {
                id: id
            }
        })

        if (post) {
            res.json({
                'status': '200',
                'messages': 'Hapus sukses'
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': '404',
            'messages': err.message
        })
    }
})

module.exports = router;