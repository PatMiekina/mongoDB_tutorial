const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const router = express.Router();
module.exports = router;

const Model = require('../models/user');

// Fake CRUD Actions
//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

// CRUD Actions

// Read All
// router.get('/users', async (req, res) => {
//     try{
//         const data = await Model.find();
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// // Read one by ID
// router.get('/users/:id', (req, res) => {
//     res.send(req.params.id)
// })

// // Create
// router.post('/users/new', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//         age: req.body.age
//     })

//     try {
//         // try to save the data, await makes the request asnchronous
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         // if error occurs the error message is registered
//         res.status(400).json({message: error.message})
//     }
// })

// // Update
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )
//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// // Delete
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })



// Routes from previous tutorials:

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

router.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/start.html'))
})

router.get('/template', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/template.html'))
})

// Routes from previous tutorials above