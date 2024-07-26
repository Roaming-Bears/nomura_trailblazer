import boto3

KB_ID = "6R8TDE7AER"
QUERY = "Summarize the news articles dated on 3 March 2022"
REGION = "us-east-1"
MODEL = "meta.llama3-70b-instruct-v1:0"
NUM_RESULTS = 10

# Setup bedrock
bedrock_agent_runtime = boto3.client(
    service_name="bedrock-agent-runtime",
    region_name=REGION,
)


docs_only_response = bedrock_agent_runtime.retrieve(
    knowledgeBaseId=KB_ID,
    retrievalQuery={"text": QUERY},
    retrievalConfiguration={
        "vectorSearchConfiguration": {"numberOfResults": NUM_RESULTS}
    },
)

for doc in docs_only_response["retrievalResults"]:
    print(f"Citation:{doc}")

text_response = bedrock_agent_runtime.retrieve_and_generate(
    input={"text": QUERY},
    retrieveAndGenerateConfiguration={
        "type": "KNOWLEDGE_BASE",
        "knowledgeBaseConfiguration": {
            "knowledgeBaseId": KB_ID,
            "modelArn": MODEL,
        },
    },
)
# for citation in text_response["citations"]:
#     print(f"Citation:\n{citation}\n")
print(f"Output:\n{text_response['output']['text']}\n")
