![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## 35-project-CMS

### Author: Tanner Seramur

### Links and Resources

* [repo](https://github.com/TannerSeramur/35-project-cms)
* [travis](https://www.travis-ci.com/TannerSeramur/35-project-cms)
* [aws](http://ts-basic-cms.s3-website-us-west-2.amazonaws.com/)



### Description
At the core of every web site is content. Given that, the most basic need in the online world is a way to **manage** that content. Typically separate from the presentation (the actual website), most websites have a back-end or administrative interface that allows for the creation, curation, and management of the content that ultimately gets rendered to the user.

* The goal here is to implement a Content Management System (CMS) that will allow users with proprer credntials (Read Update Delete Write) to: 
  * When selecting a model, a list of all records
  * When selecting a record, a way to edit or delete the record
  * Add a new record to the model

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app
* `npm start`
* This CMS uses a deployed API server located at https://javascript-401-api.herokuapp.com
* The api server supports the following routes:
  * **GET** `/api/v1/models` - A list of all data models
  * **GET** `/api/v1/model` - A list of all records in a given **model**
  * **GET** `/api/v1/model/schema` - The JSON Schema for a given **model**
  * **GET** `/api/v1/model/id` - A single record, from a **model**, with the **id**
  * **DELETE** `/api/v1/model/id` - Delete a single record, from a **model**, with the **id**
  * **PUT** `/api/v1/model/id` - Replace single record, from a **model**, with the **id**
  * **PATCH** `/api/v1/model/id` - Tactically update a single record, from a **model**, with the **id**

#### Tests
* How do you run tests?
    npm test
* What assertions were made?
* What assertions need to be / should be made?

