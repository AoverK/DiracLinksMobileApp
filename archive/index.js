const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Setup nvm
// nvm install 12.13.0
// nvm use 12.13.0
// firebase deploy
// firebase deploy --only hosting
// firebase deploy --only functions
// https://xscapepublishing-prod.web.app/
// https://xscapepublishing-prod.web.app/login
// https://xscapepublishing-prod.web.app/dashboard

// Set environment variable GOOGLE_APPLICATION_CREDENTIALS
// Instructions here https://firebase.google.com/docs/admin/setup#windows


//const authMiddleware = require('./authMiddleware');
const uuidAPIKey = require('uuid-apikey');
const apiKeyMiddleware = require('./apiKeyMiddleware');

// For Unique Hash Generation
const crypto = require('crypto');

// Setup Express Middleware
const express = require("express");
const app = express();

// For making the entire application secure
//app.use(authMiddleware);
//app.use(apiKeyMiddleware);


// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require("firebase-admin");

//var serviceAccount = require('../../xscapepublishing-prod-firebase-adminsdk-qw6e7-6960efb50b.json');
/* admin.initializeApp({
    //credential: admin.credential.cert(serviceAccount),
    serviceAccountId: 'firebase-adminsdk-qw6e7@xscapepublishing-prod.iam.gserviceaccount.com'
}); */

/* admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xscapepublishing-prod-default-rtdb.firebaseio.com"
}); */


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://xscapepublishing-prod-default-rtdb.firebaseio.com"
});

// Setup Google Cloud Logging
const { Logging } = require("@google-cloud/logging");
const logging = new Logging();

var url = require('url');
const { timeStamp } = require("console");
// var url = require('url').URL;
// var myURL = new URL('https://app.xscapepublishing.com');

// Setup Stripe (Live Credentials)
const stripe = require("stripe")(functions.config().stripe.token);
const webhookSecret = functions.config().stripe.webhook_secret; //Webhook Secret (Test or Live)

// Setup Stripe (Test Credentials)
//const stripe = require("stripe")(functions.config().stripe.test_token);
//const webhookSecret = functions.config().stripe.test_webhook_secret; //Webhook Secret (Test or Live)

// Stripe Settings (Not Used)
const currency = functions.config().stripe.currency || 'USD';
const publishableKey = functions.config().stripe.publishable_key; // Stripe Public Key (PK)

//firebase functions:config:set stripe.publishable_key="[SAMPLE]" stripe.webhook_secret="[SAMPLE]"
//firebase functions:config:set stripe.test_token="sk_test_r7KHiBOyPrPdi2TD7guDzmBX" stripe.test_webhook_secret="whsec_NTzXK5PXjF2JelcpKwzssXlswbmMeo30"
// Setup CORS
// const cors = require("cors")({origin: "https://app.xscapepublishing.com"}); // Production
// const cors = require('cors')({ origin: 'http://localhost:4200' }); // Local Testing
//const cors = require('cors')({ origin: false });
//const cors = require('cors')({ origin: true }); //https://firebase.google.com/docs/functions/http-events
const cors = require('cors')({ origin: "https://app.xscapepublishing.com" }); //https://firebase.google.com/docs/functions/http-events
app.use(cors);


// Create Zapier ID Hash
// z.hash('md5', item.id + item.updated_at)
/* var crypto = require('crypto');
var emailStr = 'your@email.com';
var hashStr = crypto.createHash('md5').update(emailStr).digest('hex'); */



// When a user is created, register them with Stripe and create a skiptrace user
exports.createStripeCustomer = functions.auth.user().onCreate(async(user) => {
    //user.sendEmailVerification();
    var stripeCustomerDescription = "Xscape Publishing Author"
    const stripeCustomer = await stripe.customers.create({ email: user.email, description: stripeCustomerDescription });

    const stripeConnectAccount = await stripe.accounts.create({
        country: 'US',
        type: 'express',
        email: user.email,
        business_profile: {
            name: user.email,
        },
        capabilities: {
            card_payments: {
                requested: true,
            },
            transfers: {
                requested: true,
            },
            tax_reporting_us_1099_misc: {
                requested: true,
            }
        },
    });

    const apiIdKey = uuidAPIKey.create();

    //await admin.firestore().collection('authors').doc(user.uid).set({ apiKey: apiIdKey.uuid, email: user.email, display_name: user.displayName, fullName: user.displayName, photo_url: user.photoURL, stripeConnectAccount: stripeConnectAccount, stripeCustomerId: stripeCustomer.id, uid: user.uid });
    return await admin.firestore().collection('authors').doc(user.uid).set({ apiKey: apiIdKey.apiKey, billingSetup: false, email: user.email, display_name: user.displayName, fullName: user.displayName, paymentSetup: false, photo_url: user.photoURL, stripeConnectAccount: stripeConnectAccount.id, stripeCustomerId: stripeCustomer.id, uid: user.uid, uuid: apiIdKey.uuid });
});

