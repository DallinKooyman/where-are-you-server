# Where are You? 📍

Where Are You is a free, self-hosted service to share your location with friends and family and ONLY friends and family. This is an alternative to other location sharing services and works on your own home server. Where Are You keeps your location on your own hardware and shares your location to those with access to your server, on any mobile device, without needing to share your location with a 3rd party. 

## Overview

Where Are You server is a Node.js server that can be run on any supporting machine. The server receives API calls to retrieve and store certain data. Data is stored in a MongoDB table and the project uses Mongoose to access and modify data there. The server uses Kafka to send a user's location to be stored in the table (for future location history views) as well as to allow Redis to send the location update to the friends of the user.

This is the backend of the [Where are You? mobile app](https://github.com/DallinKooyman/where-are-you). 

This project is still a work in progress. Features have yet to be tested. This repo and ReadMe will be updated when it is ready for use

## Development 
### Install and Run

1. Clone the repository
gh repo clone DallinKooyman/where-are-you-server

2. Install dependencies (see package.json)

   ```bash
   npm install
   ```

3. Start the server

   ```bash
   npm start
   ```

### Default ports
The default ports for the different services. You can override these in the .env

|Service|Port|
|---|---|
|Server|1313|
|Mongoose|27017|
|Kafka|9092|
|Redis|6379|



