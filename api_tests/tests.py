# Third part imports
from fastapi.testclient import TestClient

# Local application imports
from rest_api.app import app

client = TestClient(app)

def test_root_endpoint():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json() == {
	"author": "Kyle McLester, Bhakthi Liyanage",
	"version": "1.0",
	"status": "Prototype",
	"date modified": "2022/03/09"
}

def test_haystack_version():
    resp = client.get("/haystack-version/")
    assert resp.status_code == 200
    assert resp.json() == {"version": "1.2.0"}

def test_query_length():
    json_blob = {
        "query": "invalid length",
        "num_results": 3,
    }
    resp = client.post("/haystack-query/", json=json_blob)
    assert resp.status_code != 200

def test_query_length():
    json_blob = {
        "query": "Who should I contact about external funding?",
        "num_results": -5,
    }
    resp = client.post("/haystack-query/", json=json_blob)
    assert resp.status_code != 200

def test_correct_item():
    json_blob = {
        "query": "Who should I contact about external funding",
        "num_results": 2,
    }
    resp = client.post("/haystack-query/", json=json_blob)
    assert resp.status_code == 200