import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
// const path = require('path');
// const fileURLToPath  = require('url');

// //Resolving dirname for ES Module.
// const __filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
//Use the frontend app.
// app.use(express.static(path.join(__dirname,"/frontend/build")));

// //Render frontend for any path.
// app.use("*", (req,res) => {
//     res.sendFile(path.join(__dirname,"/frontend/build/index.html"));
// })

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.log(err));
