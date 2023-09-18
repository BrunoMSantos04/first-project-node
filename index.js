const express = require('express')
const uuid = require('uuid')

const port = 3000
const server = express()
server.use(express.json())

const users = []

const checkUserId = (request, response,next) => {
    const {id} = request.params
    
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({message: "User not found.."})
    }

    request.userIndex = index
    request.userId = id

    next()
}

server.get('/users', (request, response) => {
    console.log('A rota foi chamada')
    return response.json(users)
})

server.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

server.put('/users/:id', checkUserId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId 

    const updateUser = {id, name ,age}

    users[index] = updateUser

    return response.json(updateUser)
})

server.delete('/users/:id', checkUserId, (request, response) => {
     const index = request.userIndex
     users.splice(index,1)

    return response.status(204).json()
})





server.listen(port, () => {
    console.log('launched')
})
