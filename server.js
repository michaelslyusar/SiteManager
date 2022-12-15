const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');


const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/systems', require('./routes/api/systems'));
app.use('/api/inspections', require('./routes/api/inspections'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
