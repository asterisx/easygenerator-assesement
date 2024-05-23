### Run Instructions:

Navigate to the root and run the following command to start the project:

`docker-compose up`

Wait a bit for docker to build the containers and start the server. If you wish to run the containers with live editing enabled, run the following command:

`docker-compose watch`

Note: Watch is supported in docker version `2.22.0` and up

### Design Decisions:

#### Environment Variables:

For local development, `.env` files were utilized to manage environment variables. Although not the best practice, it provides ease of management and suffices for a coding assessment.

#### Object-Relational Mapping (ORM):

Mongoose and decorators was chosen as the ORM layer due to its compatibility with MongoDB. It simplifies database interactions and effectively maps MongoDB schemas to TypeScript interfaces. Despite its limitations, such as schema rigidity, Mongoose is well-suited for this assesement's database requirements.

#### Error Handling:

Comprehensive error handling and graceful error message displays are not extensively implemented in this project. The focus is primarily on establishing basic functionality and workflow.

### Schema
Right now types and fields are repeated across backend and frontend. Using GraphQL or other mechanisms of Schema sync between frontend and backend would be the right pattern. But for this coding assesement I kept it simple and favored quick implementation.

### Requirements:

- [x] **Front-end Development Requirements:**

  - [x] Develop the user authentication module using either the React or Vue framework.
  - [x] Design elements are open to your creativity.
  - [x] Flexibility to choose any additional modules or libraries (including design frameworks) if necessary.

- [x] **Sign up page:**

  - [x] Create a signup form with the following fields: email, name, and password.
  - [x] After successful signup, users should be redirected to the application page.

- [x] **Password Requirements:**

  - [x] Minimum length of 8 characters.
  - [x] Contains at least 1 letter.
  - [x] Contains at least 1 number.
  - [x] Contains at least 1 special character.

- [x] **Sign in page:**

  - [x] Create a sign-in form with fields for email and password.

- [x] **Application Page:**

  - [x] Create a page displaying a welcome message: "Welcome to the application."

- [x] **Back-end Development Technical Stack Requirements:**

  - [x] Implement the back-end endpoints using the NestJS framework and integrate MongoDB as the database.
  - [x] You can choose the appropriate ORM and other libraries if needed.

- [x] **Notes:**

  - [x] Build API endpoints to sign up and sign in users to the application, taking into account the requirements to the fields described in the Front-end part.

- [x] **Nice to Haves:**

  - [x] Use TypeScript.
  - [x] Implement logging on the back end. `Basic Logging Implemented`
  - [x] Follow security best practices.

- [x] **Submission:**
  - [x] Once completed, create a public GitHub repository and push your code to it.
  - [x] Share the repository link with the recruiter.
