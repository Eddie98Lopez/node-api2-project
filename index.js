// require your server and launch it here

const server = require('./api/server')
const port = 5000

server.listen(5000, ()=>{
    console.log(`server is listening on http://localhost:${port}` )
})