// Public Facing API Endpoints
// This endpoint recieves a queryparam with email
app.get('/account-link', async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let queryParams = req.query;
    //console.log('queryParam');
    let userEmail = queryParams.email;
    const authorsRef = admin.firestore().collection("authors");
    const queryRef = await authorsRef.where('email', '==', userEmail).get();
    const authorStripeConnectAccount = await queryRef.docs[0].data().stripeConnectAccount;
    const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    //console.log(userEmail, ":", expressAccountLink.url);
    res.send(expressAccountLink.url);
});

app.get('/connect-link', async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let queryParams = req.query;
    //console.log('queryParam');
    let userEmail = queryParams.email;
    const authorsRef = admin.firestore().collection("authors");
    const queryRef = await authorsRef.where('email', '==', userEmail).get();
    const authorStripeConnectAccount = await queryRef.docs[0].data().stripeConnectAccount;
    console.log(authorStripeConnectAccount);

    const connectAccountLinks = await stripe.accountLinks.create({
        account: authorStripeConnectAccount,
        refresh_url: 'https://app.xscapepublishing.com/reauth',
        return_url: 'https://app.xscapepublishing.com/payments-setup',
        type: 'account_onboarding',
    });
    res.send(connectAccountLinks.url);
});

// Re-add 
app.post("/connect-account/delete", async(req, res) => {

    var account = req.query.account;

    const deleted = await stripe.accounts.del(account.toString());


    return res.status(200).send(deleted);

});

// API OAuth2 Endpoint
// For Zapier Integration
// /login/oauth2/authorize
// https://medium.com/@nathangilson/how-to-add-oauth-v2-to-a-zapier-integration-with-firebase-6fba2a12cd54
/* app.get('/oauth/authorize', async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let queryParams = req.query;
    console.log('queryParam');
    let userEmail = queryParams.email;
    const authorsRef = admin.firestore().collection("authors");
    const queryRef = await authorsRef.where('email', '==', userEmail).get();
    const authorStripeConnectAccount = await queryRef.docs[0].data().stripeConnectAccount;
    const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    console.log(userEmail, ":", expressAccountLink.url);
    res.send(expressAccountLink.url);

}); */

// Example of only applying authMiddleware to a single endpoint
// app.get("/order", authMiddleware, (req, res) => 
// Test Endpoint that isn't complete need to get reverse chronological order of orders for an author and specific product

app.get("/order", apiKeyMiddleware, (req, res) => {
    //console.log("Order Request");
    //console.log(req);

    return res.status(200).send('[{ "id" : "001", "order" : "abcde1234" }, { "id" : "002", "order" : "1234abcde" }]');

});


// Re-add 
app.post("/order", apiKeyMiddleware, async(req, res) => {

    var { address_1, address_2, city, country_code, email, full_name, postal_code, product, quantity, retail_price, state } = req.body;

    const currentTimestamp = admin.firestore.Timestamp.now();
    const basicHash = crypto.createHash('md5');
    const uniqueHash = crypto.createHash('md5').update(basicHash + currentTimestamp).digest("hex");

    const id = uniqueHash;
    const order_id = uniqueHash;

    // Set variables
    const author = res.locals.author_fullName;
    const author_id = res.locals.author_uuid;
    const current_status = "new";
    const previous_status = "";
    const created = currentTimestamp.toDate().toISOString();
    const created_seconds = currentTimestamp.seconds;
    const updated = currentTimestamp.toDate().toISOString();
    const updated_seconds = currentTimestamp.seconds;

    if (typeof address_2 == 'undefined') {
        address_2 = "";
    }

    await admin.firestore().collection('orders').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });
    await admin.firestore().collection('orders_new').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });

    var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "author": author, "author_id": author_id, "city": city, "country_code": country_code, "created": created, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated": updated, "updated_seconds": updated_seconds });

    return res.status(200).send(data);

});

