# Express

## Learning Objectives

  - Discuss why javascript is used for backend applications
  - Compare and contrast express.js to Rails / Sinatra.
  - Manage project dependencies using npm
  - Separate responsibilities by using `module.exports` and `require` to organize code
  - Simplify rendering views in express by using handlebars.js
  - Understand how to receive `POST` params by configuring and using `body-parser` middleware 
  - Link to static assets in an Express application

## Opening Framing (15/15)

<details><summary> 
Let's list out the things we've covered in class...
</summary>
 <ul>
 <li> Html</li>
 <li>
 Css
 </li>
 <li>
 Javascript
 </li>
 <li>
 Objects
 </li>
 <li>
 Functions
 </li>
 <li>
 ES6 
 </li>
 <li>
 SQL, Postgresql
 </li>
 <li>
 Ruby 
 </li>
 <li>
 OO programming
 </li>
 <li>
 Sinatra
 </li>
 <li>
 Rails
 </li>
  <li>Node</li>
 </ul>
</details> 
---

This is SO much stuff. We've pretty much covered the entire stack. Everything we
cover from here on out is an extension of what we've already learned or a
different language than we're used to. Today we'll be talking about [expressJS](https://expressjs.com/)
the "e" in the MEAN stack. Which incidentally is super buzz wordy right now.

Express is a framework built on top of node.

> Node.js is not a framework. It is an application runtime environment that
allows you to write server-side applications in javascript. Javascript that
does not depend on a browser.

Some frameworks, like Rails, are very opinionated frameworks.

Today, we'll be learning about Express, which is much less opinionated. Just
like Sinatra, we have a lot of freedom in how we structure our application
(folders/files, how to load different files, managing dependencies, etc)

Remember, with Node and now with Express, we are writing JS on the backend! 
<details><summary>What are some benefits of JS on the backend?</summary>
<li>Easy to write front and backend in same language</li>
<li>It's fast! Increased performance due to asynchronous processing</li>
<li>You have to know a little JS to work with web pages. JS is becoming the "Must Know" language for web developers</li>
</details> 


## Hello World - Express (we do 30/45)

Creating a simple hello world express application.

In the terminal:
```bash
$ mkdir hello-express
$ cd hello-express
$ npm init -y
$ npm install --save express
```

Q. What do you think npm is? (ST-WG)
---

> npm, short for node package manager. Allows us to install dependencies for our
nodeJS application. Much like how gems did this for us in Rails.

`$ npm init` will initialize a new NodeJS application. Upon initialization it
will prompt you for some user input to update the package.json. Using the `-y` argument allows you to use the defaults and not prompt for any options.


```bash
$ cat package.json
{
  "name": "hello-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

> The `package.json` file contains meta data about your app or module. More
importantly, it includes the list of dependencies to install from npm when
running npm install.

The next thing I'd like to do is install the express node module. In the
terminal:

```bash
$ npm install --save express
```

> the `--save` flag allows us to update the package.json to include the
dependency you just installed.

As we saw during `npm init`, the default file for a node app is "index.js".  We
can certainly change this, but we'll use the default for now.

Let's make a new file `$ touch index.js` and place the following contents. In
`index.js`:

```javascript
var express = require("express");
var app = express();

app.listen(4000, () => {
  console.log("app listening on port 4000");
});
```

We've required the express module. We then create another variable that invokes
the module. The app variable is where we can set up which port to listen to and
the different requests the server should listen for.

If we run the application(`$ node index.js`) we can see in the terminal `app
listening on port 4000` You'll notice that it doesn't allow us to exit this
application until we hit `cntrl + c`. This means our server is running. Let's
try going to the local host of that port number. In the browser enter
`http://localhost:4000`.

In the browser we'll see something like :

```
cannot GET /
```

OH NOES, what's going on here?

Basically we've told the server what port to listen on, but we didn't specify
what to do if a user goes to the `"/"` route. Let's update `index.js`:

```javascript
app.get("/", (req, res) => {
  res.send("Hello World");
});
```
Here, `req` is the HTTP request and `res` is the HTTP response your server sends back.

We refresh and...

```
CANNOT GET /
```

What gives? We added a route and specified the `"hello world"` string to send as
the response. Let's try restarting the server.

`Hello World`

Cool. Man, that's really unfortunate that we have to restart the server every
time we make an update to our files.

Q. What was the fix for that in Sinatra?
---

> sinatra/reloader from the sinatra-contrib repo.

Turns out express has something similar, nodemon.

In the terminal:

```bash
$ npm install --global nodemon
```

> When using the `--global` flag (-g for short), we're specifying that nodemon
will be installed "globally" (not per project) so we can utilize nodemon across
all of our node applications.

Then we start up our application a bit differently now. In the terminal:

```bash
$ nodemon index.js
```

### Q: Why not just use Node.js?

Yes, we already wrote a Node.js hello world app...why use Express?


## Params in URL in Express (5/50)

Remember parameters in our ruby frameworks? It's very similar in JS. Let's
update `index.js` to include:

```javascript
app.get("/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});
```

## Break(10/60)

## You do: 99 Bottle of Beer(20/80)
The readme can be found [here](https://github.com/ga-wdi-exercises/99_bottles_express)

## Views (20/100)

Quick Review of the Request - Response cycle that we saw in Rails
 1. Router
 2. Controller
 3. Model
 4. View

What parts are implemented thus far with Express?

> One thing to note about views for today. We want to give you an initial
introduction into how views can be generated through templating to achieve the
same effects that erb did for us in Sinatra/Rails.

Let's leverage our [solution to 99 Bottles of
Beer](https://github.com/ga-dc/99_bottles_express/tree/solution) to learn about
views.

Remember how we utilized erb in Sinatra and rails?  We need to be able to do the
same sort of templating with Express. For express, we'll use handlebars. To
install handlebars into our node application enter the following in the
terminal:

```bash
$ npm install --save hbs
```

Then we need to set the view engine to be handle bars inside of the `index.js`:

```javascript
app.set("view engine", "hbs");
```

Let's go ahead and create a directory and some views. In the root directory of
the express 99 bottles application. In the terminal:

```bash
$ mkdir views
$ touch views/index.hbs
$ touch views/layout.hbs
```

Let's change up our existing `index.js` to utilize a template rather than
sending in a string directly.

In `index.js`:

```javascript
// instead of
// app.get("/:numberOfBottles?", ( req, res ) => {
//   var numberOfBottles = req.params.numberOfBottles || 99
//   var next = numberOfBottles - 1
//   if (numberOfBottles > 1){
//     res.send(numberOfBottles + " bottles of beer on the wall <a href='/" + next + "'>Take one down pass it around")
//   }
//   else{
//     res.send("1 bottle of beer on the wall <a href='/'>Start Over</a>")
//   }
// })

// we want this
app.get("/:numberOfBottles?", ( req, res ) => {
  var bottles = req.params.numberOfBottles || 99;
  var next = bottles - 1;
  res.render("index", {bottles, next});
})
```

> So instead of sending a string directly to the response of that get request,
we instead want to render a view. The `.render` function takes two arguments
here. The first is the view we want to render. The second argument is an object.
We can use the keys in this object inside the view to access the values in these
key-value pairs.

The only problem is our view is empty! Let's go ahead and change that now. In
`views/layouts.hbs`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
   {{{body}}}
  </body>
</html>
```

### Research: What does {{{ (triple stash) do?
 - [Handlebar.js docs](http://handlebarsjs.com/)

### Serving static assets

This is also a great time to note how we serve static assets. Notice we linked a
stylesheet in our layout file.

In our `index.js`, let's also add:  
 `app.use(express.static(__dirname + '/public'))`

This allows us to utilize files in that folder in the layout.

Notice the `{{{body}}}` syntax. This is because Handlebars by default escapes
HTML and you need the additional set of brackets to indicate that you want to
render the tags in the body as HTML.

Finally we should update our index view to reflect the same strings we had
before. In `views/index.hbs`:

```html
{{bottles}} bottles of beer on the wall.
{{#if next}}
  <a href='/{{next}}'>Take One Down, Pass it Around</a>
{{else}}
  <a href='/'>Start Over</a>
{{/if}}
```

> Like in ERB, we're able to use objects in our view. Additionally we can
utilize control flow in our view as well! The syntax your seeing for the conditional statement is a built-in helper from Handlebars.

## module.exports (20/120)

`module.exports` allows us to separate our js files by exposing their contents
as one global variable. The global variable isn't assigned until we require the
file.

For example:
```js
// calculator.js
module.exports = {
  add(a,b){
    return a + b
  }
}
```

```js
// in index.js
// instantiate global variable to grant access to module we've created
var calculator = require("./calculator.js");

// use variable to call the .add() function defined in calculator.js
calculator.add(3,4)
```

Well, we can actually separate our concerns using `module.exports` If we change
our get request in `index.js`:

```js
var bottles = require("./controllers/bottles.js");
app.get("/:numberOfBottles?", bottles.index );
```

to this instead. The `./` refers to the current directory, which must be explicitly stated.
We could create a routes module that defines our index route. Let's create a `controllers/bottles.js` file with the following contents:

```js
module.exports = {
  index( req, res ){
    var bottles =
    req.params.numberOfBottles || 99;
    var next = bottles - 1;
    res.render('index',{
      bottles,
      next
    });
  }
};
```

> You can see that almost nothing has changed, really we just moved the
functionality into a different file. What advantages does that bring to us with
regard to separation of concerns in MVC? (st-wg)

You can start to see the necessity of `module.export` when we start to add
models to our application. If we had the 7 RESTful routes that rails have for
each model, you can start to see how keeping everything in the `index.js` can
begin to become unwieldy.

By using module.exports, we can effectively separate concerns and start to organize our application code. This idea of separating concerns and adhering to an MVC design allows our apps to grow while remaining easy to maintain and understand what is happening.

## Break (10/130)

## HTML Forms: Bodyparser & Post requests (20/150)

Let's incorporate the player a bit more.  Let's create a welcome page that asks for their name.

We need a route and a view (with a form)


```js
app.get("/", (req, res) => {
  res.render("welcome");
});
```

```html
<!-- views/welcome.hbs -->
<h1>Welcome to 99 Bottles</h1>
<form action="/" method="post">
  <label for="player_name">Please enter your name</label>
  <input id="player_name" type="text" name="player_name">
  <input type="submit">
</form>

```

Submit a name:

```get CANNOT POST/```

Q. How can we fix this?
---

> In `index.js`...

```js
app.post("/", (req, res) => {
  res.send("can post")
})
```

Well it works, but it's not super valuable, we're not even getting our
parameter. Let's add some stuff in `index.js`:

```js
app.post("/", (req, res) => {
  res.send("hello " + req.params.player_name)
})
```

hello undefined... oh man.. and just to be sure let's `console.log(req.params)`.
It's an empty object!

Our html form information is not in `req.params`. Express is not handling information posted from an html form.  We need to install middleware in order to get form data and JSON data in a POST request for express applications. Rails and Sinatra already include the middleware to handle this(RACK). By default express does not, so we need to install it manually.

> middleware is code that runs in between receiving the request and responding. Body-parser used to be included to express, but they took it out.

In the terminal:

```bash
$ npm install --save body-parser
```

In `index.js`:

```js
// configure app to use body parser
var bodyParser = require("body-parser");

app.use(bodyParser.json()); //handles json post requests
app.use(bodyParser.urlencoded({ extended: true })); // handles form submissions
```

Another thing to note is that, in express, `params` is always for parameters in
the url. parameters in form data is `body`

So we change the final post request in index.js to:

```js
app.post("/", (req, res) => {
  res.send(`hello ${req.body.player_name}`)
})
```

And finally, use it in our app:

Update index.js:

```js
app.post("/", (req, res) => {
  res.render("index", {
    player_name: req.body.player_name,
    bottles: 99,
    next: 98
  });
});
```

And to our view:
```html
{{#if player_name}}
  Hey {{player_name}}, there are
{{/if}}
```

:tada:

***GET params with res.params***
***POST params with res.body***, using body-parser middleware

## You Do - POST data and store it in a cookie (30 minutes)

We can persist data temporarily in a cookie. If we wanted to perist data across requests securely, we would store the data in some kind of persistant storage, like a database.

In groups of 2 or 3, work together to implement storing POSTed data in cookies.

Check out the Express API docs and review how to POST data. Look at how Express implements cookies, and create a route that, when POST data is received, stores data in cookies

Since we don't have a form ready, you could either build a form in a view, like we did to requst the `player_name` above. Alternatively, think of your backend code as an API. How can you POST to an api without using the browser?

https://expressjs.com/en/api.html

(Hint: you will need middleware to start working with cookies)

### Bonus: use cURL or Postman to send POST to your route

## Homework: Ultimate Compliment

* [Ultimate Compliment](https://github.com/ga-dc/compliment-express)
  * You might want to look at the [Sinatra Version Solution](https://github.com/ga-dc/emergency_compliment/tree/solution)

## Sample Quiz Questions
- What is `npm`?

- Write a get request using any path as you would in an express application.

- How does `module.exports` help us with separation of concerns?

### Other frameworks based on Express
 
 - Express Generator
 - [KoaJS](https://github.com/koajs/koa)

### In the Wild

 - [Why Netflix got burned](https://www.infoq.com/news/2014/12/expressjs-burned-netflix)

