import express, { Application } from 'express'
import { routes } from './routes'
import { connectDB } from './config/database'
import bodyParser from 'body-parser'
import cors from 'cors'


const app: Application = express()
const port: Number = 4000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

connectDB()

app.listen(port, () => console.log('Server is running on port ' + port))
