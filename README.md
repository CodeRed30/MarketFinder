# market-finder

## User Stories
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
Insta pics tagged - connect to api with tag gallery
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



| Nouns | Property Or Owner |
|-------|-------------------|
| Map | Owner |
| Market | Owner |
| Location | Property |
| Market info | Property |

| Actions | Owned by? |
|---------|-----------|
| Show nearby markets | Map |
| Add info | Market |
| Display list | Map |

| Function | showList |
| Properties | Markets |
| Actions | Show all the markets |

| Function | addMarket |
| Properties | Market(photo, comment, name) |
| Actions | Add info about a market |


