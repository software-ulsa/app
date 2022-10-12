# Ready Rental React Native Template

## Project Installation
### 1. Basic Setup
If you are new to React-native or does not have React-native installed on your system, please follow the steps mentioned in `React Native CLI Quickstart` tab from this [documentation](https://reactnative.dev/docs/environment-setup "documentation"). You will also require Android studio and XCode based on your need. You'll find the steps to install them in same documentation.

Install `yarn`, follow steps from this [documentation](https://classic.yarnpkg.com/en/docs/install#mac-stablehttp:// "documentation")

Unzip the project. Open the terminal app and got to the root of the project. There you'll be hitting number of commands provided below.

### 2. Rename Project
This command can be enterted without going to the root project in terminal as this will be installing the package globally.
```sh
$ yarn global add react-native-rename
                  or
$ npm install react-native-rename -g
```
`ignore if already installed`
```sh
$ npx react-native-rename <ProjectName> -b <bundleIdentifier>
```
### 3. Link react native libs and assets
```sh
npx react-native link
```
### 4. Install node modules / libraries
```sh
$ yarn  
    or  
$ npm install
```
### 5. Pod install
```sh
npx pod-install ios
```
### 6. Run Project

Run the following command in a Terminal at root of source directory:

```sh
$ npx react-native run-ios          // for iOS
        OR
$ npx react-native run-android      // for Android
```

