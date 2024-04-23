# Web Scrapper #
Webscrapper will help to scrape and monitor Products and the prices in Meesho

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4 or higher)

### How do I get set up? ###

1. Clone the repository
2. Install dependencies: `npm install`
3. create .env file from .env.example
4. Set environment variables:
   - `MONGO_ATLAS_URI`: Connection string for MongoDB (e.g. `mongodb://srv..../dbname`)
   - `PORT`: port for the application
   - `MONGO_COLLECTION_WEB_SCRAPPER`: Mongo db collection name for storing the system info (e.g. `product`)
5. Start the server: `npm start`  | to run development environment : `npm run dev`
6. Make sure mongodb connection is up in logs

### Verify the app is running ###
1. if a connection to MongoDB success it will log 'Connected to Mongo Atlas' 
2. Logs 'Server started listening on port: #DefinedPORT# ' when service is up

### APIS
1. /ping - Check server is available
      - method - GET
2. /web-scrapper - Process the scrapping url and returns extracted data
      - method - GET 

### How to test ?
1. create a js file (Eg: scrapper.js)
2. copy paste below code 
      ``` JavaScript
      async function webScrapper() {
      await fetch("http://localhost:5000/web-scrapper").then(response => {
            response.json().then((data) => {
            console.log(data);
            }); 
      }).catch(err => {
            console.log(err.message);
      })   
      }
      setInterval(webScrapper, 15000);
      ```
3. Make sure webscrapper is up. Run the command `node scrapper.js` - this will monitor web-scrapper every 15 seconds