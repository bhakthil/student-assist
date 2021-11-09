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

When you open the ** /ccibot/Chatbot-Widget/AskCCI.html ** file, you will notice chat icon in the bottom-right corner