// Re-add 
app.post("/order/fulfilled", apiKeyMiddleware, async(req, res) => {

    const { address_1, address_2, city, country_code, email, full_name, postal_code, product, quantity, retail_price, state } = req.body;

    const currentTimestamp = admin.firestore.Timestamp.now();
    const basicHash = crypto.createHash('md5');
    const uniqueHash = crypto.createHash('md5').update(basicHash + currentTimestamp).digest("hex");

    const id = uniqueHash;
    const order_id = uniqueHash;

    // Set variables
    const author = res.locals.author_fullName;
    const author_id = res.locals.author_uuid;
    const current_status = "fulifilled";
    const previous_status = "";
    const created = currentTimestamp.toDate().toISOString();
    const created_seconds = currentTimestamp.seconds;
    const updated = currentTimestamp.toDate().toISOString();
    const updated_seconds = currentTimestamp.seconds;

    await admin.firestore().collection('orders').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });
    await admin.firestore().collection('orders_fulfilled').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });

    var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "author": author, "author_id": author_id, "city": city, "country_code": country_code, "created": created, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated": updated, "updated_seconds": updated_seconds });

    return res.status(200).send(data);

});


// Re-add 
app.post("/order/cancelled", apiKeyMiddleware, async(req, res) => {

    const { address_1, address_2, city, country_code, email, full_name, postal_code, product, quantity, retail_price, state } = req.body;

    const currentTimestamp = admin.firestore.Timestamp.now();
    const basicHash = crypto.createHash('md5');
    const uniqueHash = crypto.createHash('md5').update(basicHash + currentTimestamp).digest("hex");

    const id = uniqueHash;
    const order_id = uniqueHash;

    // Set variables
    const author = res.locals.author_fullName;
    const author_id = res.locals.author_uuid;
    const current_status = "cancelled";
    const previous_status = "";
    const created = currentTimestamp.toDate().toISOString();
    const created_seconds = currentTimestamp.seconds;
    const updated = currentTimestamp.toDate().toISOString();
    const updated_seconds = currentTimestamp.seconds;

    await admin.firestore().collection('orders').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });
    await admin.firestore().collection('orders_cancelled').doc(id).set({ address_1: address_1, address_2: address_2, author: author, author_id: author_id, city: city, country_code: country_code, "created": created, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated: updated, updated_seconds: updated_seconds });

    var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "author": author, "author_id": author_id, "city": city, "country_code": country_code, "created": created, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated": updated, "updated_seconds": updated_seconds });

    return res.status(200).send(data);

});

