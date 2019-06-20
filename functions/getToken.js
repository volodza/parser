const fb = require('firebase-functions');
const request = require ('request');
const vkConfig = {
    client_id:7001016,
    client_secret:'hQD28VvPlYLgPC4tUbjl',
    redirect_uri:'https://us-central1-theta-shuttle-228314.cloudfunctions.net/getToken'
}

fb.initializeApp({
    apiKey: "AIzaSyDsUYWd1Eegmv1P9nCPPLo600Jc8ni2MSM",
    authDomain: "theta-shuttle-228314.firebaseapp.com",
    databaseURL: "https://theta-shuttle-228314.firebaseio.com",
    projectId: "theta-shuttle-228314",
    storageBucket: "theta-shuttle-228314.appspot.com",
    messagingSenderId: "909587803669",
    appId: "1:909587803669:web:b8769bd4da145504"
  })


exports.getToken = functions.https.onRequest((req, res) => {
    if(!req.query.code) res.redirect("https://oauth.vk.com/authorize?client_id=7001016&display=page&redirect_uri=https://us-central1-theta-shuttle-228314.cloudfunctions.net/getToken&scope=wall,groups,photos,video,market,email,offline&response_type=code&v=5.95")
    if(req.query.code){
        request({
            method: 'GET',
            url: 'https://oauth.vk.com/access_token',
            qs: {
                client_id : vkConfig.client_id,
                client_secret : vkConfig.client_secret,
                redirect_uri : vkConfig.redirect_uri,
                code : req.query.code,
                json : true
              }
       },(error, res, body) => {
            token = JSON.parse(body)['access_token'];
            user_id = JSON.parse(body)['user_id']
            fb.database().ref(`users/${user_id}/token` ).set(token);
            res.send(`Токен id${user_id} добавлен в базу`)
        })
    }
});