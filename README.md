# Project Name
UR-SIZE 

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start`

**http://localhost:3000**

## Description

A web app to compare shoe/clothing sizes on different  brands. With user interaction.  

## Motivation

Just a litle API for educational purposes.

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Shoes list** - As a user I want to see all the events available so that I can choose which ones I want to attend

**Add shoes** - As a user I want to add shoes

**Shoes comparator** - As a user I want to compare the shoe sizes on different shoes

**Write comments** - As a user I want to be able to write comments

## Backlog

List of other features outside of the MVPs scope

User profile: - see my profile - upload my profile picture - see other users profile - list of events created by the user - list events the user is attending



Homepage: - …

## ROUTES Backend:

### Endpoints

| Method | Path         | description     | Body |
| :----: | ------------ | --------------- | ---- |
|  GET   | `/protected` | protected route |      |

### Auth

| Method | Path      | description    | Body                     |
| :----: | --------- | -------------- | ------------------------ |
|  GET   | `/whoami` | who am i       |                          |
|  POST  | `/signup` | signup a user  | `{ username, password }` |
|  POST  | `/login`  | login a user   | `{ username, password }` |
|  GET   | `/logout` | logout session |                          |

## Views

| View (Component) | Path         | description    |
| :--------------- | ------------ | -------------- |
| Home             | `/`          | home           |
| Login            | `/login`     | login page     |
| Protected        | `/protected` | protected view |
| Shoes            | `/shoes`     | list of shoes view |
| shoe             | `/shoe/id`   | one shoe       |
| Protected        | `/protected` | protected view |
## Links

### Trello

Link to Trello

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)
