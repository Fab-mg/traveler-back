# traveler

Traveler is an app designed to simplify your travel experience. Effortlessly manage and organize every aspect of your journeys, from itineraries to packing lists, all in one place.

# Getting Started

Run the project locally by running the code:
npm install
npm run start:dev

# required: node version 18.12.0 || 20.2.0

express-oauth2-jwt-bearer require the previously mentioned versions of node. If you run into trouble with package installation after switching node versions, run the following commands:

## test ipv4 & ipv6 connections :

- ping -4 registry.npmjs.org (if ok: ipv4 is ok)
- ping -6 registry.npmjs.org (if ok: ipv6 is ok, if not, run the commands bellow)
- npm config list (to check if you have proxy on)
- npm config delete proxy

## If the issue persists :

- npm set strict-ssl=false