// Add Products
app.post("/product", apiKeyMiddleware, async(req, res) => {

    const { description, format, medium, retail_price, subtitle, title } = req.body;

    // Create a Timestamp and Hash based on the Timestamp
    const currentTimestamp = admin.firestore.Timestamp.now();
    const basicHash = crypto.createHash('md5');
    const uniqueHash = crypto.createHash('md5').update(basicHash + currentTimestamp).digest("hex");

    // Assign the Hash and Timestamp values to variables
    const id = uniqueHash;
    const product_id = uniqueHash;
    const created = currentTimestamp.toDate().toISOString();
    const created_seconds = currentTimestamp.seconds;
    const updated = currentTimestamp.toDate().toISOString();
    const updated_seconds = currentTimestamp.seconds;
    //const created_ISO = new Date(currentTimestamp.seconds * 1000).toLocaleString('en-US', { timeZone: 'America/New_York', hourCycle: 'h24' });

    // Set the other variables not previously set
    const author = res.locals.author_fullName;
    const author_id = res.locals.author_uuid;
    const asin = "";
    const cover_style = "";
    const default_fulfillment_channel = "";
    const deliverr_fulfillment_fee = "";
    const deliverr_storage_fee = "";
    const ean = "";
    const height_english = "";
    const height_metric = "";
    const inventory_amazon_us_fba = "";
    const inventory_amazon_us_fbm = "";
    const inventory_deliverr = "";
    const inventory_ingram = "";
    const inventory_shipbob = "";
    const inventory_xp = "";
    const interior_color = "";
    const isbn12 = "";
    const isbn9 = "";
    const length_english = "";
    const length_metric = "";
    const linked_products = "";
    const pages = "";
    const printing_xp = "";
    const printing_ingram = "";
    const printing_amazon = "";
    const related_products = "";
    const shipbob_fulfillment_fee = "";
    const shipbob_storage_fee = "";
    const sku = "";
    const upc = "";
    const weight_english = "";
    const weight_metric = "";
    const wholesale_price = "";
    const width_english = "";
    const width_metric = "";
    const xp_fulfillment = "";
    const xp_storage = "";

    //await admin.firestore().collection('orders').doc(id).set({ address_1: address_1, address_2: address_2, city: city, country_code: country_code, created_date: created_date, created_seconds: created_seconds, current_status: current_status, email: email, full_name: full_name, id: id, order_id: order_id, postal_code: postal_code, previous_status: previous_status, product: product, quantity: quantity, retail_price: retail_price, state: state, updated_date: updated_date, updated_seconds: updated_seconds });
    await admin.firestore().collection('products').doc(id).set({
        author: author,
        author_id: author_id,
        asin: asin,
        cover_style: cover_style,
        created: created,
        created_seconds: created_seconds,
        default_fulfillment_channel: default_fulfillment_channel,
        deliverr_fulfillment_fee: deliverr_fulfillment_fee,
        deliverr_storage_fee: deliverr_storage_fee,
        description: description,
        ean: ean,
        format: format,
        height_english: height_english,
        height_metric: height_metric,
        id: id,
        inventory_amazon_us_fba: inventory_amazon_us_fba,
        inventory_amazon_us_fbm: inventory_amazon_us_fbm,
        inventory_deliverr: inventory_deliverr,
        inventory_ingram: inventory_ingram,
        inventory_shipbob: inventory_shipbob,
        inventory_xp: inventory_xp,
        interior_color: interior_color,
        isbn12: isbn12,
        isbn9: isbn9,
        length_english: length_english,
        length_metric: length_metric,
        linked_products: linked_products,
        medium: medium,
        pages: pages,
        printing_xp: printing_xp,
        printing_ingram: printing_ingram,
        printing_amazon: printing_amazon,
        product_id: product_id,
        related_products: related_products,
        retail_price: retail_price,
        shipbob_fulfillment_fee: shipbob_fulfillment_fee,
        shipbob_storage_fee: shipbob_storage_fee,
        sku: sku,
        subtitle: subtitle,
        title: title,
        upc: upc,
        updated: updated,
        updated_seconds: updated_seconds,
        weight_english: weight_english,
        weight_metric: weight_metric,
        wholesale_price: wholesale_price,
        width_english: width_english,
        width_metric: width_metric,
        updated_seconds: updated_seconds,
        xp_fulfillment: xp_fulfillment,
        xp_storage: xp_storage
    });

    var title_string = title + '-' + format

    await admin.firestore().collection("author_titles").doc(author_id).collection("titles").add({
        id: id,
        title: title_string,
        medium: medium,
        format: format
    });

    //var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "city": city, "country_code": country_code, "created_date": created_date, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated_date": updated_date, "updated_seconds": updated_seconds });
    var data = JSON.stringify({
        "author": author,
        "author_id": author_id,
        "asin": asin,
        "cover_style": cover_style,
        "created": created,
        "created_seconds": created_seconds,
        "default_fulfillment_channel": default_fulfillment_channel,
        "deliverr_fulfillment_fee": deliverr_fulfillment_fee,
        "deliverr_storage_fee": deliverr_storage_fee,
        "description": description,
        "ean": ean,
        "format": format,
        "height_english": height_english,
        "height_metric": height_metric,
        "id": id,
        "inventory_amazon_us_fba": inventory_amazon_us_fba,
        "inventory_amazon_us_fbm": inventory_amazon_us_fbm,
        "inventory_deliverr": inventory_deliverr,
        "inventory_ingram": inventory_ingram,
        "inventory_shipbob": inventory_shipbob,
        "inventory_xp": inventory_xp,
        "interior_color": interior_color,
        "isbn12": isbn12,
        "isbn9": isbn9,
        "length_english": length_english,
        "length_metric": length_metric,
        "linked_products": linked_products,
        "medium": medium,
        "pages": pages,
        "printing_xp": printing_xp,
        "printing_ingram": printing_ingram,
        "printing_amazon": printing_amazon,
        "product_id": product_id,
        "related_products": related_products,
        "retail_price": retail_price,
        "shipbob_fulfillment_fee": shipbob_fulfillment_fee,
        "shipbob_storage_fee": shipbob_storage_fee,
        "sku": sku,
        "subtitle": subtitle,
        "title": title,
        "upc": upc,
        "updated": updated,
        "updated_seconds": updated_seconds,
        "weight_english": weight_english,
        "weight_metric": weight_metric,
        "wholesale_price": wholesale_price,
        "width_english": width_english,
        "width_metric": width_metric,
        "updated_seconds": updated_seconds,
        "xp_fulfillment": xp_fulfillment,
        "xp_storage": xp_storage
    });

    return res.status(200).send(data);

});


