# Ask-CCI Bot

## Project Setup

1. Clone this project to your local system via:

    ```bash
    git clone https://github.com/bhakthil/student-assist.git
    ```

2. Change to the new directory:

    ```bash
    cd student-assist
    ```

3. Create a new virtual environment:

    ```bash
    python3 -m venv ./venv
    ```

4. Activate the virtual environment

    ```bash
    source ./venv/bin/activate
    ```

## Installing Dependencies

1. Install Rasa Open Source using pip (requires Python 3.6 or higher)

    ```bash
    python3 -m pip install -U --user pip

    python3 -m pip install rasa
    ```

2. Install Haystack from source
   1. Change to the root directory where you store projects, make sure this is not **inside** of a project folder
   2. Clone the [Haystack repo](https://github.com/deepset-ai/haystack)

      ```bash
      git clone https://github.com/deepset-ai/haystack.git
      ```

   3. Change to the new directory

      ```bash
      cd haystack
      ```

   4. Install `haystack` using pip:

      ```bash
      python3 -m pip install -e .
      ```

3. Install additional requirements using pip:

    ```bash
    python3 -m pip install uvicorn, fastapi, pytest
    ```

NOTE: Alternatively, you can run `python3 -m pip install -r requirements.txt` however this may not correctly install Haystack

---

## How to run the chat bot

You can start the chatbot server by executing

  `rasa run --model models --enable-api --cors "*"`

If the server is up and running you should be able to see the below message

  `INFO     root  - Rasa server is up and running.`

When you open the **/ccibot/Chatbot-Widget/AskCCI.html** file, you will notice chat icon in the bottom-right corner

![bot icon](bot-icon.png)

You may start communicating with the bot by clicking on the on the bot icon.

![chat](chat-window.png)

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
  steps:
  - intent: [new intent]
  - action: [new action]
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
