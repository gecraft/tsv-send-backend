## Heroku deploy

### Install the Heroku CLI

Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```
### Log in to Container Registry

You must have Docker set up locally to continue. You should see output when you run this command.

```
$ docker ps
```
Now you can sign into Container Registry.

```
$ heroku container:login
```
### Get sample code

Clone this repo and navigate to the app’s directory.

After cloning the repository, you need to create a copy of the `.env.example` file, rename it to `.env` and configure. 

```
$ git clone https://github.com/texttree/tsv-send-backend.git
$ cd tsv-send-backend
```

###  Create a Heroku app

```
$ heroku create
Creating app... done, ⬢ <app-name>
https://<app-name>.herokuapp.com/ | https://git.heroku.com/<app-name>.git
```

### Push your Docker-based app

Build the Dockerfile in the current directory and push the Docker image.

```
$ heroku container:push web -a <app-name>
```

### Deploy the changes

Release the newly pushed images to deploy your app.
```
$ heroku container:release web -a <app-name>
```

### Add .env variable

Set environment variables from `.env`

```
$ heroku config:set OWNER=<owner> REPO=<repo> TOKEN=<token> FRONTEND_URL=<url> CREATE_FILES=TRUE -a <app-name>
```
### Done

Now open the app in your browser

```
$ heroku open -a <app-name>
```
