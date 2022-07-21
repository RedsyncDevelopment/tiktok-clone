# TikTok Clone Application

This app is not published but it's Dockerized so you can clone this repo and follow the description below to try it local.

TikTok Clone with lots of functionality. You can upload your video, like and comment on other people videos and more...

## How to use?

### Prerequisite

U need to set up: [Google Console Project](https://console.cloud.google.com/) and create OAuth credentials and copy them to `.env` file as shown in `example.env`

Secondly you need to have: [Cloudinary](https://cloudinary.com/) as video upload file system. This could be done on local server, but this way there is no need to deal with file managment locally.

### 1 (more simple way - Docker):

There are to ways you can run this app on your local machine. First one, and the most simple is to run it with [Docker](https://www.docker.com/). You need to download and install the Docker Desktop first. After that, navigate to project folder, set up `.env` variables and run

```bash
docker-compose up --build --force-recreate
```

After it done building images and containers be sure to run in app container bash the following command to migrate model to database:

```bash
npx prisma migrate dev --name initial
```

Thats it! U are all set! Visit [localhost:3000](localhost:3000) and view your page.

### 2 (more complicated - install all software local)

First you need to setup [PostgreSQL](https://www.postgresql.org/) and [pgAdmin](https://www.pgadmin.org/). I won't go into details how to set them up, but it's not that complicated. All the documentation can be found on official websites.

There is also an info on how to set `.env` variables if you run this project this way.
