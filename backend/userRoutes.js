const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")

let userRoutes = express.Router()
let SALT_ROUNDS = 6

//#1 - Retrieve All
userRoutes.route("/users").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").find({}).toArray()
    if(data.length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").findOne({_id: new ObjectId(request.params.id)})
    if(Object.keys(data).length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found :(")
    }
})

//#3 - Create One
userRoutes.route("/users/").post(async (request, response) => {
    let db = database.getDb()

    const takenEmail = await db.collection("users").findOne({email: request.body.email})

    if(takenEmail) {
        response.json({message: "The Email is taken"})
    }
    else {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        }
        let data = await db.collection("users").insertOne(mongoObject)
        response.json(data)
    }

})

//#4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        joinDate: request.body.joinDate,
        posts: request.body.posts
    }
    }
    let data = await db.collection("users").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

//#5 = Delete One
userRoutes.route("/users/:id").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

//#6 - Login
userRoutes.route("/users/login").post(async (request, response) => {
    let db = database.getDb()

    const user = await db.collection("users").findOne({email: request.body.email})

    if (user) {
        let confirmation = bcrypt.compare(request.body.password, user.password)
        if (confirmation) {
            response.json({success: true, user})
        } else {
            response.json({success: false, message: "Incorrect password"})
        }
    } else {
        response.json({success: false, message: "User not found"})
    }

})

module.exports = userRoutes