#!/home/zam/ai_agent/ai_day/myenv/bin/python

import mysql.connector
from openai import OpenAI
from fastapi import HTTPException, Header, Request
from collections import defaultdict
import os
from langchain.embeddings import OpenAIEmbeddings
#from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import json
from datetime import datetime
import openai 
import logging
import re

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="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",
)

def ai_survey(answers,tm_staff_id):
    print("invoke ai survey competency test")
    # set of questions
    
    questions = [
        {
            "question": "Hi there! 👋 Welcome to AI Day at TM. Before we dive in, I'd love to understand your knowledge of AI a bit better. Here's my first question for you:\n\nWhich of the following best describes AI?",
            "options": ["A. Computers performing tasks that require human intelligence",
                        "B. Automating routine office tasks using macros",
                        "C. Networking devices for faster internet",
                        "D. A code that sorts data alphabetically"],
            "correct": "a"
        },
        {
            "question": "Which of these is NOT an example of AI in daily life?",
            "options": ["A. Email app suggesting replies based on message content",
                        "B. Image enhancement feature in a smartphone camera",
                        "C. Automatic screen brightness adjustment on a mobile device",
                        "D. E-commerce website recommending products based on past browsing behavior"],
            "correct": "c"
        },
        {
            "question": "Which factor poses the greatest challenge to ensuring fairness in an AI-based job screening application?",
            "options": ["A. Differences in applicant Internet connectivity during the application process",
                        "B. The choice of programming language used to build the AI model",
                        "C. Implicit biases present in historical hiring data used for model training",
                        "D. The speed at which applications are processed by the underlying server hardware"],
            "correct": "c"
        },
        {
            "question": "What is the main difference between Supervised and Unsupervised Learning?",
            "options": ["A. Supervised uses labeled data; unsupervised uses unlabeled data",
                        "B. Supervised is faster than unsupervised",
                        "C. Unsupervised has fewer errors than supervised",
                        "D. There is no difference"],
            "correct": "a"
        },
        {
            "question": "For generative language models like GPT, which limitation is MOST relevant?",
            "options": ["A. They can only perform binary classification tasks.",
                        "B. They may produce text that is plausible but factually inaccurate.",
                        "C. They require labeled output for every input sequence.",
                        "D. They have no dependence on the size of training data."],
            "correct": "b"
        }
    ]

    total_questions = len(questions)

    if len(answers) < total_questions:
        q = questions[len(answers)]
        return {
            "status": "success",
            "level": "",
            "score": "",
            "competency_status": "in progress",
            "message": f"{q['question']}\n" + "\n".join(q["options"])
        }
    else:
        score = sum(1 for i, ans in enumerate(answers) if ans.lower() == questions[i]['correct'])
        # Calculate the competency level based on the score
        if score <= 2:
            level = "AI Explorer"
            level_prompt = "AI Explorer - Limited knowledge/awareness of AI and its applications"
        elif score <= 4:
            level = "AI Conversant"
            level_prompt = "AI Conversant - Familiarity with AI concepts"
        else:
            level = "AI Competent"
            level_prompt = "AI Competent - Strong understanding of AI"

        try:
                conn = mysql.connector.connect(
                    host="localhost",
                    user="tm_ai_day",
                    password="sdj342kaHLRsdj232SDsdsf3NJD",
                    database="tm_ai_day"
                )
                cursor = conn.cursor()
                insert_query =  """
                                    INSERT INTO ai_competency_level 
                                    (tm_id, score, competency_level, questionnaire_answers) 
                                    VALUES (%s, %s, %s, %s)
                                """
                cursor.execute(insert_query, (tm_staff_id, score, level, "".join(answers)))
                conn.commit()
                cursor.close()
                conn.close()
        except mysql.connector.Error as err:
            return {
                "status": "error",
                "message": f"MySQL Error: {err}"
            }

        response = client.chat.completions.create(
        model="gpt-4.1-mini",  # Use "gpt-3.5-turbo" if needed
        messages=[
            {"role": "system", "content": f"You are an Telekom Malaysia AI Day chatbot. You need to welcoming Warga TM to AI Day. The user just completed the AI survey. You need to congratulates them and welcome them in english. End your welcome with asking user what can I help with. Do mention the level without description. This is the user's level: {level_prompt}."},
            # {"role": "user", "content": ""}
        ],
        temperature=0.7,
        max_tokens=300
    )

        return {
            "status": "success",
            "competency_status": "complete",
            "score": score,
            "level": level,
            "message": response.choices[0].message.content
        }

