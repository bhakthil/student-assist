#!./.venv/bin/python

import pandas as pd

from haystack.document_stores import ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.utils import launch_es

# Creates elasticsearch docker container based on haystack pre-configured image
# This is where all documents will be indexed and stored
launch_es()

# Configuration to connect to the elasticsearch docker container using provided defaults
document_store = ElasticsearchDocumentStore(
    host="localhost",
    username="",
    password="",
    index="document",
    embedding_field="question_emb",
    embedding_dim=384,
    excluded_meta_data=["question_emb"],
)

# Element to create embeddings for all documents in documentstore
retriever = EmbeddingRetriever(
    document_store=document_store,
    embedding_model="sentence-transformers/all-MiniLM-L6-v2",
    use_gpu=False
)

# Get dataframe with columns "question", "answer" and some custom metadata
df = pd.read_csv("haystack/faq.csv")

# Get embeddings for our questions from the FAQs
questions = list(df["question"].values)
df["question_emb"] = retriever.embed_queries(texts=questions)
df = df.rename(columns={"question": "content"})

# Convert Dataframe to list of dicts and index them in our DocumentStore
docs_to_index = df.to_dict(orient="records")
document_store.write_documents(docs_to_index)