app.get("/products", apiKeyMiddleware, async(req, res) => {



    const querySnapshot = await admin.firestore().collection("products").where("author_id", "==", res.locals.author_uuid).get(); // This works

    // console.log("Query Snapshot");
    const docSnapshot = querySnapshot.docs;
    //const docEmail = docSnapshot[0].get("email");

    //var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "city": city, "country_code": country_code, "created_date": created_date, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated_date": updated_date, "updated_seconds": updated_seconds });
    //var json = '{ }';
    //var obj = JSON.parse(json);
    var data = [];
    docSnapshot.forEach(function(doc) {
        //console.log("Get ID: ", JSON.stringify(doc.get("id")));
        //console.log("Get Title: ", JSON.stringify(doc.get("title")));
        //console.log(doc.data())
        //obj.push(doc.data());
        //data.push(doc.get("title"));
        data.push(doc.data());
    });

    /* docSnapshot.forEach(function =>
        var snapshot = JSON.stringify(docSnapshot.data());
        data.push();
        JSON.stringify(docSnapshot.data())
        JSON.stringify(docSnapshot);
    }) */

    /* var data = JSON.stringify(docSnapshot); */

    //var jsonString = JSON.stringify(data).slice(1, -1);
    //var replace1 = jsonString.replace("[", "{");
    //var replace2 = replace1.replace("]", "}");
    //console.log(jsonString);
    //console.log(JSON.stringify(obj));

    //return res.status(200).send(JSON.stringify(obj));
    //return res.status(200).send(JSON.stringify('{ "id": "1", "title": "Book 1" }, { "id": "2", "title": "Book 2" }, { "id": "3", "title": "Book 3" }'));
    return res.status(200).send(JSON.stringify(data));

});


app.get("/titles", apiKeyMiddleware, async(req, res) => {



    //const querySnapshot = await admin.firestore().collection("author_titles").where("author_id", "==", res.locals.author_uuid).get(); // This works
    const querySnapshot = await admin.firestore().collection("author_titles").doc(res.locals.author_uuid).collection("titles").get(); // This works

    // console.log("Query Snapshot");
    const docSnapshot = querySnapshot.docs;
    //const docEmail = docSnapshot[0].get("email");

    //var data = JSON.stringify({ "address_1": address_1, "address_2": address_2, "city": city, "country_code": country_code, "created_date": created_date, "created_seconds": created_seconds, "current_status": current_status, "email": email, "full_name": full_name, "id": id, "order_id": order_id, "postal_code": postal_code, "previous_status": previous_status, "product": product, "quantity": quantity, "retail_price": retail_price, "state": state, "updated_date": updated_date, "updated_seconds": updated_seconds });
    //var json = '{ }';
    //var obj = JSON.parse(json);


    var data = [];
    docSnapshot.forEach(function(doc) {
        //console.log("Get ID: ", JSON.stringify(doc.get("id")));
        //console.log("Get Title: ", JSON.stringify(doc.get("title")));
        //console.log(doc.data())
        //obj.push(doc.data());
        //data.push(doc.get("title"));
        data.push(doc.data());
    });

    /* docSnapshot.forEach(function =>
        var snapshot = JSON.stringify(docSnapshot.data());
        data.push();
        JSON.stringify(docSnapshot.data())
        JSON.stringify(docSnapshot);
    }) */

    /* var data = JSON.stringify(docSnapshot); */

    //var jsonString = JSON.stringify(data).slice(1, -1);
    //var replace1 = jsonString.replace("[", "{");
    //var replace2 = replace1.replace("]", "}");
    //console.log(jsonString);
    //console.log(JSON.stringify(obj));

    //data = [{ "id": "test", "titles": [{ "title": "001 Best Selling Book" }, { "title": "002 Best Selling Book" }] }];
    //data = [{ "id": "test" }, { "title": "001 Best Selling Book" }, { "title": "002 Best Selling Book" }];

    //return res.status(200).send(JSON.stringify(obj));
    //return res.status(200).send(JSON.stringify('{ "id": "1", "title": "Book 1" }, { "id": "2", "title": "Book 2" }, { "id": "3", "title": "Book 3" }'));
    //return res.status(200).send(JSON.stringify(docSnapshot));
    return res.status(200).send(JSON.stringify(data));

});

