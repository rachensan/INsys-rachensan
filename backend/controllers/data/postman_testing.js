const postmanLinks = [ //NOT usable, just a note
  { 
    WHAT: "Create User",
    CRUD: "POST",
    path: "/api/users",
    link: "http://localhost:3000/api/users",
    body: {
      "full_name": "Juan Dela Cruz",
      "email": "juan@example.com",
      "password": "123456",
      "role": "teacher"
    }
  },
  {
    WHAT: "Create Exam",
    CRUD: "POST",
    path: "/api/exams",
    link: "http://localhost:3000/api/exams",
    body: {
      "title": "Math Midterm",
      "schedule": "2025-08-01",
      "status": "pending"
    }
  },
  {
    WHAT: "Create Question",
    CRUD: "POST",
    path: "/api/questions",
    link: "http://localhost:3000/api/questions",
    body: {
      "examId": 1,
      "userId": 1,
      "questionType": "multiplechoice",
      "question": "What is 2 + 2?",
      "correctAnswer": "4",
      "options": ["1", "2", "3", "4"]
    }
  }
];
