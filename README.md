
# Đọc truyện

Một trang web đọc truyện


## Tech Stack

**Client:** React, Redux, TailwindCSS, MatineCSS

**Server:** Node, Nestjs, Graphql

## Todo

My project is a web application for reading comic books, where users can upload and read comics. I have utilized Typescript and MongoDB for the database in the development of this project, with NestJS for the backend and ReactJS for the user interface. The website offers features such as comic CRUD operations, trending comics, user registration, login, and role-based authorization. Data caching is also implemented to enhance performance. To automate the process of updating comics, I have incorporated a Cron job to crawl and fetch comics from another website :v.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Mirai3103/doc-truyen.git
```

Go to the project directory

```bash
  cd doc-truyen
```

Install client dependencies

```bash
  cd client && yarn
```
Install server dependencies

```bash
  cd server && yarn
```

Start the api

```bash
  cd server && yarn start:dev
```
Start the client

```bash
  cd client && yarn dev
```

