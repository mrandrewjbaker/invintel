var https = require('https'),     
    fs =    require('fs'),
    moment = require('moment');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/andrewjamesbaker.me/chain.pem')
};
var app = https.createServer(options);
io = require('socket.io')(app, {
    cors: {
      origin: "https://andrewjamesbaker.me:8080",
      methods: ["GET", "POST"],
      credentials: true
}});
app.listen(9090, "0.0.0.0");

const invintel_db = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Fr8Trayne!',
      database : 'invintel',
      charset : 'utf8mb4'
    }
});

io.on('connection', function(socket){


    socket.on('get_locations', async function(data){
        await invintel_db.raw(`
        SELECT
        name as 'name',
        id as 'id',
        ifnull((
            SELECT
               SUM(ifnull(quantity, 0))
            FROM
                inventory
            WHERE
            location_id = locations.id
        ), 0) as 'units'
        FROM
        locations
        `)
        .then(async function(results){
            socket.emit('get_locations', {locations: results[0]})
        })
    })

    
    socket.on('location_create', async function(data){
        await invintel_db.raw(`
        INSERT INTO
        locations
        (name)
        VALUES
        (?)
        `,[data.name])
        .then(async function(results){
            if(results[0].insertId){
                socket.emit("location_create", {name: data.name, created: true})
                await invintel_db.raw(`
                SELECT
                *
                FROM
                locations
                `)
                .then(async function(results){
                    socket.emit('get_locations', {locations: results[0]})
                    socket.broadcast.emit('get_locations', {locations: results[0]})

                })


            }else{
                socket.emit("location_create", {name: data.name, created: false})

            }
        })

    })



    socket.on('get_inventory', async function(data){
        await invintel_db.raw(`
        SELECT
            inventory.name as 'namel',
            inventory.quantity as 'quantity',
            inventory.barcode_value as 'barcode',
            locations.name as 'location',
            inventory.create_datetime as 'create_datetime'
        FROM
        inventory
        left join locations on inventory.location_id = locations.id
        `)
        .then(async function(results){
            if(results[0].length > 0){
                results = results[0]

                socket.emit("get_inventory", {inventory: results})
            }else{
                // socket.emit("inventory_item", {barcode: data.barcode, exists: false})
            }
        })    
    })


    socket.on('inventory_exists', async function (data) {
        await invintel_db.raw(`
        SELECT
        *
        FROM
        inventory
        WHERE
        barcode_value = ?
        `, data.barcode)
        .then(async function(results){
            if(results[0].length > 0){
                socket.emit("inventory_exists", {barcode: data.barcode, exists: true})
            }else{
                socket.emit("inventory_exists", {barcode: data.barcode, exists: false})
            }
        })
    });

    socket.on('inventory_item', async function(data){
        await invintel_db.raw(`
        SELECT
        inventory.barcode_value as 'barcode_value',
        inventory.name as 'name',
        inventory.create_datetime as 'create_datetime',
        inventory.quantity as 'quantity',
        locations.id as 'location_id',
        locations.name as 'location_name'
        FROM
        inventory
        LEFT JOIN locations on inventory.location_id = locations.id
        WHERE
        barcode_value = ?
        `, data.barcode)
        .then(async function(results){
            if(results[0].length > 0){
                results = results[0][0]

                socket.emit("inventory_item", {barcode: results.barcode_value, name: results.name, location_id: results.location_id, location_name: results.location_name, create_datetime:results.create_datetime, quantity: results.quantity})
            }else{
                // socket.emit("inventory_item", {barcode: data.barcode, exists: false})
            }
        })
    })

    socket.on('inventory_create', async function(data){
        data.create_datetime = new Date(data.create_datetime)
        await invintel_db.raw(`
        INSERT INTO
        inventory
        (name, barcode_value, location_id, create_datetime, quantity)
        VALUES
        (?, ?, ?, ?, ?)
        `,[data.name, data.barcode, data.location, moment(data.create_datetime).format('YYYY-MM-DD HH:mm:ss'), parseInt(data.quantity)])
        .then(async function(results){
            if(results[0].insertId){
                socket.emit("inventory_create", {barcode: data.barcode, created: true})

            }else{
                socket.emit("inventory_create", {barcode: data.barcode, created: false})

            }
        })

    })

    socket.on('inventory_move', async function(data){
        data.create_datetime = new Date(data.create_datetime)
        await invintel_db.raw(`
        UPDATE
        inventory
        SET
        location_id = ?
        WHERE
        barcode_value = ?
        `,[data.location, data.barcode])
        .then(async function(results){
            socket.emit("inventory_move", {barcode: data.barcode, moved: true})
        })
    })

    socket.on('inventory_consume', async function(data){
        await invintel_db.raw(`
        UPDATE
        inventory
        SET
        quantity = quantity - ?
        WHERE
        barcode_value = ?
        `,[data.quantity, data.barcode])
        .then(async function(results){
            socket.emit("inventory_consume", {barcode: data.barcode, consumed: true})
        })
    })

    socket.on('inventory_receive', async function(data){
        await invintel_db.raw(`
        UPDATE
        inventory
        SET
        quantity = quantity + ?
        WHERE
        barcode_value = ?
        `,[data.quantity, data.barcode])
        .then(async function(results){
            socket.emit("inventory_receive", {barcode: data.barcode, received: true})
        })
    })
});