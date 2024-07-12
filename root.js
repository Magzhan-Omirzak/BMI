const express = require('express');
const path = require('path');
const validator = require('validator');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/bmiCalculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/bmiCalculator', (req, res) => {
    const { height, weight } = req.body;

    if (!validator.isNumeric(height) || !validator.isNumeric(weight)) {
        return res.status(400).send('Invalid input. Height and Weight should be numbers.');
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    let message;

    if (bmi < 18.5) {
        message = 'Underweight';
    } else if (bmi < 24.9) {
        message = 'Normal weight';
    } else if (bmi < 29.9) {
        message = 'Overweight';
    } else {
        message = 'Obesity';
    }

    res.send(`Your BMI is ${bmi}. Category: ${message}`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
