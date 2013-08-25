module.exports = {
    mongodb: {
        username: 'test',
        password: 'test',
        url: 'paulo.mongohq.com:10076',
        dbname: 'test',

        getURI: function() {
            return 'mongodb://' + this.username + ':' + this.password + '@' + this.url + '/' + this.dbname;
        }
    },

}