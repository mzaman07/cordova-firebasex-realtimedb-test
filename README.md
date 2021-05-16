# cordova-firebasex-realtimedb-test
A demo/test repo for adding realtime database functionality to the firebasex cordova plugin.

# Purpose

This project is created for demonstration and testing purposes. It is only intended to showcase and test the code, **NOT for production**. It tests out the following:

The ones marked in **bold** are the ones that I will support for now.

- **Reading a database endpoint with a listener to watch for new changes.**
- **Managing listeners by storing and removing them. This is an important piece to learn when dealing with listeners as they are not automatically managed. You as 
the developer of your cordova app will need to keep track of the listeners somehow.**
- **Removing all listeners (WIP will add this soon)**
- **Set values to a database endpoint.**
- **Remove values at a database endpoint.**
- **Update values at a database endpoint.**
- **Turn offline persistence on or off.**
- **Going online.**
- **Going offline.**
- **Using multiple databases [sharding] (WIP)**
- Transactions 
- Queries with indexing, limiting, ordering, searching
- Managing Presence, offline and online events


# Setup
## Requirements

Have NodeJS installed on your system. Then run `npm i -g cordova@latest` to get the latest cordova installed. This project supports corodva-cli 10 and up, for simple
`cordova-android@9` support and AndroidX. For iOS, use `> cordova-ios@5` (Preferrably 6 and up).

If you want to setup Android simulator/device testing, please install Android Studio and Java8 on your machine.
For iOS please use must use a MacOS system with Xcode installed.

Create a firebase account and project. Setup Android and iOS apps in firebase and download the respective config files, `google-services.json` and 
`GoogleService-Info.plist` and place it in the **root** folder of the project.

Setup a realtime database in your firebase project and setup basic rules. Also add an email account that you will be using to login with Firebase Authentication.

Hopefully you know how to use the cordova-cli as well.

## Prepare a build

(From a clean slate)

1. Clone the project.
2. Follow through the requirements section and set them up on your system.
3. Run `npm i` in the project root to install all dependencies.
4. Run `cordova platform add android` and `cordova platform add ios` to setup your Android and iOS projects respectively. This should install the project plugins.
5. Run `cordova build <android or ios>` for creating builds or `cordova run <android or ios>` for running on device or simulator. (In either case 
pick one of android or ios)