app.get("/api-key", async(req, res) => {
    //const apiIdKey = uuidAPIKey.create();
    //res.header('Access-Control-Allow-Origin', '*');
    //let queryParams = req.query;
    //let userEmail = queryParams.email;

    //const querySnapshot = await admin.firestore().collection("authors").where('email', '==', userEmail).get();
    //await admin.firestore().collection('authors').doc(userEmail).update({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });

    //const docSnapshot = querySnapshot.docs;
    //await docSnapshot[0].set({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });
    //const snapshot = await admin.firestore().collection('authors').doc(req.query.key).set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].data().set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });;
    //const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    //res.status(200);

    res.header('Access-Control-Allow-Origin', '*');
    let queryParams = req.query;
    //console.log('queryParam');
    let userEmail = queryParams.email;
    const authorsRef = admin.firestore().collection("authors");
    const queryRef = await authorsRef.where('email', '==', userEmail).get();
    const apiKey = await queryRef.docs[0].data().apiKey;
    //const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    //console.log(userEmail, ":", expressAccountLink.url);
    //res.send(expressAccountLink.url);

    return res.status(200).send(apiKey);

});

// Endpoint to create an API Key and UUID
// Only used for testing
app.get("/auth/apiKey", async(req, res) => {
    const apiIdKey = uuidAPIKey.create();
    //res.header('Access-Control-Allow-Origin', '*');
    //let queryParams = req.query;
    //let userEmail = queryParams.email;

    //const querySnapshot = await admin.firestore().collection("authors").where('email', '==', userEmail).get();
    //await admin.firestore().collection('authors').doc(userEmail).update({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });

    //const docSnapshot = querySnapshot.docs;
    //await docSnapshot[0].set({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });
    //const snapshot = await admin.firestore().collection('authors').doc(req.query.key).set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].data().set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });;
    //const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    //res.status(200);

    return res.status(200).send(apiIdKey);

});

// Endpoint to Confirm Authentication 
app.get("/auth", apiKeyMiddleware, async(req, res) => {
    //const apiIdKey = uuidAPIKey.create();
    //res.header('Access-Control-Allow-Origin', '*');
    //let queryParams = req.query;
    //let userEmail = queryParams.email;

    //const querySnapshot = await admin.firestore().collection("authors").where('email', '==', userEmail).get();
    //await admin.firestore().collection('authors').doc(userEmail).update({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });

    //const docSnapshot = querySnapshot.docs;
    //await docSnapshot[0].set({ uuid: apiIdKey.uuid, apiKey2: apiIdKey.apiKey });
    //const snapshot = await admin.firestore().collection('authors').doc(req.query.key).set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });
    //await queryRef.docs[0].data().set({ uuid: queryParams.uuid, apiKey: queryParams.apiKey });;
    //const expressAccountLink = await stripe.accounts.createLoginLink(authorStripeConnectAccount);
    //res.status(200);

    return res.status(200).send(JSON.stringify(res.locals));

});

// Publick Endpoint to Confirm API is available 
app.get("/", (req, res) => {

    //console.log("API Request");
    //console.log(req);

    return res.status(200).send('{ "status" : "ok", "API Available" : "true" }');

});


