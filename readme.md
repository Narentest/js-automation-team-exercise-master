# JS Automation Team Exercise
At the JS Automation Team our goal is to help automate JavaScript projects within Sky, and to improve the tools we need to reliably run tests on a multitude of device.

## The Project
The test project contained in this repo is a combination of the different technologies, languages and tools you may eventually work on.
Most of the code is written in TypeScript and it's transpiled to JavaScript by the build command. You don't need to be familiar with TypeScript though, as any code you add can just be JavaScript.
 
The project consist of three different parts:

1. A web server written in Node.js.
2. A dashboard implemented using React.
3. A Cucumber feature file

### The Server
The web server mimics some of the services we use to monitor and interact with devices such as Smart TVs, Gaming Consoles, TV boxes and similars.
In this sample implementation, the server is aware of three hypothetical gaming consoles and exposes REST APIs to allow taking screenshots of the devices, rebooting them or checking if they're online.

### The Dashboard
The dashboard consumes those APIs, showing live thumbnails of the devices, where available, small icons indicating whether they're online and buttons to reboot them.

### The Test
Finally, there is a feature file defining the steps for a possible automated test case.

## Prerequisites
Before you can build and run the project, you must install the following software on your machine:

* Node.js (tested with v12.19.0)
* Google Chrome
* A text editor or IDE of your choice. Visual Studio Code is a very popular option here at Sky, but feel free to use a different one.

## Installing the Project
After cloning the repo on your machine, open a terminal, CD into the project's root folder and run `npm i`.

## Building the Project
To build the project run `npm run build`.

## Starting the Server
To start the web server run `npm start`.  
The server will be listening at http://localhost and a dashboard will be available in your browser at the same URL.

**NOTE:** The app uses the default HTTP port 80. If for any reason you can't use that port on your system, please feel free to change it the `src/server/app.ts` file before building and running the project.

## Running the Feature Test
To execute the sample `reboot.feature` test script contained in the `src/test` folder, open a terminal and run `npm test`.

**NOTE:** The test requires that the major version number of the `chromedriver` binary, contained in the root of the repo, matches the version of Chrome installed on your system. Should you need a different one, you can grab it from https://chromedriver.chromium.org/downloads and overwrite the local copy.

## Your Tasks

1. Your first task is to implement the Cucumber JS scenario defined in `src/test/reboot.feature`, by populating the empty step definitions in the `src/test/steps.js` file. Your test is expected to verify the correct behaviour of the dashboard, meaning it should only interact with the GUI, without making any direct request to the server.

The implementation uses the JavaScript version of the popular Selenium WebDriver library, which you should be familiar with.
In any case, feel free to check the documentation at https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver.  
Same goes for Cucumber JS: you can find links to the documentation at https://github.com/cucumber/cucumber-js.

2. What extra step(s) would you add to make the scenario more reliable?

3. Your second task is to implement a second scenario that contains a step that reboots all devices, and checks that each device has been successfully rebooted.

4. Since there are two scenarios in the feature file, change the feature file in a way that steps are reutilised between the two.
Ans: 1 to 4 means same it will have the answer in (`src/test/reboot.feature' and 'src//test/steps.js`).

Now, let's have a look at the implementation of the web server (`src/server/app.ts`).

5. How would you improve code readability inside the request handlers?
Ans: Please have look (`src/server/app.ts`).

6. Considering the synchronous nature of JavaScript (and Node.js), do you think the implementation of one or more of the web APIs could cause significant performance issues to server?
Ans: No, it wont ause significant performance issues to server. Because reboot made asynchronous  calls, the implimentation in parellel in syn, so it no need to wait for other device complition of rebooting.

