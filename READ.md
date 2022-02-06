1. Create DB on Firebase.
2. Create Environment for coding, write down firebase login, firebase init to create a project.
3. Choose Firestore, Functions and Storage , existing project.
4. Language , JavaScript.

https://firebase.google.com/docs/cli

npm install -g firebase-tools@latest npm -

npm install firebase-functions
f
firebase serve - add firebase.json

always add firebase.json to your project.

Steps ///

firebase login

firebase projects:list

firebase use --add - pick the project when that doesn't work  - firebase use --project database01-42dff   

firebase use --clear Change project

firebase use makeimpact-test pick directly the project

Deploy functions //

firebase deploy

Serve and test your Firebase project locally////

You can view and test your Firebase project on locally hosted URLs before deploying to production. If you only want to test select features, you can use a comma-separated list in a flag on the firebase serve command.

Run the following command from the root of your local project directory if you want to do either of the following tasks: View the static content for your Firebase-hosted app. Use Cloud Functions to generate dynamic content for Firebase Hosting and you want to use your production (deployed) HTTP functions to emulate Hosting on a local URL.

firebase serve --only hosting

firebase deploy///

firebase deploy --only hosting
Deploying to Production:

firebase use makeimpact-54613
firebase deploy --only hosting
firebase use makeimpact-test (changing back to Test as a safety precaution)
Initialize a Firebase project ///

firebase init
Note: The firebase init command does not create a new directory. If you're starting a new app, you must first make a directory, then run firebase init from within that directory.

Serve and test your Firebase project locally////

You can view and test your Firebase project on locally hosted URLs before deploying to production. If you only want to test select features, you can use a comma-separated list in a flag on the firebase serve command.

Run the following command from the root of your local project directory if you want to do either of the following tasks: View the static content for your Firebase-hosted app. Use Cloud Functions to generate dynamic content for Firebase Hosting and you want to use your production (deployed) HTTP functions to emulate Hosting on a local URL.

firebase serve --only hosting

Deploy to a Firebase project/////

The Firebase CLI manages deployment of code and assets to your Firebase project, including:

New releases of your Firebase Hosting sites New, updated, or existing Cloud Functions for Firebase Rules for Firebase Realtime Database Rules for Cloud Storage for Firebase Rules for Cloud Firestore Indexes for Cloud Firestore To deploy to a Firebase project, run the following command from your project directory:

firebase deploy

You can optionally add a comment to each of your deployments. This comment will display with the other deployment information on your project's Firebase Hosting page. For example:

firebase deploy -m "Deploying the best new feature ever."

Deploy specific functions //////

When deploying functions, you can target specific functions. For example:

firebase deploy --only functions:function1

firebase deploy --only functions:function1,functions:function2

/// Another option is to group functions into export groups in your /functions/index.js file. Grouping functions allows you to deploy multiple functions using a single command.

For example, you can write the following functions to define a groupA and a groupB:

var functions = require('firebase-functions');

exports.groupA = { function1: functions.https.onRequest(...), function2: functions.database.ref('\path').onWrite(...) } exports.groupB = require('./groupB');

Trigger a function on Cloud Storage changes //

Use functions.storage to create a function that handles Cloud Storage events. Depending on whether you want to scope your function to a specific Cloud Storage bucket or use the default bucket, use one of the following:

functions.storage.object() to listen for object changes on the default Cloud Storage bucket. functions.storage.bucket('bucketName').object() to listen for object changes on a specific bucket. For example, the thumbnail generator sample is scoped to the default bucket for the project:

Cloud Storage supports these events//

onArchive //Only sent when a bucket has enabled object versioning. This event indicates that the live version of an object has become an archived version, either because it was archived or because it was overwritten by the upload of an object of the same name. onDelete // Sent when an object has been permanently deleted. This includes objects that are overwritten or are deleted as part of the bucket's lifecycle configuration. For buckets with object versioning enabled, this is not sent when an object is archived (see onArchive), even if archival occurs via the storage.objects.delete method. onFinalize // Sent when a new object (or a new generation of an existing object) is successfully created in the bucket. This includes copying or rewriting an existing object. A failed upload does not trigger this event. onMetadataUpdate // Sent when the metadata of an existing object changes. Set the event within the on event handler as shown above for onFinalize.


Cloud Firestore function triggers ////



The Cloud Functions for Firebase SDK exports a functions.firestore object that allows you to create handlers tied to specific Cloud Firestore events.

Event Type	Trigger
onCreate	Triggered when a document is written to for the first time.
onUpdate	Triggered when a document already exists and has any value changed.
onDelete	Triggered when a document with data is deleted.
onWrite	Triggered when onCreate, onUpdate or onDelete is triggered.


const functions = require('firebase-functions');

exports.myFunction = functions.firestore
  .document('my-collection/{docId}')
  .onWrite((change, context) => { /* ... */ });


  git init -b main for ==> gitignore file