# SkillNest 🛠️  
*A Hyperlocal Skill Exchange Platform*

SkillNest is a web-based hyperlocal marketplace designed to connect people who need services with nearby skilled professionals. Unlike traditional freelancing platforms that focus on remote digital work and charge high commissions, SkillNest enables trusted, peer-to-peer service exchange within local communities.

---

## 🚀 Problem Statement

Local service providers such as plumbers, electricians, tutors, and fitness trainers lack efficient discovery platforms tailored to their geographic vicinity. Existing freelancing platforms primarily serve digital services and impose high commission fees, making them unsuitable for hyperlocal, physical services.

---

## 💡 Solution

SkillNest solves this by providing:
- Hyperlocal task discovery
- A transparent bidding system
- Direct communication between users
- Reputation-based trust through ratings and reviews

The platform focuses on **simplicity, speed, and trust**, making local service exchange seamless and accessible.

---

## 🎯 Core Features (MVP)

### 👤 User Management
- User registration and authentication
- User profiles with skills, location, and ratings

### 📌 Task Posting
- Create service requests with description, category, budget, and location
- Browse and filter nearby tasks

### 💰 Bidding System
- Service providers can place bids on tasks
- Task owners can review bids and accept one
- Task status updates automatically

### 💬 Messaging
- One-to-one chat enabled after bid acceptance
- Simple and secure communication channel

### ⭐ Reviews & Ratings
- Mutual ratings after task completion
- Reputation score updated dynamically

---

## 🧱 Tech Stack

### Frontend
- HTML, CSS, JavaScript
- EJS templating
- Bootstrap for responsive UI

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication

### Deployment
- Frontend: Vercel  
- Backend: Render / Railway  
- Database: MongoDB Atlas

---

## 🏗️ Architecture Overview

- MVC-based backend architecture
- RESTful API design
- Secure authentication & authorization
- Modular database schema for scalability

---

## 🗂️ Database Models

- **User** – profile, skills, location, ratings
- **Task** – service request details and status
- **Bid** – bid amount, bidder, and state
- **Message** – chat messages linked to tasks
- **Review** – ratings and feedback

---

## 🧪 Demo Flow (For Judges)

1. User A posts a task  
2. User B places a bid  
3. User A accepts the bid  
4. Chat is enabled  
5. Task is marked completed  
6. Both users rate each other  

---

## 🏆 Why SkillNest?

- Encourages local micro-entrepreneurship  
- Reduces dependency on expensive middlemen  
- Builds trust through transparent ratings  
- Designed to scale with payments and advanced verification in the future  

---

## 🔮 Future Enhancements

- Real payment gateway integration
- Location-based distance filtering
- Identity verification
- Notification system
- Admin moderation dashboard

---

## 📄 Hackathon Details

- **Track:** FinTech & E-Commerce (Glacier Commerce)
- **Event:** CODE@FROST Hackathon
- **Duration:** 31 hours
- **Built entirely during the hackathon**

---

## 🧑‍💻 Team

- Arghya — Full Stack Developer

---

## 📜 License

This project is licensed under the MIT License.
