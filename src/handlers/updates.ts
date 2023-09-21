import prisma from "../db"

// Get all
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
    res.json({data: updates})
}

//Get one product
export const getOneUpdate = async (req, res) => {
    const id = req.params.id
    const update = await prisma.update.findFirst({
        where: {
            id: id,
        }
    })

    res.json({data: update})
}

//Create update
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id_belongsToId: {
                id: req.body.productId,
                belongsToId: req.user.id
            }
        }
    })

    if (!product) {
        return res.json({message: 'not your product'})
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            version: req.body.version,
            asset: req.body.asset,
            product: {connect: {id:product.id}}
        }
    })

    res.json({data: update})
}

//Update update
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if(!match) {
        return res.json({message: 'not your product'})
    }



    const updated = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body.version,
            asset: req.body.asset
        }
    })

    res.json({data: updated})
}

//Delete update
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if(!match) {
        return res.json({message: 'not your product'})
    }



    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id,
        }
    })

    res.json({data: deleted})
}
