Here’s your **updated README** with **MySQL** as the database instead of PostgreSQL/MongoDB. 🚀  

---

# **ThreadHive**  

ThreadHive is a social media platform built using a **microservices architecture**. It leverages **Docker** for containerization, **NestJS** for backend development, and **GraphQL** for efficient data querying. The project is designed to be **scalable, modular, and easy to deploy** using **Docker Compose**.

## **Table of Contents**  

- [**Architecture Overview**](#architecture-overview)  
- [**Technologies Used**](#technologies-used)  
- [**Microservices**](#microservices)  
- [**Prerequisites**](#prerequisites)  
- [**Getting Started**](#getting-started)  
- [**Usage**](#usage)  
- [**Screenshots**](#screenshots)  
- [**Contributing**](#contributing)  
- [**License**](#license)  

---

## **Architecture Overview**  

ThreadHive is developed using a **distributed microservices architecture**, where each service is responsible for a specific function (e.g., user authentication, post management, notifications). These services communicate via APIs or messaging queues, ensuring **scalability, fault tolerance, and maintainability**.

Each microservice runs in a separate **Docker container**, allowing easy deployment and orchestration.  

---

## **Technologies Used**  

### **1. NestJS**  
NestJS is a **progressive Node.js framework** used for building efficient and scalable server-side applications. It follows **TypeScript** by default and is heavily inspired by **Angular’s modular structure**. It uses **dependency injection, decorators, and a layered architecture**, making it highly maintainable.

🔹 *Why NestJS?*  
✅ Strong TypeScript support  
✅ Built-in support for **GraphQL, WebSockets, and REST APIs**  
✅ Modular and scalable architecture  
✅ Integrated Dependency Injection  

### **2. GraphQL**  
GraphQL is an alternative to **REST APIs** that allows clients to **request exactly the data they need**. This prevents over-fetching or under-fetching of data.

🔹 *Why GraphQL?*  
✅ **Efficient queries** (fetch multiple resources in one request)  
✅ **Strongly typed schema**  
✅ **Better frontend-backend interaction**  

### **3. Docker & Docker Compose**  
Docker is used for **containerization**, allowing each microservice to run in an **isolated environment**. Docker Compose helps **orchestrate multiple containers** easily.

🔹 *Why Docker?*  
✅ Ensures the project runs **consistently across different environments**  
✅ **Easier deployment and scaling**  
✅ Reduces dependency conflicts  

### **4. MySQL**  
ThreadHive uses **MySQL** as its primary relational database.

🔹 *Why MySQL?*  
✅ **Fast and efficient** for structured data storage  
✅ **Widely adopted** and supports **ACID transactions**  
✅ Compatible with **ORMs like Prisma or TypeORM** for easy integration  

### **5. RabbitMQ / Redis (Optional)**  
For **asynchronous communication**, RabbitMQ or Redis is used as a **message broker**. This helps in:  
- Event-driven architecture  
- Efficient task processing (e.g., sending notifications)  

---

## **Microservices**  

The system consists of multiple **independent services**, each handling a specific responsibility:  

- **User Service** → Handles user authentication (Signup/Login), JWT-based authorization, and profile management.  
- **Post Service** → Manages posts, comments, likes, and media uploads.  
- **Database Service** → Interfaces with **MySQL**.  
- **Gateway API** → Acts as an **API Gateway** to route client requests to the correct microservice.  
- **Notification Service (Optional)** → Handles real-time user notifications.  

Each of these services runs inside **Docker containers** for easy scaling and deployment.

---

## **Prerequisites**  

Before running the application, ensure you have the following installed:  

- **[Docker](https://www.docker.com/get-started)** → For running services inside containers  
- **[Docker Compose](https://docs.docker.com/compose/)** → For managing multiple containers  
- **[Node.js (v16+)](https://nodejs.org/)** → Required for NestJS development  
- **[MySQL](https://www.mysql.com/downloads/)** → Database for structured data  

---

## **Getting Started**  

1️⃣ **Clone the Repository**  

```bash
git clone https://github.com/guptaarth87/ThreadHive.git
cd ThreadHive
```

2️⃣ **Set Up Environment Variables**  

- Copy `.env.example` and rename it to `.env`  
- Update MySQL database credentials:

  ```ini
  DATABASE_HOST=mysql
  DATABASE_PORT=3306
  DATABASE_USER=root
  DATABASE_PASSWORD=yourpassword
  DATABASE_NAME=threadhive
  ```

3️⃣ **Run the Application using Docker Compose**  

```bash
docker-compose up --build
```

This command will:  
✔️ Build and start all microservices  
✔️ Set up MySQL database  
✔️ Start the API Gateway  

4️⃣ **Access the API**  

- API Gateway → `http://localhost:3000`  
- GraphQL Playground → `http://localhost:3000/graphql`  

---

## **Usage**  

Once the backend is running, you can:  

✅ **Register a new user** → via `/auth/signup`  
✅ **Log in** → via `/auth/login`  
✅ **Create a new post** → via `/post/create`  
✅ **Query user profiles** → via `GraphQL Playground`  

---

## **Screenshots**  

| Feature  | Screenshot |
|----------|-----------|
| **Home Page** | ![Home Page](screenshots/home.png) |
| **User Profile** | ![Profile Page](screenshots/profile.png) |

---

## **Contributing**  

We welcome contributions to improve ThreadHive! To contribute:  

1. **Fork the repository**  
2. **Create a new branch** for your feature/bugfix  
3. **Commit your changes** with meaningful commit messages  
4. **Push your branch** and open a **Pull Request**  

---

## **License**  

ThreadHive is licensed under the **MIT License**.  

---

### ✨ *ThreadHive - A Scalable Social Media App Built for Developers!* 🚀  

---

This README is now **fully aligned with MySQL** as the primary database. Let me know if you need any other refinements! 🚀🔥