/* app.post("/auth/token", (req, res) => {

    const { client_id, token } = req.body
    const options = {
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            token,
            key: client_id,
            returnSecureToken: "true"
        },
        json: true
    }
    return request(options, (error, response) => {
        if (error) {
            console.log(">> Error getting Access Token:", error)
            return res.status(500).send({ error })
        }
        const access_token = response.body.idToken
        return res.status(200).send({ access_token })
    })


    admin
        .auth()
        .createCustomToken(uid)
        .then((authToken) => {
            const urlWithCode = url.format({
                pathname: redirect_uri,
                query: { state, code: authToken }
            })
            return res.status(200).redirect(urlWithCode)
        })
        .catch((error) => {
            console.log("Error : ", error)
            res.status(500).send({ error })
        })


    const query = req.query
    if (query) {
        const urlWithCode = url.format({
            pathname: "https://app.xscapepublishing.com/authorize",
            query: query
        })
        return res.status(200).redirect(urlWithCode)
    }
    return res.status(500).send(">> No response")
}); 

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("users").get();

  let users = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    users.push({ id, ...data });
  });

  res.status(200).send(JSON.stringify(users));
});

app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('users').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

app.post("/", async (req, res) => {
  const user = req.body;

  await admin.firestore().collection("users").add(user);

  res.status(201).send();
});

app.put("/:id", async (req, res) => {
    const body = req.body;

    await admin.firestore().collection('users').doc(req.params.id).update(body);

    res.status(200).send()
});

app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("users").doc(req.params.id).delete();

    res.status(200).send();
})


*/


/* app.get("/oauth2/login", (req, res) => {
    const query = req.query
    if (query) {
        const urlWithCode = url.format({
            pathname: "https://app.xscapepublishing.com/authorize",
            query: query
        })
        return res.status(200).redirect(urlWithCode)
    }
    return res.status(500).send(">> No response")
}); */

/* app.get("/oauth2/auth", (req, res) => {
    const { uid, redirect_uri, state } = req.body;
    //console.log(req.query);
    //console.log(req.query.uid);

    //console.log("Inside Auth");
    //console.log(req.redirect_uri);
    //console.log("Body UID");
    //console.log(req.body.uid);
    //console.log("Query Params");
    //console.log(req.query);
    //console.log(res);


    return admin
        .auth()
        .createCustomToken(uid)
        .then((authToken) => {
            const urlWithCode = url.format({
                pathname: redirect_uri,
                query: { state, code: authToken }
            })
            return res.status(200).redirect(urlWithCode)
        })
        .catch((error) => {
            console.log("Error : ", error)
            res.status(500).send({ error })
        })
}) */


/* app.get("/oauth2/access", (req, res) => {
    const { client_id, token } = req.body
    const options = {
        method: "POST",
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            token,
            key: client_id,
            returnSecureToken: "true"
        },
        json: true
    }
    return request(options, (error, response) => {
        if (error) {
            console.log(">> Error getting Access Token:", error)
            return res.status(500).send({ error })
        }
        const access_token = response.body.idToken
        return res.status(200).send({ access_token })
    })
}); */

// Stripe Webhook handler for asynchronous events.
app.post('/webhook', async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); //Temporary only for testing. Remove in Prod.Correct
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers['stripe-signature'];
        //let signature = req.headers('stripe-signature');
        //console.log("WHSecret: " + webhookSecret);

        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody.toString('utf8'),
                signature,
                webhookSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed. ` + err);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;

        if (eventType === 'checkout.session.completed') {
            console.log(`🔔  Checkout Session Completed!`);

        }
        if (eventType === 'payment_intent.succeeded') {
            console.log(`🔔  Payment Intent Successful. Payment received!`);
            var eventCustomerID = event.data.object.customer;
            //var creditsPurchased = (event.data.object.amount / basePrice) * 100;

            // Get Customer's Current Credits
            /* var currentCustomer = await stripe.customers.retrieve(eventCustomerID);
            var currentCustomerCredits = parseInt(currentCustomer.metadata.credits_available);
            var totalCreditsAvalaible = parseInt(currentCustomerCredits) + parseInt(creditsPurchased);
            console.log('Credits Available: ' + currentCustomerCredits);
            console.log('Credits Purchased: ' + creditsPurchased);
            console.log('Total Credits Available: ' + totalCreditsAvalaible);
            await stripe.customers.update(eventCustomerID, { metadata: { credits_available: totalCreditsAvalaible } }); */


        }
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    /* if (eventType === 'checkout.session.completed') {
      console.log(`🔔  Payment received!`);
    } */

    res.sendStatus(200);
});

// Export the endpoints as a single endpoint at /api
exports.api = functions.https.onRequest(app);