def has_taken_competency_test(tm_id):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="tm_ai_day",
            password="sdj342kaHLRsdj232SDsdsf3NJD",
            database="tm_ai_day"
        )
        cursor = conn.cursor()
        query = "SELECT COUNT(*) FROM ai_competency_level WHERE tm_id = %s"
        cursor.execute(query, (tm_id,))
        result = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return result > 0
    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")
        return False
    
def get_user_level_score(tm_id: str):
    conn = mysql.connector.connect(
        host="localhost",
        user="tm_ai_day",
        password="sdj342kaHLRsdj232SDsdsf3NJD",
        database="tm_ai_day"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT competency_level, score FROM ai_competency_level WHERE tm_id = %s", (tm_id,))
    result = cursor.fetchone()
    conn.close()
    if result:
        return result[0], result[1]
    return "", ""

def general_chat_response_old(user_input, level):
    print("invoke general chat")
    print("User input: ", user_input)
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are an AI chatbot for TM AI Day. Always greet user nicely. You are friendly and helpful. User level of competency is: " + level},
            {"role": "user", "content": user_input}
        ],
        temperature=0.7,
        max_tokens=300
    )
    return response.choices[0].message.content

def group_documents_by_name(sources):
    """
    Groups documents by name and consolidates their page numbers, incrementing each page number by 1.
    
    Parameters:
        sources (list): List of Document objects with metadata.
        
    Returns:
        list: List of dictionaries with document names and sorted page numbers.
    """
    doc_metadata = defaultdict(set)
    for doc in sources:
        metadata = doc.metadata
        doc_name = metadata["document_name"]
        page_number = metadata["page_number"]

        if page_number is not None:
            doc_metadata[doc_name].add(page_number + 1)  # Increment page number by 1

    return [{"document_name": doc, "pages": sorted(pages)} for doc, pages in doc_metadata.items()]

def reset_openai_key():
    os.environ["OPENAI_API_KEY"] = "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"
    openai.api_key = "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"

def process_conversation(query,db_name,chat_model,instruction_prompt, context=[]):
    # Select which embeddings we want to use
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large",openai_api_key="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")
    
    print("db reloading..")
    db = Chroma(persist_directory="./" + "./embeddings/" + db_name, embedding_function=embeddings)
    print("db reloaded..")
    try:
        retriever = db.as_retriever(search_type="similarity_score_threshold", search_kwargs={"k": 5, "score_threshold": 0.00})
        retriever = db.as_retriever(search_type="similarity", search_kwargs={"k":5})
        print("answer querying..")
        # sources = retriever.get_relevant_documents(query, return_metadata=True)
        print("answer queried..")
        sources = retriever.get_relevant_documents(query)

    except Exception as e:
        retriever = db.as_retriever(search_type="similarity_score_threshold", search_kwargs={"k": 1, "score_threshold": 0.00})
        sources = retriever.get_relevant_documents(query)
        print("Error retrieving documents:", str(e))
    # Organize metadata by document name
    metadata_dict = group_documents_by_name(sources)
    prompts = []

    # Extract page content
    for i,source in enumerate(sources):
        page_content = source.page_content
        # construct prompts based on the retrieved text chunks in results 
        prompt = "Reference " + str(i+1) + ":" + page_content + "\n\n"
        prompts.append(prompt)
    prompts.reverse()

    # Generate the formatted prompts string with each prompt on a new line
    formatted_prompts = "\n".join(f"- {prompt}" for prompt in prompts)
    
    prompt_query = f"""
                    1. Follow this instruction:
                    {instruction_prompt}
                    2. Information/context:
                    {formatted_prompts}
                    Query: {query}
                    """
    if len(context) < 3:
            context = [{"role": "system", "content": "You are a helpful assistant."}]
    # get the answer
    # openai_res = openai.ChatCompletion.create(
    #     model = chat_model,
    #     messages = context[-3:] + [{"role": "user", "content": prompt_query}],
    #     temperature=0,
    # )
    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        #api_key=os.environ.get("OPENAI_API_KEY"),
        api_key="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",
    )
    openai_res = client.chat.completions.create(model = chat_model, messages = context[-3:] + [{"role": "user", "content": prompt_query}], temperature=0)

    # append sources to openai reponse
    openai_res.source = json.dumps([ob.__dict__ for ob in sources])
    # print("Sources Debug:", [ob.__dict__ for ob in sources])

    openai_res.reference = metadata_dict
    reset_openai_key()
    return openai_res

