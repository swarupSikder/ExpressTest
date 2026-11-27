# npm install express

# server.ts >

const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

# npm i --save-dev @types/express

# npm i tsx

# add script line

{
"dependencies": {
"express": "^5.3.0",
"tsx": "^4.23.15"
},
"devDependencies": {
"@types/express": "^5.0.6",
"typescript": "^7.0.2"
},
"allowScripts": {
"express@5.3.0": true
},
"scripts": {
"dev": "tsx watch ./src/server.ts" <<<<<<<
}
}

# npm run dev

# setup NEON_DB

# npm i pg

# npm i @types/pg

# npm i bcryptjs