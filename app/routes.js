// app/routes.js
var request = require('superagent').agent()
    , moment = require('moment-jalaali')
    , _ = require('underscore')
    , config = require('config')

module.exports = function(app, passport) {
    moment.loadPersian()
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
            , hadaf: config.uri.hadaf
            , redirect_uri: config.uri.redirect_uri
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // After access ========================
    // =====================================
    app.get('/transactions', isLoggedIn, function (req, res) {
        if (req.query.error || !req.query.code)
            res.redirect('/profile')
        else {
            request
                .post(config.uri.hadaf + '/api/oauth2/token')
                .set('Authorization', 'Basic ' + config.authorization) // base64 user:pass
                .type('form')
                .send({ code: req.query.code })
                .send({ redirect_uri: config.uri.redirect_uri + '/transactions'})
                .end(function(postResponse) {
                    if (!postResponse.body.access_token.value)
                        res.redirect('/profile')
                    req.session.access_token = postResponse.body.access_token.value
                    res.redirect('/response');
                })
        }
    })

    app.get('/response', isLoggedIn, function (req, res) {
        if (!req.session.access_token)
            res.redirect('/profile')
        else {

            request
            .get(config.uri.hadaf + '/api/service/transactions?type=d')
            .set('Authorization', 'Bearer ' + req.session.access_token)
            .end(function (response) {
                var transactions = response.body

                transactions = transactions.map(function (item) {
                    var m = moment(item.date, 'jYYYYjMMjDDHHmmss')
                    item.dayOfWeek = m.format('dddd')
                    item = _.pick(item, 'dayOfWeek', 'amount', 'category')
                    return item
                })
                transactions = _.sortBy(transactions, function (item) { return item.amount })

                transactions = _.pairs(_.groupBy(transactions, function(item){
                    return item.dayOfWeek
                }))

                _.each(transactions, function (pairs){
                    var sum = 0
                    _.each(pairs[1], function (transaction){
                        sum = sum + transaction.amount
                        pairs[2] = sum
                    })

                    pairs[1] = _.pairs(_.groupBy(pairs[1], function(transaction){
                        return transaction.category
                    }))

                    _.each(pairs[1], function (categoryTransactions){
                        var sum = 0
                        _.each(categoryTransactions[1], function(transaction){
                            sum = sum + transaction.amount
                        })
                        categoryTransactions[1] = sum
                    })
                })

                var result = { name: '', children: []}

                transactions.forEach(function (item) {
                    var day = { name: item[0], children: []}
                    item[1].forEach(function (category) {
                        var category = { name: category[0], size: category[1] }
                        day.children.push(category)
                    })
                    result.children.push(day)
                })

                globalResult = result

                res.render('chart.ejs', {});
            })
        }
    })

    var globalResult

    app.get('/chart.json', function(req, res) {
        res.send(globalResult)
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