def general_chat_response(user_input, level):
    try:
        query = user_input
        db_name = "ai_db"
        instruction_prompt = "You are an AI chatbot for TM AI Day. Always greet user nicely. You are friendly and helpful. User level of competency is: " + level + ". Only answer questions related to information in the files. If user ask about floor plan, and about where booth is located, answer your answer and return this floor plan image link: https://drive.usercontent.google.com/download?id=1VytyGMr9eE8Tmy4AM3-KV9xtvDJ3d99n&export=view&authuser=0"
        if not os.path.isdir("./embeddings/" + db_name):
            return {"success": False, "message": "vector embedding not exists", "status":404}
        
        if not query:
            return {"success": False, "message": "Query parameter not provided.", "status":404}

        # Process the conversation and generate responses
        # Set context to an empty list if not provided
        #context = context or []
        context = []

        # Process the conversation and generate responses
        result = process_conversation(query, db_name, "gpt-4.1-mini", instruction_prompt, context)

        # Set up logging configuration
        log_file_path = "./query_logs/" + db_name + "_query_log.txt"
        if not os.path.exists(log_file_path):
            with open(log_file_path, 'w') as f:
                f.write("")

        logging.basicConfig(filename=log_file_path, level=logging.INFO)
        logging.info(f" [{datetime.now()}] - Query: {query}, Database: {db_name}, Model: gpt-4.1-mini, Result: {result}")

        #return {"success": True, "message": "Response generated successfully", "status":200, "data": result}
        return result.choices[0].message.content

    except Exception as e:
        raise Exception(f"Connection error: {str(e)}") 

# NEW HELPER FUNCTIONS FOR REGISTRATION FIX

def extract_registration_info(message):
    """
    Extract LOB and objective from user message
    Returns tuple (lob, objective) or (None, None) if not found
    """
    if not message:
        return None, None
    
    message_lower = message.lower()
    lob = None
    objective = None
    
    # Pattern matching for LOB
    lob_patterns = [
        r"line of business:\s*(.+?)(?:\n|objective:|$)",
        r"lob:\s*(.+?)(?:\n|objective:|$)",
        r"business:\s*(.+?)(?:\n|objective:|$)"
    ]
    
    for pattern in lob_patterns:
        match = re.search(pattern, message_lower)
        if match:
            lob = match.group(1).strip()
            break
    
    # Pattern matching for objective
    objective_patterns = [
        r"objective:\s*(.+?)(?:\n|line of business:|lob:|$)",
        r"objectives:\s*(.+?)(?:\n|line of business:|lob:|$)",
        r"goal:\s*(.+?)(?:\n|line of business:|lob:|$)"
    ]
    
    for pattern in objective_patterns:
        match = re.search(pattern, message_lower)
        if match:
            objective = match.group(1).strip()
            break
    
    return lob, objective

