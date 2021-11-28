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

