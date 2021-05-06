const fs = require('fs');

module.exports = {
    devServer: {
        host: 'andrewjamesbaker.me', 
        disableHostCheck: true,
        https:{
            key: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/cert.pem'),
            ca: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/chain.pem')
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
          config
            .output
            .filename('[name].[hash].js') 
            .end() 
        }  
      }
  };