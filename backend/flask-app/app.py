#Install following stuff
# pip install huggingface_hub
# pip install langchain transformers PyPDF2 openai
# pip install unstructured
# pip install unstructured[local-inference]
# pip install azure-core
# pip install PyPDF2



from flask import Flask, request, jsonify
import json
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
import os
from PyPDF2 import PdfFileReader

app = Flask(__name__)

# Set your OpenAI API Key
api_key = "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"
os.environ["OPENAI_API_KEY"] = api_key

# Initialize the OpenAI LLM
llm = OpenAI(model_name="text-ada-001")

# Setup a prompt template with a variable called product
my_prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

# Set up a langchain using the model and the prompt template
llm_chain = LLMChain(
    llm=llm,
    prompt=my_prompt
)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/process_pdf', methods=['GET'])
def process_pdf():
    # TODO: Implement PDF processing using LLM model

    # For now, just return the data structure provided in the question
    response = {
        'nodes': [
            { 'id': '1', 'data': { 'label': 'Benefit Options' } },
            { 'id': '2', 'data': { 'label': 'Northwind Health Plus' } },
            { 'id': '3', 'data': { 'label': 'Northwind Standard' } },
            { 'id': '4', 'data': { 'label': 'Medical Services' } },
            { 'id': '5', 'data': { 'label': 'Hospital Stays' } },
            { 'id': '6', 'data': { 'label': 'Doctor Visits' } },
            { 'id': '7', 'data': { 'label': 'Lab Tests and X-rays' } },
            { 'id': '8', 'data': { 'label': 'Emergency Services' } },
            { 'id': '9', 'data': { 'label': 'In-Network Emergency Services' } },
            { 'id': '10', 'data': { 'label': 'Out-of-Network Emergency Services' } },
            { 'id': '11', 'data': { 'label': 'Prescription Drug Coverage' } },
            { 'id': '12', 'data': { 'label': 'Generic and Brand-Name Drugs' } },
            { 'id': '13', 'data': { 'label': 'Specialty Drugs' } },
            { 'id': '14', 'data': { 'label': 'Mental Health and Substance Abuse Coverage' } },
            { 'id': '15', 'data': { 'label': 'Vision and Dental Services' } },
            { 'id': '16', 'data': { 'label': 'Tips for Coordinating Benefits' } },
            { 'id': '17', 'data': { 'label': 'COB Definitions' } },
            { 'id': '18', 'data': { 'label': 'Tips for Employees' } },
            { 'id': '19', 'data': { 'label': 'Coverage for Hospice Care' } }
        ],
    'edges': [
        { 'source': '1', 'target': '2' },
        { 'source': '1', 'target': '3' },
        { 'source': '2', 'target': '4' },
        { 'source': '4', 'target': '5' },
        { 'source': '4', 'target': '6' },
        { 'source': '4', 'target': '7' },
        { 'source': '2', 'target': '8' },
        { 'source': '8', 'target': '9' },
        { 'source': '8', 'target': '10' },
        { 'source': '2', 'target': '11' },
        { 'source': '11', 'target': '12' },
        { 'source': '11', 'target': '13' },
        { 'source': '2', 'target': '14' },
        { 'source': '2', 'target': '15' },
        { 'source': '3', 'target': '16' },
        { 'source': '3', 'target': '17' },
        { 'source': '3', 'target': '18' },
        { 'source': '3', 'target': '19' }
    ]

    }

    return jsonify(response)

@app.route('/process_pdf_llm', methods=['GET'])
def process_pdf_llm():
    # TODO: Implement actual PDF processing using LLM model
    # For now, we'll assume that the "processed" PDF text is "colorful socks"
    processed_pdf_text = "colorful socks"

    # Use the LLM chain to generate a response
    response = llm_chain(processed_pdf_text)
    return jsonify(response)




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
