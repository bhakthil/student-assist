from bs4 import BeautifulSoup
import requests
import json
import sys
import os
from tqdm import tqdm

def page_available(url: str) -> int:
    return requests.get(url).status_code

def create_soup(url: str) -> object:
    data = requests.get(url).text
    soup = BeautifulSoup(data, 'html.parser')
    return soup

def json_out(json_obj: dict, dir: str, filename: str):
    with open(os.path.join(dir, filename), 'w') as f:
        json.dump(json_obj, f, indent=4)

def crawler(base_url: str) -> dict:
    # exit script if page is unavailable
    if page_available(base_url) == 200:
        soup = create_soup(base_url)
    else:
        sys.exit()

    # root url to append to qa links since they do not use the same link structure as the base-cci webpage
    root_url = 'https://spaces.charlotte.edu'
    topics = {}
    # loop through each topic on root page
    for i in tqdm(soup.find_all('ul', {'class':'labelList'})):
        # find respective link for each topic
        for j in (i.find_all('a')):
            # dict of question answer pairs
            qa = {}
            sub_link = root_url+j.get('href')
            # create soup object for each list of questions page
            sub_soup = create_soup(sub_link)
            # loop through each question and store the link, question, and answer
            for idx, list_item in (enumerate(sub_soup.find_all('div',{'class':'details'}))):
                question_link = root_url + list_item.find('a').get('href')
                question = list_item.find('a').get_text()
                # create soup object for individual questions
                question_soup = create_soup(question_link)
                # returns answer and keeps the proper html formatting
                answer = question_soup.find('div',{'id':'main-content'}).decode_contents()
                qa[idx] = {
                    'question': question,
                    'answer': answer,
                    'question_link' : question_link
                }
            topics[j.get_text()] = qa
    return topics

def main():
    ask_cci_url = "https://spaces.charlotte.edu/display/ACCI"
    topics = crawler(ask_cci_url)
    json_out(json_obj=topics, dir='cci-scrape/', filename='cci-scrape.json')

if __name__ == '__main__':
    main()
