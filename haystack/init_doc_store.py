#!./.venv/bin/python

import pandas as pd
from typing import Optional
from time import sleep
import docker

from haystack.document_stores import ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.utils import launch_es


def is_container_running(container_name: str) -> Optional[bool]:
    """Verify the status of a container by it's name
    :param container_name: the name of the container
    :return: boolean or None
    """
    RUNNING = "running"
    # Connect to Docker using the default socket or the configuration
    # in your environment
    docker_client = docker.from_env()
    # Or give configuration
    # docker_socket = "unix://var/run/docker.sock"
    # docker_client = docker.DockerClient(docker_socket)

    try:
        container = docker_client.containers.get(container_name)
    except docker.errors.NotFound as exc:
        print(f"Check container name!\n{exc.explanation}")
    else:
        container_state = container.attrs["State"]
        return container_state["Status"] == RUNNING

def create_es_connection():
    # Connect to ElasticSearch
    document_store = ElasticsearchDocumentStore(
        host="localhost",
        username="",
        password="",
        index="document",
        embedding_field="question_emb",
        embedding_dim=384,
        excluded_meta_data=["question_emb"],
    )
    return document_store

def create_retriever(document_store, embedding_model, use_gpu):
    # Element to create embeddings for all documents in documentstore
    retriever = EmbeddingRetriever(
        document_store=document_store,
        embedding_model=embedding_model,
        use_gpu=use_gpu
    )
    return retriever

def main():
    container_name = "elasticsearch"

    if is_container_running(container_name=container_name):
        print(f"Container {container_name} is already running")
    else:
        launch_es()
        sleep(15)

    document_store = create_es_connection()

    retriever = create_retriever(
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


if __name__ == "__main__":
    main()
    