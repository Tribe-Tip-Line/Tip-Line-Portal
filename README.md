# Tip Line Web Portal

[Airline Ambassadors International](http://airlineamb.org/)

### Release Notes (v1.0.0 // 12/4/2017)

**Features:** interactive data tables with access to Tip Line information, such as reports, users, registration keys, and hotline numbers. Added browser tab icon. A Node.js [express](https://expressjs.com/) web application.

**Fixed:** ban functionality, which will add users by ID to ban collection in the database.

**Bugs/Defects:** cannot edit or delete reports properly because of modal bug. Proper login required. Need to include Airline Ambassadors logo on site, and display geographic location instead of latitude and longitude coordinates.

### Install Guide

**Pre-requisites:** have a editor for web development, such as Microsoft Visual Studio or Brackets

**Dependent libraries:** install [npm](https://www.npmjs.com/get-npm)

**Download Instructions:** clone the repository locally in a place you can find it

**Installation of actual application:** to test on local server, type into shell:

```
npm run devstart
```

*some npm installs may be required

**Run instructions:** visit (http://localhost:3000/) to access the website on your local server; if pushing to master, changes in code will also be available at (https://tipline.herokuapp.com/), where we publicly host the website

#### Login: TipLineApp
#### Password: Tipline17

You can create a new web portal account by clicking the "Registration" tab on the portal

**Troubleshooting:** some npm installs may be needed to develop on the site; use

```
npm install [module name] --save
```
