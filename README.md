# SCRUMMY

![Scummy Main Logo](/assets/Scrummy_Logo.png "Scrummy logo")

[Project](#Project) | [Implemented User Stories](#Implemented-User-Stories) | [Additional feature user stories](#Additional-feature-user-stories) | [To Run the App](#To-Run-The-App) | [Planning and Learning](#Planning-and-Learning) | [Technologies](#Technologies) | [Team Mernie Sanders](#Team-Mernie-Sanders)


<img scr='./scrummy.gif' />

## Project

Born out of frustration with dwindling footfall in every market she attended and the endless scrolling through social media channels to find opening times to see two different answers on two different platforms. Our founder Holly had an epiphany.
"Working as a street food vendor, there was no where out there to have markets promoted with up to date and accurate information, with images."
That's when Scrummy ascended into market folklore and no longer will there be a weekend spent Scrummyless.

The goal of this mobile app was to create a platform that holds all the necessary information in one place for a user to find a Street Food Market.

The app loads a map centred on the users current location with local Street Food markets marked on the map. You can click on the markers to see which market they are.

The scroll list, ordered closest market at the top, displays close markets and their walking distance in minutes.

Each market has details page which includes: opening times, description, pictures, map with with the quickest walking route mapped out from the current users loaction to the selected market and clickable icons to the markets social media platforms.

There is also a search bar, so if a user has a market in mind they can search the name to bring up the details page. From there they can see whether the market is open and the quickest route from their location.

## Implemented User Stories

Map API - markets near you - map view

```
As a hungry caterpillar
So I can buy food at a market
I want a map to show me nearby markets
```

Market as entity, CRUD

```
As a person who has stumbled upon a market
So I can show people the market
I want to be able to add the market, location, photo to the map
```

List view output

```
As a person who likes variety
So I can see which markets are nearby
I want them to be displayed in a list
```

Info page for each market

```
As a person in the market for a market
So I can see when the market is open, how to get there, etc
I want to be able to tap through to a details page
```

## Additional features

```
As a poseur
So I can see and be seen at the market
I want a feed of recently tagged pics from the market I am at
```

Traders as entity, update functions etc / info page for traders

```
As a trader
So I can market my wares effectively
I want control over my stand’s page
```

Add in reminders for markets

```
As a forgetful person
So I can go to a market I like
I want to get a reminder notification for the day it’s on
```

Market verification for traders

```
As a market manager
So I can advertise my market
I want to be able to claim the page
```

Search engine for food types, with filters

```
As a vegetarian
So I can see what foods I can eat
I want to be able to tap on a filter to see those types of stands
```

Highlights of the week

```
As a suggestible person
So I know what to do
I want to see a page of news for local markets
```

Pre order for customers

```
As a trader
So I can ensure I have enough product
I want to allow customers to preorder
```

## To Run The App

Clone this repo by running:
`https://github.com/CodeRed30/MarketFinder.git`

Change into the MarketFinder directory and run:

`npm install`

In MarketFinder run:

`npm start`

Open another terminal, change into MERN_server/server and run:

`npm start`

For an Iphone user:

- Install the ExpoGo app on your iphone.
- Scan the barcode with your phone camera.

## Planning and Learning

The details of our sprints can be found in our [trello](https://trello.com/b/olrjatGo/m4m).

Class Diagrams:

| Nouns       | Property Or Owner |
| ----------- | ----------------- |
| Map         | Owner             |
| Market      | Owner             |
| Location    | Property          |
| Market info | Property          |

| Actions             | Owned by? |
| ------------------- | --------- |
| Show nearby markets | Map       |
| Add info            | Market    |
| Display list        | Map       |

| Function | showList |
| Properties | Markets |
| Actions | Show all the markets |

| Function | addMarket |
| Properties | Market(photo, comment, name) |
| Actions | Add info about a market |

## Technologies

| MongoDB |
| Mongoose |
| Javascript |
| Node.js |
| Express |
| React Native |

## What we would do next

## Feature pictures

## Team Mernie Sanders

Our AMAZING team was made up of:

- [Anna Cavalla](http://github.com/acavalla)
- [Charlie Fischer](https://github.com/charliefischer)
- [Holly Duckett](https://github.com/HolsDuckett)
- [Katrina Harradine](https://github.com/CodeRed30)
- [Jack Shields](https://github.com/jshields123)