def check_if_user_registered(staff_id):
    """
    Check if user is already registered (has LOB and objective in database)
    """
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="tm_ai_day",
            password="sdj342kaHLRsdj232SDsdsf3NJD",
            database="tm_ai_day"
        )
        cursor = conn.cursor()
        query = "SELECT objective, lob FROM ai_competency_level WHERE tm_id = %s"
        cursor.execute(query, (staff_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if result and result[0] and result[1]:  # Both objective and lob exist
            return True, result[1], result[0]  # lob, objective
        return False, None, None
    except mysql.connector.Error as err:
        print(f"MySQL Error: {err}")
        return False, None, None

# Check if a message indicates registration intent
def is_registration_intent(message):
    if not message:
        return False
        
    # Define registration keywords
    registration_keywords = [
        "register", "registration", "sign up", "signup", "sign me up", 
        "join event", "attend", "registration form", "want to register",
        "wanted to register", "like to register", "would like to register"
    ]
    
    # Convert message to lowercase for case-insensitive matching
    message_lower = message.lower()
    
    # Check if any registration keyword is in the message
    for keyword in registration_keywords:
        if keyword in message_lower:
            return True
            
    return False

#MAIN FUNCTION CALLING - UPDATED
def run_conversation(messages, user_input, level, staff_id):
    available_functions = {"staff_registration": staff_registration}
    
    # Check if user is already registered
    is_registered, existing_lob, existing_objective = check_if_user_registered(staff_id)
    
    # System context that doesn't repeat the registration question if it's already been asked
    context = f"""
    You are an AI chatbot for TM AI Day. Always greet user nicely. You are friendly and helpful.
    If this is the first message from the user and they're not registered, ask if they want to register or find out more about TM AI Day.
    Be aware of the chat history and avoid asking the same question multiple times.
    Do not repeat the registration question if you've already asked it.
    User registration status: {'Registered' if is_registered else 'Not registered'}
    """

    # Define description for the functions
    functions = [
        {
            "name": "staff_registration",
            "description": "Call this function when the user expresses any intent to register for TM AI Day, even without providing LOB or objectives. This function handles the registration process and will ask for more information if needed.",
            "parameters": {
                "type": "object",
                "properties": {
                    "staff_id": {
                        "type": "string",
                        "description": "staff unique ID",
                        "default": staff_id
                    },
                    "level": {
                        "type": "string",
                        "description": "level of AI competency of the user",
                        "default": level
                    },
                    "objective": {
                        "type": "string",
                        "description": "objectives of user on attending TM AI Day",
                    },
                    "lob": {
                        "type": "string",
                        "description": "line of business (LOB) of user",
                    },
                },
                "required": ["staff_id", "level"]
            },
        },
    ]

    # Keep the first message and the latest messages
    filtered_messages = [{"role": "system", "content": context}] + messages[-15:]
    
    # Check if this is a registration intent
    force_function = is_registration_intent(user_input)
    
    # If user is already registered and asking about registration, don't call function
    if is_registered and force_function:
        return {
            "role": "assistant", 
            "content": f"You're already registered for TM AI Day! Your LOB is {existing_lob} and your objective is {existing_objective}. How else can I help you today?"
        }
    
    # Try to extract registration info from the current message
    extracted_lob, extracted_objective = extract_registration_info(user_input)
    
    # Check if we should call the registration function with extracted parameters
    should_call_registration = False
    function_args = {"staff_id": staff_id, "level": level}
    
    if force_function or (extracted_lob and extracted_objective):
        should_call_registration = True
        if extracted_lob and extracted_objective:
            function_args["lob"] = extracted_lob
            function_args["objective"] = extracted_objective
    
    if should_call_registration:
        print("Calling registration function with args:", function_args)
        function_response = staff_registration(**function_args)
        return {"role": "assistant", "content": function_response}
    
    # If not a registration intent, proceed with normal conversation
    try:
        query = user_input
        db_name = "ai_db"
        
        instruction_prompt = f"""
        Only answer questions related to information in the files. 
        If the question is not related to the information in the files, or if the previous message already answered the query, don't repeat the same answer.
        If user ask anything related to floor plan, or about where booth is located, answer your answer and return this floor plan image link: https://ai.tm.com.my/AI-Day/AI-DAY-floor-plan.jpeg
        If user ask about speakers of TM AI Day, answer by returning information of speakers' name, speakers' image url, speakers' title and session's title for each speaker in JSON format, the information is as below: 
       
            "name": "Syaful Mohamed",
            "title": "Digital Content Creator",
            "session_title": "Creativity Reimagined: AI in Design and Visual Innovation",
            "image_link": "https://ai.tm.com.my/AI-Day/speaker-syaful.png"
        
            "name": "Warren Leow",
            "title": "CEO Pixlr Group",
            "session_title": "Shaping Digital Influence: The Future of Content Creation with AI",
            "image_link": "https://ai.tm.com.my/AI-Day/speaker-warren.png"
       
            "name": "Yu-Chiang Frank Wang",
            "title": "Research Director NVIDIA",
            "session_title": "AI Computing Power & Future Trends - Building a Thriving AI Ecosystem in Malaysia: Opportunities & Challenges (Panelist)",
            "image_link": "https://ai.tm.com.my/AI-Day/speaker-yu-chiang.png"
        
            "name": "Nizam Abdul Razak",
            "title": "Founder Monsta",
            "session_title": "AI Computing Power & Future Trends - Building a Thriving AI Ecosystem in Malaysia: Opportunities & Challenges (Panelist)",
            "image_link": "https://ai.tm.com.my/AI-Day/speaker-nizam.png"
       
            "name": "Sam Majid",
            "title": "Head of NAIO",
            "session_title": "AI Computing Power & Future Trends - Building a Thriving AI Ecosystem in Malaysia: Opportunities & Challenges (Panelist)",
            "image_link": "https://ai.tm.com.my/AI-Day/speaker-sam.png"
        
        Answer based on user AI Competency level, user level is: {level}
        """

        if not os.path.isdir("./embeddings/" + db_name):
            return {"success": False, "message": "vector embedding not exists", "status":404}
        
        if not query:
            return {"success": False, "message": "Query parameter not provided.", "status":404}

        # Process the conversation and generate responses
        context_rag = []
        result = process_conversation(query, db_name, "gpt-4.1-mini", instruction_prompt, context_rag)

        # Set up logging configuration
        log_file_path = "./query_logs/" + db_name + "_query_log.txt"
        if not os.path.exists(log_file_path):
            with open(log_file_path, 'w') as f:
                f.write("")

        logging.basicConfig(filename=log_file_path, level=logging.INFO)
        logging.info(f" [{datetime.now()}] - Query: {query}, Database: {db_name}, Model: gpt-4.1-mini, Result: {result}")

        message_obj = result.choices[0].message

        response_dict = {
            "role": message_obj.role,
            "content": message_obj.content
        }

        return response_dict

    except Exception as e:
        raise Exception(f"Connection error: {str(e)}") 

#staff registration - UPDATED
def staff_registration(staff_id: str = None, level: str = None, objective: str = None, lob: str = None):
    if not staff_id or not level:
        raise ValueError("staff_id and level are required")
    
    # Check if LOB and objective are provided
    if not objective or not lob:
        # Ask for missing information with display form trigger
        return "Great! To get started with your registration, could you please tell me your line of business (LOB) and the objectives you have for attending TM AI Day? You can provide both together. [display form]"
    
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="tm_ai_day",
            password="sdj342kaHLRsdj232SDsdsf3NJD",
            database="tm_ai_day"
        )
        cursor = conn.cursor()
        insert_query =  """
                            UPDATE ai_competency_level SET
                            objective = %s, lob = %s
                            WHERE tm_id = %s
                        """
        cursor.execute(insert_query, (objective, lob, staff_id))
        conn.commit()
        cursor.close()
        conn.close()
        
        prompt = f"""
        Congratulate the user for successfully registering for TM AI Day.
        Then provide user with events, agenda, and the details from TM AI Day that are relevant for them to join based on level of AI competency, objective, and their line of business (LOB).
        User's level is: {level}, user's objective: {objective}, user's LOB is: {lob}. 
        """
        # Call the LLM 
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )
        res = response.choices[0].message.content
        res = res.replace("**", "")

        return res
    except mysql.connector.Error as err:
        return f"MySQL Error: {err}"