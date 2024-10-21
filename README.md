PropertyFinder
PropertyFinder is a full-stack web application that allows users to browse and book properties for their next holiday. The app provides features to search, filter, and manage properties, along with authentication, wishlist management, and smooth animations between components.

Features
1. Browse & Book Properties
  Explore a wide range of properties available for your next holiday.
  View detailed information about each property.
  Book properties directly through the app.
2. Create, Edit, Delete Properties
  Create a new property with all the necessary details.
  Edit existing properties to update their information.
  Delete properties when they are no longer available.
3. Search & Filter Properties
  Search for properties based on location or keywords.
  Filter properties based on various criteria (e.g., price, location, type).
4. User Authentication
  Secure login and logout functionalities.
  Authentication is managed using JWT (JSON Web Tokens).
5. Wishlist Management
  Add properties to a personalized wishlist for easy access later.
  Remove properties from the wishlist at any time.
6. Smooth Animations
   Transitions between components are animated using Framer Motion, providing a seamless user experience.
   
Tech Stack

  1.Frontend
      React: For building a responsive and interactive user interface.
      React Query: For managing server state and data fetching.
      Framer Motion: For animations and smooth transitions between components.
      
  2.Backend
      Node.js: Backend server runtime.
      Express: Web framework for building the API.
      MongoDB: NoSQL database for storing property and user data.
      
  3.Authentication
      JWT (JSON Web Tokens): For secure authentication and user session management.

Installation
To run this project locally, follow these steps:

Clone the Repository:
bash
Copy code
git clone https://github.com/your-username/PropertyFinder.git
cd PropertyFinder

Backend Setup:
Navigate to the backend directory and install dependencies:
bash
Copy code
cd backend
npm install

Create a .env file in the backend folder to store environment variables:
bash
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

Start the backend server:
bash
Copy code
npm start

Frontend Setup:
Navigate to the frontend directory and install dependencies:
bash
Copy code
cd frontend
npm install
Start the frontend server:
bash
Copy code
npm start

Access the App:
Open your browser and visit http://localhost:3000 to start using PropertyFinder.

Some screenshots with the app
Homescreen
![image](https://github.com/user-attachments/assets/4c0f20a9-3d43-4381-b0a6-1ec02be3b2a1)
![image](https://github.com/user-attachments/assets/b50179de-addf-4238-9e0e-a210865bf25a)
![image](https://github.com/user-attachments/assets/99f0fe76-7c8d-4570-b4c4-75cf626a6999)

Register Screen
![image](https://github.com/user-attachments/assets/2ec3ec92-3e23-47bb-bea8-641718ae51b0)

Wish List
![image](https://github.com/user-attachments/assets/0e61fbb5-352f-45e0-b73e-78a6ee486033)

Reservation List
![image](https://github.com/user-attachments/assets/cdd26431-99df-480e-907b-b638ca72d0d3)

Trip List
![image](https://github.com/user-attachments/assets/79925fdf-2dcf-451d-a6de-cb593c5457d8)

Booking Page
![image](https://github.com/user-attachments/assets/0f4184ac-28f5-4540-a506-b5d1280aab9a)





