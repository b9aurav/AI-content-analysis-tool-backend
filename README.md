# AI-Powered content summarization and Analysis Tool API

## Run it Locally

1. **Clone the repository:**
    ```
    git clone https://github.com/b9aurav/AI-content-analysis-tool-backend.git
    cd AI-content-analysis-tool-backend
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Enable Google Cloud Natural Language API Access from GCP**
    
    * Make sure Google Cloud Natural Language API is enabled on your GCP Account.
    * Go to GCP Console > APIs & Services > Credentials > Create Credentials > Service Account.
    * Enter Service Account Name and Click on 'Done'.
    * Come back to Credentials page on GCP Console.
    * Click on Service Account you just created.
    * Go to KEYS tab
    * Click on ADD KEYS > CREATE NEW KEY
    * Select key type as JSON and click on CREATE
    * Save JSON Credentials on your local PC.
    * Set environment variable on local pc
    ```
    export GOOGLE_APPLICATION_CREDENTIALS=path-to-your-credentials-json-file
    ``` 
    To learn more, checkout official [docs](https://developers.google.com/analytics/devguides/config/admin/v1/quickstart-client-libraries)

3. **Set up environment variables:**
    - Rename .env.example to .env and add mongodb app id to .env file.
    ```
    mv .env.example .env
    ```
    ```
    REALM_APP_ID=
    ```

## Running the Project

1. **Start the development server:**
    ```
    node index.js
    ```
    Now API is live on port 8000

## API Routes

1. `/upload`: This API endpoint is used to upload, fetch and analyze the file. It accepts binary file as parameter. It supports .html, .doc, .docx and .txt files.

2. `/login`: This API endpoint is used to login the user from mongodb realm app service. It accepts object with email and password as parameter. It returns access token and username.

3. `/register`: This API endpoint is used to register to from mongodb realm app service. It accepts object with email and password as parameter. It automatically verifies the user once user logs in.

4. `/logout`: This API endpoint is used to logout user from mongodb realm app service. It accepts userid as parameter.

## Libraries:

1. `@google-cloud/language`: Google Cloud Natural Language API is used to analyze the file.
2. `@xenova/transformers`: Transformers is used to summarize the text.
3. `cheerio`: cheerio is used parse HTML file.
4. `express`: express is used to serve REST APIs.
5. `mammoth`: mammoth is used to parse doc files
6. `multer`: multer is used to store files on server.
