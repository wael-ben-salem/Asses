## Prompt

*For best experience, please view this file in the browser*.

You will be creating a full-stack application that helps an English speaker to practice learning Korean phrases. This app has two views to aid the learner - a list of the phrases this app teaches, and a "practice" mode which shows phrases on flash cards, one-at-a-time, to test the learner's recollection. Please note that proficiency in the Korean language will offer you no advantage in this exercise - it is simply a fun bonus.

For the purposes of this application, a "phrase" consists of a word or short sentence rendered three ways:

- in the Korean alphabet, [Hangul](https://en.wikipedia.org/wiki/Hangul),
- in English
- in its [Romanized](https://en.wikipedia.org/wiki/Romanization_of_Korean) form, provided solely as an approximate pronunciation aid to non-Korean speakers.

Your front end will display views created from data in a [MySQL](https://dev.mysql.com/doc/refman/5.7/en/) database. You will be working with [React](https://facebook.github.io/react/), and will serve your application with a [NodeJS](https://nodejs.org/) web server, using [ExpressJS](https://expressjs.com/).

**BEFORE CONTINUING you must confirm you are running MySQL version 5.7**
To check the version of the installed MySQL server: on Mac run `mysql_config --version` in the terminal; on Windows run `mysql -V` in the terminal and check the value printed for `Distrib`. **If you are running something other than 5.7.x, you must speak with your Technical Mentor before you can move on.**

HOW TO START THIS APP

* *[Modify this section to tell graders how to start your app]*

By design, this assessment contains more work than you will be able to complete in a day, so don't be concerned about not completing all of the steps below. Rather, please work on the following steps **in order**, moving on to the next step only after the one you are working on is complete. **Commit frequently** with informative messages. While there are instructions to commit at the end of each step, these should not be your only commits.

---

### Before You Begin

**Complete these setup tasks**:

- [ ] In your terminal, navigate to this assessment's `korean-tutor` directory and run `git remote rm origin` to prevent yourself from accidentally pushing your code during the assessment.
- [ ] Run `npm install` inside the `korean-tutor` directory to install dependencies.
- [ ] Ensure that MySQL Server is running on your computer (`mysql.server start`).
- [ ] Create the database and tables using the provided `schema.sql`, following the directions provided in the comments to populate your database.
  - *NOTE* You may also need to modify the `user`, `root`, and `password` properties inside `database-mysql/config.js`.
- [ ] In `server/index.js`, uncomment the lines of code corresponding to your choice of framework.
- [ ] Serve your application from the provided ExpressJS web server.
  - If using React, start your application with two commands, `npm run react-dev` and `npm start`, in two separate terminal tabs. For more information about Webpack, take a look at [the Webpack Docs](https://webpack.github.io/docs/).

**WHEN THESE TASKS ARE COMPLETE:** proceed to Step One.

---

### Step One: Display a Phrase List

**Implement the following user story:**

> As a learner, when I load the app, I expect to see a list of all the phrases I will learn.

**Implement this user story by doing the following:**

- [ ] Refactor the **Phrase List** component to dynamically render phrases using the sample data in `sample_data.js`. You may create additional components as necessary.
- [ ] Complete the `getAllPhrases` function in `database-mysql/index.js`.
- [ ] In the Express server `server/index.js`, complete the request handler that will respond to `GET` requests to `/api/phrases` with JSON of the phrases stored in the database. You should use the `getAllPhrases` function that you wrote earlier in this step in your implementation.
- [ ] Replace the sample data in your client with the data obtained from the server.

**WHEN THIS STEP IS COMPLETE:**  make a commit with the message "complete step one"

---

### Step Two: Display a Non-Functioning Flash Card

**Implement the following user story:**

> As a learner, I expect to use "flash cards" to practice phrases one-at-a-time.

> As a learner, I expect to be able to practice multiple phrases in succession.

**Implement this user story by doing the following:**

- [ ] Refactor the **Practice** component to render one phrase with data obtained from the server. You may create or refactor other components as necessary.
- [ ] Make your components respond to the user clicking any of the "status" buttons (`Got it`, `Almost`, or `Not yet`) by advancing to the next phrase.
  - Do not worry about storing the status which was clicked for now - this will be done in a later step.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step two"

---

### Step Three: Show/Hide the English Translation

**Implement the following user stories:**

> As a learner practicing phrases, when I see a flash card, I expect the English translation to be hidden by default.

> As a learner practicing phrases, I want to reveal the English translation by clicking "Reveal Translation" on a flash card.

> As a learner practicing phrases, I expect to be able to hide the English translation again after revealing it.

**Implement these user stories by doing the following:**

- [ ] Refactor your client-side component(s) to display the text "Reveal Translation" by default instead of the English translation
- [ ] Refactor your client-side component(s) to toggle between displaying "Reveal Translation" or the English translation when the user clicks that element.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step three"

---

### Step Four: Record Learning Progress on a Phrase

**Implement the following user story:**

> As a learner practicing phrases, I want to record my progress in learning a phrase by clicking a button which indicates my progress

> As a learner, I want to assign one of three statuses to a phrase: `Not yet`, `Almost`, and `Got it`.

> As a learner practicing several phrases in succession, once I have assigned a status to a phrase, I expect to see a new phrase to study.

**Implement these user stories by doing the following:**

- [ ] Inside `/database-mysql/index.js`, write a function `updatePhrase` which will locate a phrase in the database by its `id` property, then update its status.
- [ ] Inside `/server/index.js`, write a request handler that will respond to `PATCH` requests to `/api/phrases/:phraseId` by updating the phrase with id `phraseId` in the database. You should use the `updatePhrase` function in your implementation.
- [ ] Refactor your client-side components to respond to a user clicking a status button by sending a `PATCH` request to the server updating the status of the current phrase. Once this AJAX request is resolved, show a different phrase to the user.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step four"

---

### Step Five: Prioritizing Phrases by their Status

**Implement the following user story:**

> As a learner, I want to practice the phrases I am least comfortable with, then the phrases I am moderately comfortable with.

> As a confident learner, I do not wish to see phrases in Practice Mode once I have marked them with the status `Got it`.

> As a learner, I want to know when I have mastered all of the phrases in my collection.

**Implement these user stories by doing the following:**

- [ ] Refactor your app to prioritize the appearance of phrases in Practice Mode according to the following criteria:
  - Phrases marked with the status `Not yet` should always be shown before phrases marked `Almost`
  - Phrases marked with the status `Got it` should no longer appear in Practice Mode
- [ ] When all phrases have been marked with the status `Got it`, display a message congratulating the user for completing all of the phrases.

- Take care not to alter the order in which phrases appear in the **Phrase List** view.

**WHEN THIS STEP IS COMPLETE**: make a commit with the message "complete step five"

---

### Step Six: Displaying Progress

**Implement the following user story:**

> As a learner, I want to see my progress expressed as I work through all of the phrases in Practice Mode, expressed as a percentage of the phrases marked with the status `Got it`.

**Implement this user story by doing the following:**

- [ ] Create or refactor any client-side components as necessary.

**WHEN THIS STEP IS COMPLETE**: make a commit with the message "complete step six"

---

### Step Seven: Add New Phrases

**Implement the following user story:**

> As a learner expanding my vocabulary, I want to add new phrases for me to practice.

**Implement this user story by doing the following:**

- [ ] Modify your database's schema as necessary.
- [ ] Create or refactor any database helper functions as necessary.
- [ ] Create or refactor any server request handlers as necessary.
- [ ] Create or refactor any client-side components as necessary.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step seven"

---

### Step Eight: Spaced Repetition

**Implement the following user story:**

> As a learner, I want phrases to appear in an order consistent with the [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition) learning technique.

**Implement this user story by doing the following:**

- [ ] Replace the phrase prioritization algorithm from Step Five with an implementation of the [SM2 spaced-repetition algorithm](https://www.supermemo.com/english/ol/sm2.htm).

*NOTE* - There are a few SM2 implementations available on npm. Do not use these packages or reference their source code in your implementation.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step eight"

---

### Step Nine: Add Categories for Phrases

**Implement the following user stories:**

> As a learner, I want to separate my collection of phrases into several categories, like "Things you say in a Taxi" or "Things you say in a restaurant"

> As a learner, I wish to track my progress through the phrases in each category independently.

**Implement these user stories by doing the following:**

- [ ] Modify your database's schema as necessary.
- [ ] Create or refactor any database helper functions as necessary.
- [ ] Create or refactor any server request handlers as necessary.
- [ ] Create or refactor any client-side components as necessary.

**WHEN THIS STEP IS COMPLETE:** make a commit with the message "complete step nine"

---


* [Naver Translate](http://translate.naver.com) if you wish to try adding some new phrases to your dataset.
