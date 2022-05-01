const app = require('./src/app');
const sequelize = require('./src/sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the config:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();

    console.log(`Starting Sequelize + Express example on port ${PORT}...`);

    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/figurinhas'.`);
    });
}

init();
