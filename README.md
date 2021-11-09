# AskCCI Bot
This repo contains rasa bot project AskCCI StudentAssist Bot that was developed as part of the course ITIS-6112-8112.

# Project Setup
- clone this project
- change the directory to student-assist


- Create a new virtual environment by choosing a Python interpreter and making a ./venv directory to hold it:
  
  `python3 -m venv ./venv`

- Activate the virtual environment:
  
  `source ./venv/bin/activate`

- Install Rasa Open Source using pip (requires Python 3.6, 3.7, or 3.8).
  
  `pip3 install -U --user pip`
  
  `pip3 install rasa`

NOTE:

Please follow quick installation step at https://rasa.com/docs/rasa/installation

Do not perform the step that creates a new Rasa project

# How to run the chat bot
You can start the chatbot server by executing

  `rasa run --model models --enable-api --cors "*"`

If the server is up and running you should be able to see the below message

  `INFO     root  - Rasa server is up and running.`

When you open the **/ccibot/Chatbot-Widget/AskCCI.html** file, you will notice chat icon in the bottom-right corner

# How to re-train the chat bot

In order for the bot to understand different intents, it needs to be trained with sample utterances for each new intent.

## Modifying training files
There are few places that needs to be changed for a new intent to be added to the system.

### ./data/nlu.yml

Please add at least ten sample utterances for each of the intent you are responsible for. For an example, below markup is used to define `thank_you` intent. 

  ```yml
  - intent: thank_you
    examples: |
    - Thanks
    - Thank You
    - thanks
    - thanks a lot 
    - thank you so much
  ```

### ./data/stories.yml

Each intent should have at least 2 paths; **happy path** **and unhappy path**. So, please use below example to create paths for your intents.

```yml
- story: phd info happy path
  steps:
  - intent: phd_info
  - action: utter_phd_info
  - action: utter_did_that_help
  - intent: affirm
  - action: utter_happy
  - action: utter_continue

- story: phd info unhappy path
  steps:
  - intent: phd_info
  - action: utter_phd_info
  - action: utter_did_that_help
  - intent: deny
  - action: utter_helpdesk
  .
  .
  .
- story: **YOU_WILL_APPEND_YOUR_STORIES_HERE**
  steps
  - intent: [new intent]
  - action: ...
  - action: ...
```

### ./data/domain.yml

Domain file is where you define the responses for each intent. You will add responses for each of your intent under `responses` section.

each response corrosponding to you utterance should be named in the format `utter_xxxx` where xxxx is the intent name that the respnse corrosponds to.

For example, the response corrosponding to `phd_info` intent is named as `utter_phd_info`.

```yml
responses:
  utter_phd_info:
  - text: "You can get more information about our PhD program at <a href='https://bit.ly/3whwJFL'>Link</a>"

  utter_msc_info:
  - text: "You can get more information about our MSc program at <a href='https://bit.ly/3GMPPIV'>Link</a>"
  .
  .
  .
  .
  utter_<YOUR_NEW_UTTERANCE >:
  - text: "YOUR NEW RESPONSE"
  
```

In addition, you will add your intent names under the `intents` section of the domain file.

```yml
intents:
  - greet
  - goodbye
  - affirm
  - deny
  - mood_great
  - mood_unhappy
  - bot_challenge
  - thank_you
###################
  - phd_info
  - msc_info 
  - **YOU_WILL_APPEND_YOUR_INTENT(S)**
```

## How to train the bot

Once you finish adding the intents and the strories, you will be able to integrate the new additions/edits to your bot by re-training the bot.
Use below command to re-train the model;

`rasa train`

