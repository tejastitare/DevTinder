# DevTinder APIs

## authRouter
- POST /signup 
- POST /login 
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  //Forgot password API

## connectionRequestRouter

- POST /request/send/:status/:userId
<!-- - POST /request/send/ignored/:userId -->
- POST /request/review/:status/:requestId
<!-- - POST /request/review/rejected/:requestId -->

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform



**Sending Emails Via SES**

- Create a IAM User
- Give Access to amazonSESfullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address
- Install AWS SDK - V3
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples

- Setup sesClient
- Access credentials should be created in IAM under Security Credentials Tab
- Add the credentials to .env file
- Write Code for sesClient
- Write code for sending email address
- Make the email dynamic by passing more params to the run function






https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html


**Razorpay payment gateway Intgration**

 - SignUp on Razorpay and complete KYC
 - Created a UI for Premium Page
 - Creating an API for create order in backend
 - added the key and secret in env file
 - Initialized Razorpay in utils
 - Creating order on Razorpay
 - Create Schema and model
 - saved the order in payments collection
 - make the API dynamic
 - Setup Razorpay webhook on your live API
 - Ref - https://github.com/razorpay-node/tree/master/documents
 - Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway

- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/


**Real Time chat using Websockets(Socket.io)**
- Build the UI for chat window cchat/:targetUserId
- Setup socket.io in backend
- npm i socket.io
- Setup frontend socket.io-client
- Initialise the chat   
- create socket connection
- Listen to events
- Homework: Improve the UI
- Homework: Fix security Bug - Can I send messages to person who is not my friend? - auth in web sockets
- Homework: Fix bug - If I'm not friend, then I should not be able to send message
- Homework: feat: Show green symbol when Online???? - [ Last seen 2 hours ago ]
- Homework: Limit messages when fetching from DB OR Pagination in chats
- Project Ideas - TIC TAC TOE GAME
- Project Ideas - CHESS GAME