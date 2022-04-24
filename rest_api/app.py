__author__ = "Kyle McLester, Bhakthi Liyanage"
__version__ = "1.0"
__status__ = "Prototype"
__date__ = "2022/03/09"

# Third party imports
from fastapi import FastAPI
from pydantic import BaseModel, validator
import haystack
from haystack.document_stores import ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import FAQPipeline

app = FastAPI(title="Ask-CCI Haystack API")

document_store = ElasticsearchDocumentStore(
    host="localhost",
    username="",
    password="",
    index="document",
    embedding_field="question_emb",
    embedding_dim=384,
    excluded_meta_data=["question_emb"],
)

retriever = EmbeddingRetriever(
    document_store=document_store, embedding_model="sentence-transformers/all-MiniLM-L6-v2", use_gpu=False
)

pipe = FAQPipeline(retriever=retriever)

@app.get("/")
def root() -> dict:
    """
    Returns authors, current version, project status, and the most recent modified date as a json-blob.
    """
    return {
        "author": __author__,
        "version": __version__,
        "status": __status__,
        "date modified": __date__
    }

@app.get("/haystack-version/")
def haystack_version() -> dict:
    """
    Returns the current version of Haystack used in the QA System
    """
    return {"version": haystack.__version__}

class Query(BaseModel):
    query: str
    num_results: int

    @validator("query")
    def validate_query_length(cls, value):
        # Validation check to make sure user does not enter a single keyword as input 
        if len(value) <= 5:
            raise ValueError(f"Query expected to have length >= 5, recieved {len(value)}")
        return value

    @validator("num_results")
    def results_must_be_positive(cls, value):
        # Validation check to return at least 1 answer from the Haystack service
        if value < 1:
            raise ValueError(f"Number of results expected >= 1, received {value}")
        return value

@app.post("/haystack-query/")
def haystack_query(query: Query) -> dict:
    """
    Takes a `query` dictionary/json as input and passes the paramters to the Haystack pipe function.
    Haystack then returns a list with the answer, confidence score, and meta data. If multiple answers
    returned, they will be converted into a dictionary and returned to the user as a json-blob.
    """
    question = query.query
    num_results = query.num_results

    # Runs a query on document store and returns the top-k answers
    prediction = pipe.run(query=question, params={"Retriever":{"top_k":num_results}})
    
    # Answers objects must be converted to a dictonary to display correctly
    resp = {}
    for idx, answer in enumerate(prediction['answers']):
        resp[idx] = answer.to_dict()
    
    #resp = [(ans.meta['answer'], ans.meta['link']) for ans in prediction['answers']]
    return resp