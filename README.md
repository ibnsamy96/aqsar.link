# Aqsar.Link - Link Shortener

 Simple link shortener that takes URL from the user and gives him a short link to share.  
 It's a front-end app and the user's URL and its shortcut are saved in the firebase realtime database. the app has a simple router to act like a **SPA**.  
You can reach its live version by following the link [aqsar.link](https://aqsar.link).

![project homepage](./readme-cover.png)

## App Flow:
1. User enters the long URL that he wants shorter
2. The app check for URL validity
3. If the URL is valid the app generates its ID and search for it in the database to check its uniqueness
4. If ID is unique, the app adds it to the database and inform the user
5. User can copy it and share it as he wants
6. The app stores previous URLs to localStorage and retrieves them next time the user uses the app

## Usage
Aqsar.Link doesn't require a special environment to be used in. The only need is to have a live server that can redirect all requests to index.html, and I recommend [live-server](https://github.com/tapio/live-server).
### install live server  
`npm install -g live-server`
### go to the project directory that you cloned and run the server in cli
`live-server --port=8080 --entry-file=./index.html`

## License
I don't know what does this section mean but it seems cool to have one ib the readme file 🚶‍♂️