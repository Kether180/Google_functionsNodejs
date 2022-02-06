const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");
const { snapshotConstructor } = require("firebase-functions/v1/firestore");
admin.initializeApp();
const db = admin.firestore();

// Requesting simple http API express.js and Firebase DB



//// USER API FUNCTION  - put back out data from

app.get('/', async (req, res) => {

    const snapshot  =  await admin.firestore().collection('users').get();

    let users = [];

    snapshot.forEach(doc => {

        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(users))

});

/// GET request to get 1 user USER FUNCTION

app.get("/id", async (req, res) => {

    const snapshot = await admin.firestore().collection('users').doc(req.params.id).get();

    const userId = snapshot.id;

    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));

})


// USERS API FUNCTION ///////////////////////////////


app.post('/', async (req, res) => {
    const user = req.body;

    await admin.firestore().collection('users').add(user);
    res.status(201).send();

});

// Put request to update individual user

app.put("/:id", async (req, rest) => {

    const body = req.body;

    await admin.firestore().collection('users').doc(req.params.id).update(body);
        
    res.status(200).send()

});

///

app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("users").doc(req.params.id).delete();

    res.status(200).send();
})


// Requesting simple http API
exports.user = functions.https.onRequest(app);


exports.helloMakeImpact = functions.https.onRequest((request, response) => {
    response.send("Hello Make Impact :)!");

});






// LOGIN API - PUSH NOTIFICATIONS AND WELCOME EMAIL FUNCTIONS.

exports.onUserCreate = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
    const values = snap.data();

    //send email

    await db.collection('loggin').add({ description: `Email was sent to user with username:${values.username} `});
  })


  // REVIEWS API  FUNCTION - 

exports.onUserUpdate = functions.firestore.document('users/{userId}').onUpdate(async (snap, context) => {
    const newValues = snap.after.data();

    const previousValues = snap.before.data();

    if (newValues.username !== previousValues.username) {
        const snapshot = await db.collection('reviews').where('username', '==', previousValues.username).get();

        let updatePromises = [];
        snapshot.forEach(doc => {
            updatePromises.push(db.collection('reviews').doc(doc.id).update({ username: newValues.username }));
        });

        await Promise.all(updatePromises);
    }
    })


    //POSTS API FUNCTION - DELETE

exports.onPostDelete = functions.firestore.document('posts/{postId}').onDelete(async (snap, context) => {
    const deletedPost = snap.data();

    let deletePromises = [];
    const bucket = admin.storage().bucket();

    deletedPost.images.forEach(image => {
        deletePromises.push(bucket.file(image).delete());
    });

    await Promise.all(deletePromises);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//