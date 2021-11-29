# zendesk-ticketing
Stack Used: Fullstack Javascript

```
Backend:      Node.js
Frontend:     React.js
Node version: 15.14.0 
NPM version:  7.7.6 
NPX version:  7.7.6 
```

Steps:

1. Install NPM and Node in accordance with the versions given above.
2. Set up the `.env` files in both `/server` and `/client` using `sample.env` in each as a reference.
3. Give the file "runProject.sh" and "buildProject.sh execution permission:
```
    a. Mac:    chmod 755 runProject.sh
               chmod 755 buildProject.sh
    b. Linux:  chmod +x runProject.sh
               chmod +x buildProject.sh
```
4. Build the project and install dependencies:
```
    npm run build
```
4. Run tests for backend using the command: 
```
    npm run testBackend
```
5. Run it using either of the following commands:
```
    a. npm run start
    b. ./runProject.sh
```

The react client will be available at `http://localhost:3000` and the Node.js + Express server will be available at `http://localhost:{{PORT_SETUP_IN_.ENV}}`.

## Frontend:

I used React because it reduces development time with reusable components. React states make data handling and update in data easier. While I think using redux would've made it easier, it would've been an overkill for the project. \
For pagination, my strategy is to fetch 100 tickets in one shot,paginate them in sets of 25 at frontend, and let the user interact with those 100 tickets locally. Now when the user wants tickets after the 100th, we'll fetch the next 100 tickets and replace the previous one's. If now the user wants to see the previous 100 tickets, we'll fetch them using previous cursor and again replace the previous tickets with the currently fetched one's. As a result, at a time, we'll be storing ony 100 tickets in memory on the browser side, and I think those should be enough at a time. \
I could've taken vaious other approaches like: 
1. Used offset pagination API and let that API and Ticket count API handle pagination. This woul've been a little bit easier but there would've been more API calls and that's more inefficient than making a large API call once. Plus I read on Zendesk API page that cursor based pagination is more efficient than the offset based pagination.
2. Used cursor pagination API with a next and previous button, that uses the next and previous  cursor returned in current call everytime. Too many API calls.
3. Followed the same approach I have used, just instead of replacing the previous 100 tickets with the new one's, I could've added the new ones with the old ones. While this would've prevented a network call when clicking the previous button (to fetch previous 100 tickets), this would've used a lot of memory after continuous fetches, and also, there was a chance of data being stale.

I used Semantic-UI for the components and syling as it is easy to read the documentation, clean, has a dedicated library for React, and needs very minimal customization.
