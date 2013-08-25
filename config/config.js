module.exports = {
    mongodb: {
        username: 'p6vital',
        password: 'p6vital',
        url: 'paulo.mongohq.com:10076',
        dbname: 'p6vital',

        getURI: function() {
            return 'mongodb://' + this.username + ':' + this.password + '@' + this.url + '/' + this.dbname;
        }
    }

}