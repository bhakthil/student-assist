# CCI-SCRAPE

This directory holds the code responsible for scraping the [Ask CCI](https://spaces.charlotte.edu/display/ACCI/) webpage. When the `crawler.py` script is ran, it will begin searching through each topic on the Ask CCI page and load each of the question-answer pairs into a dictionary -- this is then saved to a .json file for later use.

Run the script by cloning this repository, changing to the `cci-scrape` directory and running:

```bash
python3 crawler.py
```

The format of the resulting json is:

```json
{
    "topic_name": {
        "question_number":{
            "question": "What is ... ",
            "answer": "The answer is ... ",
            "question_link": "https://question-link.com/xyz"
        }
    }
}
```
