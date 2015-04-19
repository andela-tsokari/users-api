module.exports = {
                    db: { 
                          development: {
                            client: 'pg',
                            connection: {
                              host: 'localhost',
                              user: 'tams',
                              database: 'users'
                            },
                            debug: true
                          },

                          test: {
                            client: 'pg',
                            connection: {
                              host: 'localhost',
                              user: 'tams',
                              database: 'users-test'
                            },
                            debug: true
                          },

                          production: {
                            client: 'pg',
                            connection: {
                              port: 5432,
                              host: 'ec2-54-163-239-102.compute-1.amazonaws.com',
                              user: 'qdvjqttcufavvh',
                              password: '-7JYkkBA35vvLQR4B9LB7Mzivs',
                              database: 'd4rul9ngpaiqnb'
                            }
                          }

                        },

                    port: process.env.PORT || 4000,

                    secret: 'us5rs-1p9'

                  };
