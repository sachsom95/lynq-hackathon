from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
import io
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
import os

app = Flask(__name__)

# Set your OpenAI API Key
api_key = "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"
os.environ["OPENAI_API_KEY"] = api_key

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/process_pdf', methods=['GET'])
def process_pdf():
    # TODO: Implement PDF processing using LLM model

    # For now, just return the data structure provided in the question
    response = {
        'nodes': [
            {'id': '1', 'data': {'label': 'Benefit Options'}},
            {'id': '2', 'data': {'label': 'Northwind Health Plus'}},
            {'id': '3', 'data': {'label': 'Northwind Standard'}},
            {'id': '4', 'data': {'label': 'Medical Services'}},
            {'id': '5', 'data': {'label': 'Hospital Stays'}},
            {'id': '6', 'data': {'label': 'Doctor Visits'}},
            {'id': '7', 'data': {'label': 'Lab Tests and X-rays'}},
            {'id': '8', 'data': {'label': 'Emergency Services'}},
            {'id': '9', 'data': {'label': 'In-Network Emergency Services'}},
            {'id': '10', 'data': {'label': 'Out-of-Network Emergency Services'}},
            {'id': '11', 'data': {'label': 'Prescription Drug Coverage'}},
            {'id': '12', 'data': {'label': 'Generic and Brand-Name Drugs'}},
            {'id': '13', 'data': {'label': 'Specialty Drugs'}},
            {'id': '14', 'data': {'label': 'Mental Health and Substance Abuse Coverage'}},
            {'id': '15', 'data': {'label': 'Vision and Dental Services'}},
            {'id': '16', 'data': {'label': 'Tips for Coordinating Benefits'}},
            {'id': '17', 'data': {'label': 'COB Definitions'}},
            {'id': '18', 'data': {'label': 'Tips for Employees'}},
            {'id': '19', 'data': {'label': 'Coverage for Hospice Care'}}
        ],
        'edges': [
            {'source': '1', 'target': '2'},
            {'source': '1', 'target': '3'},
            {'source': '2', 'target': '4'},
            {'source': '4', 'target': '5'},
            {'source': '4', 'target': '6'},
            {'source': '4', 'target': '7'},
            {'source': '2', 'target': '8'},
            {'source': '8', 'target': '9'},
            {'source': '8', 'target': '10'},
            {'source': '2', 'target': '11'},
            {'source': '11', 'target': '12'},
            {'source': '11', 'target': '13'},
            {'source': '2', 'target': '14'},
            {'source': '2', 'target': '15'},
            {'source': '3', 'target': '16'},
            {'source': '3', 'target': '17'},
            {'source': '3', 'target': '18'},
            {'source': '3', 'target': '19'}
        ]
    }

    return jsonify(response)


def get_llm_response(my_prompt):
    llm = OpenAI(model_name="gpt-3.5-turbo")
    template = "{my_prompt}"
    prompt = PromptTemplate(template=template, input_variables=["my_prompt"])
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(my_prompt)
    return response


@app.route('/process_pdf_llm', methods=['GET'])
def process_pdf_llm():
    file_path = request.args.get('file')

    if not file_path:
        return jsonify({'error': 'No file provided'}), 400

    # Check if the file is a PDF
    if file_path.endswith('.pdf'):
        with open(file_path, 'rb') as f:
            pdf_data = f.read()

        # Extract text from the PDF using PyPDF2
        pdf_reader = PdfReader(io.BytesIO(pdf_data))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Process the extracted text using LLM
        complete_prompt = "Your complete prompt: " + text
        response = get_llm_response(complete_prompt)

        return response

    return jsonify({'error': 'Invalid file format. Only PDF files are accepted.'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001)
