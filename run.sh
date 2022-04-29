python3 haystack/init_doc_store.py
nohup uvicorn app:app --reload --app-dir rest_api/ &
nohup rasa run actions &
nohup rasa run -m models --enable-api --cors "*"