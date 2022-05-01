const { models } = require('../sequelize');
const { getIdParam } = require('../helpers/helpers');

async function getAll(req, res) {
    try {
        const figurinhas = await models.figurinhas.findAll();
        res.status(200).json(figurinhas);
    } catch (e) {
        res.status(500).send(e);
    }
};

async function getById(req, res) {
    try {
        const id = getIdParam(req);
        const figurinha = await models.figurinhas.findByPk(id);
        if (figurinha) {
            res.status(200).json(figurinha);
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

async function create(req, res) {
    try {
        if (req.body.id) {
            res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
        } else {
            await models.figurinhas
                .create(req.body)
                .then((obj) => {
                    res.status(201).location(`http://localhost:8080/api/figurinhas/${obj.id}`).end();
                });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

async function patch(req, res) {
    try {
        const id = getIdParam(req);
        // We only accept an UPDATE request if the `:id` param matches the body `id`
        const figurinha = await models.figurinhas.findByPk(id);
        if(!figurinha) {
            res.status(404).send(`Not found: param ID (${id}) does not exists on database.`)
            return;
        }
        if (req.body.id !== id ) {
            res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
            return;
        }
        await models.figurinhas.update(req.body, {
                    where: {
                        id: id
                    }
                });
        res.status(200).end();
    } catch (e) {
      res.status(500).send(e);
    }
};

async function update(req, res) {
    try {
        const id = getIdParam(req);
        const figurinha = await models.figurinhas.findByPk(id);
        if(figurinha) {
            await patch(req, res)
        } else {
            req.body.id = null;
            await create(req, res)
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

async function remove(req, res) {
    try {
        const id = getIdParam(req);
        await models.figurinhas.destroy({
            where: {
                id: id
            }
        });
        res.status(200).end();
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    patch,
    update,
    remove,
};
