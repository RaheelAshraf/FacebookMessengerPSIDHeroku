const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express().use(bodyParser.json());
const port = process.env.PORT || 8080;
const welcomeMessage = require('./intents/welcome');
const ShowDemo = require('./intents/showDemo');
const WelcomeHotel = require('./intents/hotelBooking');
const BookHotel = require('./intents/bookHotel');
const foodOrder = require('./intents/foodorder');
const Menu = require('./intents/foodMenu');
const bookNow = require('./intents/booknow');
const bookNowYes = require('./intents/booknowyes');
const bookNowNo = require('./intents/booknowno');
const order = require('./intents/order');

app.post('/webhook', (request, response) => {

    const _agent = new WebhookClient({ request: request, response: response });

    const welcome = (agent) => {
        return axios.get(``)
            .then(payload => {
                console.log(`Here is you information: ${payload}`);
                return agent.add(`Welcome to my hotel`);
            })
            .catch(e => {
                console.log(`an error occured fetching data: ${e}`);
            })
    }

    const fallback = (agent) => {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    // Hotel Booking Intents

    const showDemo = () => {
        const Response = ShowDemo.cardFun();
        return response.json(Response);
    }

    const contactUs = (agent) => {
        agent.add('You can contact us on: \n labkoat@gmail.com');
    }

    const hotelBookingwelcome = () => {
        const Response = WelcomeHotel.cardFun();
        return response.json(Response);
    }

    const bookHotel = () => {
        const Response = BookHotel.cardFun();
        return response.json(Response);
    }

    const BookNow = () => {
        const Response = bookNow.cardFun();
        return response.json(Response);
    }

    const BookNowYes = () => {
        const Response = bookNowYes.cardFun();
        return response.json(Response);
    }


    const BookNowNo = () => {
        const Response = bookNowNo.cardFun();
        return response.json(Response);
    }


    // Food Delivery Intents

    const foodOrderBot = () => {
        const Response = foodOrder.cardFun();
        return response.json(Response);
    }

    const foodMenu = () => {
        const Response = Menu.cardFun();
        return response.json(Response);
    }

    const orderFood = () => {
        const Response = order.cardFun();
        return response.json(Response);
    }

    const exit = (agent) => {

        agent.add(`Bye. Will See You Again`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('ShowDemo', showDemo);
    intentMap.set('ContactUs', contactUs);
    intentMap.set('HotelBookingWelcome', hotelBookingwelcome);
    intentMap.set('Book Hotel', bookHotel);
    intentMap.set('book now', BookNow);
    intentMap.set('book now - yes', BookNowYes);
    intentMap.set('book now - no', BookNowNo);
    intentMap.set('food bot', foodOrderBot);
    intentMap.set('food delivery', foodMenu);
    intentMap.set('order', orderFood);
    intentMap.set('Exit', exit);
    _agent.handleRequest(intentMap);
})


app.listen(port, (req, res) => {

    console.log(`app started on port: ${port}`)
})