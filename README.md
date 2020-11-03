# Qassar - Link Shortener

### Simple link shortener that takes URL from the user and gives him a short link that's easier to share.

### It's a front-end app and the user's URL and its shortcut are saved in firebase realtime database. the app has a simple router to act like a SPA.

    App Flow:
    1. User enters the long URL that he wants it shorter
    2. The app check for URL validity
    3. If URL is valid the app generates its ID and search for it in the database to check its uniqueness
    4. If URL is unique, the app adds it to the database and inform the user
    5. User can copy it and share it as he wants
