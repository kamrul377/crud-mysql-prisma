

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const dotenv = require('dotenv')

require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/all', async (req, res) => {

    const alluser = await prisma.user.findMany();

    res.json(alluser)
})

app.get('/getOne/:id', async (req, res) => {
    const id = req.params.id;
    const oneUser = await prisma.user.findUnique()

    res.json(oneUser)
})


app.post('/create', async (req, res) => {
    const newUser = await prisma.user.create({ data: req.body })
    res.json(newUser)
})
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const newAge = req.body.age;
    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        }, data: {
            age: newAge
        }
    })
    res.json(updatedUser)
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.json(deleteUser)
})

app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
})
