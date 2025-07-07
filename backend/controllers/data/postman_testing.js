import { createExam, deleteExam, getExamsByStatus, getExamsByTitle, updateExamDetails, updateExamStatus, updateExamTimer } from "../examControllers";
import { createQuestion } from "../questionControllers";
import { createUser, getUserById } from "../userControllers";

const postmanLinks = [ //NOT usable, just a note
  { 
    WHAT: "Create User",
    FUNC: createUser,
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
    WHAT: "Get User Details",
    FUNC: getUserById,
    CRUD: "GET",
    path: "/api/users/:id",
    link: "http://localhost:3000/api/users/3",
        //result: {
        //     "user_id": 3,
        //     "full_name": "Juan Dela Cruz",
        //     "email": "juan@example.com",
        //     "password": "123456",
        //     "role": "teacher",
        //     "created_at": "2025-07-05T20:10:25.865Z"
        // }
  },
    //if going to get a specific detail like USER FULL NAME
    //do this in fronend
    /* 
        const [user, setUser] = useState(null);

        useEffect(() => {
          const fetchUser = async () => {
            try {
              const response = await axios.get(`/api/users/${userId}`);
              setUser(response.data);
            } catch (error) {
              console.error(error);
            }
          };

          fetchUser();
        }, []);

        <p>{user?.full_name}</p>
    */
  {
    WHAT: "Create Exam",
    FUNC: createExam,
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
    FUNC: createQuestion,
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
  },
  {
    WHAT: "Search Exam Title",
    FUNC: getExamsByTitle,
    CRUD: "GET",
    path: "/api/exams/search",
    link: "http://localhost:3000/api/exams/search?title=exam",
  },
  {
    WHAT: "Sort Exam Status",
    FUNC: getExamsByStatus,
    CRUD: "GET",
    path: "/api/exams/status",
    link: "http://localhost:3000/api/exams/status?filter=pending",
  },
  {
    WHAT: "Update Exam Status",
    FUNC: updateExamStatus,
    CRUD: "PATCH",
    path: "/api/exams/:examId/status",
    body: {
      "status": "published"
    },
    link: "http://localhost:3000/api/exams/1/status",
  },
  {
    WHAT: "Update Exam Timer",
    FUNC: updateExamTimer,
    CRUD: "PATCH",
    path: "/api/exams/:examId/timer",
    body: {
      "timer": "1 hour"
    },
    link: "http://localhost:3000/api/exams/1/timer",
  },
  {
    WHAT: "Delete an Exam",
    FUNC: deleteExam,
    CRUD: "DELETE",
    path: "/api/exams/:examId",
    link: "http://localhost:3000/api/exams/1",
  },
  {
    WHAT: "Update Exam Details",
    FUNC: updateExamDetails,
    CRUD: "PATCH",
    path: "/api/exams/:examId/details",
    body: {
      "title": "Updated Exam Title omsim",
      "timer": "6 hour"
      //you can add or remove here, because it only updates what you put, not fixed fields
    },
    link: "http://localhost:3000/api/exams/1/details",
  },




  
];


