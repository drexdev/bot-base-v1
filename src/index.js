const { join } = require("path");
const { App } = require("./base/index");

const dotenv = require("dotenv");

dotenv.config({
    path: join(__dirname, "config", ".env.test")
});

// Criando o bot para poder se conectar.
const client = App.createClient({
    intents: [],
    partials: []
});

client.run();