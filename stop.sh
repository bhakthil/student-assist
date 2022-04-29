kill $(pgrep -f app:app)
kill $(pgrep -f rasa) &
#kill $(pgrep -f python) &
docker stop `docker ps -f name=elasticsearch`
