[![Mixpanel Reporting](http://www.liquidframeworks.com/sites/default/files/LiqFra_header_logo.png)](http://www.liquidframeworks.com/)
# mixpanel-reporting

## Getting Started
Install Dependencies and start (with a background watch for changes).

```term
$ npm install
$ npm start
```


Run unit tests and code linting:

```term
$ grunt
```
or:

```term
$ npm run lint && npm run test
```
or (for single run):

```term
$ grunt test
```

To load the page, goto:
```term
http://localhost:3004/?id=001i000000NCCPq&orgName=CARBER
```
filling in the appropriate querystring parameters (orgName and id [optional - does nothing locally - used to return to accounts page in saleforce]).

Note that the `server.js` file is hardcoded to login to the MobileTeam org, using David Pitre's account.  If you want/need to change this, modifiy the `server.js` file accordingly.  If you want to change the Org of the user, you'll need the client_id and client_secret:
1. login to console as Admin user
2. goto Setup -> Build/Create/Apps
3. under Connected Apps, look for you app and the client_id and client_secret will be listed there. (Note that you may need to create a Connected App is one doesn't exist)
