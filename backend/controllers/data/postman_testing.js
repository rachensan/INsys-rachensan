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
      "fullName": "Juan Dela Cruz",
      "email": "juan@example.com",
      "password": "123456",
      "role": "teacher",
      "schoolId": "2021307605" 
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
    WHAT: "Get All Exam",
    FUNC: getAllExams,
    CRUD: "GET",
    path: "/api/exams",
    link: "http://localhost:3000/api/exams"
  },
  {
    WHAT: "Create Exam",
    FUNC: createExam,
    CRUD: "POST",
    path: "/api/exams/56",
    link: "http://localhost:3000/api/exams/:userId",
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
  {
    WHAT: "Update Exam Code",
    FUNC: updateExamCode,
    CRUD: "PATCH",
    path: "/api/exams/:examId/code",
    link: "http://localhost:3000/api/exams/1/code"
  },
  {
    WHAT: "Get Exam Code",
    FUNC: getExamCode,
    CRUD: "GET",
    path: "/api/exams/:examId/code",
    link: "http://localhost:3000/api/exams/1/code"
  },
  {
    WHAT: "Update Section Takers",
    FUNC: updateSectionTakers,
    CRUD: "PATCH",
    path: "/api/exams/:examId/sections",
    body: {
      "sections": ["BSIT 1-A", "BSCS 2-B"]
    },
    link: "http://localhost:3000/api/exams/1/sections"
  },
  {
    WHAT: "Get Sections Assigned to Exam",
    FUNC: getSectionTakersByExamId,
    CRUD: "GET",
    path: "/api/exams/:examId/sections",
    link: "http://localhost:3000/api/exams/1/sections"
  }, 
  {
    WHAT: "Verify Code and Section Input",
    FUNC: verifyExamAccess,
    CRUD: "POST",
    path: "/api/students/verify",
    link: "http://localhost:3000/api/student/verify",
    body: {
      "inputCode": "sintoCode",
      "inputSection": "BSIT 1-D",
      "studentName": "Lila Ma",
      "studentSchoolId": 2021307605
    }
  }, 
  {
    WHAT: "After Verification, then Enters Exam",
    FUNC: answerSubmission,
    CRUD: "POST",
    path: "/api/student-answers/submit",
    body: {
      "examId": 1,
      "questionId": 2,
      "studentSchoolId": 2021307605,
      "studentAnswer": "4"
    },
    link: "http://localhost:3000/api/student-answers/submit" 
  }, 
  { //not needed for now, we already automating the scoring in answerSubmission
    //i already found something i need it for...
    WHAT: "Automatic Scoring",
    FUNC: autoScoringTemplate,
    CRUD: "PUT",
    path: "/api/student-scores/score",
    body: {
      "examId": 1,
      "studentSchoolId": 2021307605
    },
    link: "http://localhost:3000/api/student-scores/score" 
  }, 
  {
    WHAT: "Viewing Scores and Name Per Section",
    FUNC: getAllScoresByExam,
    CRUD: "GET",
    path: "/api/exams/:examId/scores/:sectionTaker",
    link: "http://localhost:3000/api/exams/1/scores/BSIT%201-D" 
  }, 
  {
    WHAT: "Viewing Essay Per Student",
    FUNC: getEssayPerStudent,
    CRUD: "GET",
    path: "/api/exams/:examId/essays/:studentSchoolId",
    link: "http://localhost:3000/api/exams/1/essays/2021307605" 
  }, 
  {
    WHAT: "Grading Essay Per Student",
    FUNC: manualEssayScoring,
    CRUD: "PATCH",
    path: "/api/student-score/essay/:examId/:questionId",
    link: "http://localhost:3000/api/student-score/essay/1/12",
    body: {
      "studentSchoolId": 2021307605,
      "essayScore": 35
    } 
  },
  {
    WHAT: "Showing One Exam Details",
    FUNC: getInfoPerExam,
    CRUD: "GET",
    path: "/api/students/:studentId/exams/:examId/info",
    link: "http://localhost:3000/api/student/2021307605/exams/1/info" 
  }, 
  {
    WHAT: "Showing Exam History, Student POV",
    FUNC: getStudentExamHistory,
    CRUD: "GET",
    path: "/api/students/:studentId/exam-history",
    link: "http://localhost:3000/api/student/2021307605/exam-history" 
  }, 
  {
    WHAT: "Setting/Updating the Schedule Exam per Section",
    FUNC: finalizeExamSchedule,
    CRUD: "PUT",
    path: "/api/exams/1/schedule",
    link: "http://localhost:3000/api/exams/1/schedule",
    body: {
      "sectionName": "BSIT 1-D",
      "scheduledDate": "2025-07-18T01:52:00",
      "addTimerMinutes": 5
    }
  }, 
  {
    WHAT: "Getting Schedules per Exam",
    FUNC: getExamSchedule,
    CRUD: "GET",
    path: "/api/exams/:examId/schedule",
    link: "http://localhost:3000/api/exams/1/schedule"
  },
  {
    WHAT: "Getting the Exam Schedule per Section",
    FUNC: getSectionSchedule,
    CRUD: "GET",
    path: "/api/exams/:examId/section-schedule",
    link: "http://localhost:3000/api/exams/1/section-schedule",
    body: {
      "sectionName" : "BSIT 1-D"
    }
  },
  {
    WHAT: "Auto Submit Exam When Time Ends",
    FUNC: autoSubmitAllAnswers,
    CRUD: "POST",
    path: "/api/student/:studentId/exams/:examId/auto-submit",
    link: "http://localhost:3000/api/student/2021307605/exams/1/auto-submit"
  },
        /*
        useEffect(() => {
        const fetchExamInfo = async () => {
          const res = await axios.get(`/api/exams/${examId}`);
          const { start_time, duration_minutes } = res.data;

          const startTime = new Date(start_time);
          const endTime = new Date(startTime.getTime() + duration_minutes * 60000);
          const now = new Date();

          const timeLeft = endTime - now;

          if (timeLeft > 0) {
            setTimeout(() => {
              axios.post(`/api/student/${studentId}/exams/${examId}/auto-submit`);
            }, timeLeft);
          } else {
            // already past, submit immediately
            axios.post(`/api/student/${studentId}/exams/${examId}/auto-submit`);
          }
        };

        fetchExamInfo();
      }, []);

        */
  {
    WHAT: "STUDENT Register: Input Email and Send OTP", //input email only, send OTP nodemailer
    FUNC: studentAuthRoutes,
    CRUD: "POST",
    path: "api/student/register/email-otp",
    link: "http://localhost:3000/api/student/register/email-otp",
    body: { //duplicate example
        "username": "2021307605"
    }
  },
  {
    WHAT: "STUDENT Register: Verify OTP", 
    FUNC: studentAuthRoutes,
    CRUD: "POST",
    path: "api/student/register/verify-otp",
    link: "http://localhost:3000/api/student/register/verify-otp",
    body: {
        "code": "468950",
        "username": "2021307605"
    }
  },
  {
    WHAT: "STUDENT Register: Complete Information", //input all needed info
    FUNC: studentAuthRoutes,
    CRUD: "POST",
    path: "api/student/register/user-info",
    link: "http://localhost:3000/api/student/register/user-info",
    body: {
        "username": "2021307605",
        "password": "Yla123",
        "firstName": "Yla",
        "lastName": "Marino",
        "userGender": "Female",
        "college": "CCS"
    }
  },
  {
    WHAT: "TEACHER Register: Input Email and Send OTP", 
    FUNC: teacherAuthRoutes,
    CRUD: "POST",
    path: "api/teacher/register/email-otp",
    link: "http://localhost:3000/api/teacher/register/email-otp",
    body: { //not existing email example
        "username": "ykrjm" 
    }
  },
  {
    WHAT: "TEACHER Register: Verify OTP", 
    FUNC: teacherAuthRoutes,
    CRUD: "POST",
    path: "api/teacher/register/verify-otp",
    link: "http://localhost:3000/api/teacher/register/verify-otp",
    body: {
        "code": "468950",
        "username": "2021307605"
    }
  },
  {
    WHAT: "TEACHER Register: Complete Information",
    FUNC: teacherAuthRoutes,
    CRUD: "POST",
    path: "api/teacher/register/user-info",
    link: "http://localhost:3000/api/teacher/register/user-info",
    body:  { //username can't have numbers kase their emails only have initials
        "username": "2021307605", //use teacher email here
        "schoolId": "2021307605", 
        "password": "Yla123",
        "firstName": "Yla",
        "lastName": "Marino",
        "userGender": "Female",
        "college": "CCS"
    }
  },
  {
    WHAT: "Log In: Check Credentials",
    FUNC: authRoutes,
    CRUD: "POST",
    path: "api/login",
    link: "http://localhost:3000/api/login",
    body: {
        "email": "2021307605@pampangastateu.edu.ph",
        "password": "Yla123"
    }
  },
  {
    WHAT: "Log Out: Clear Cookies",
    FUNC: authRoutes,
    CRUD: "POST",
    path: "api/logout",
    link: "http://localhost:3000/api/logout",
  },
  {
    WHAT: "AUTH: Forgot Password Request OTP", //inputting new password here
    FUNC: authRoutes,
    CRUD: "POST",
    path: "/api/forgot-password/request-otp/:userId/:schoolId",
    link: "http://localhost:3000/api/forgot-password/request-otp/38/2021307605",
    body: {
        "newPassword": "Yla123"
    }
  },
  {
    WHAT: "AUTH: Forgot Password Verify OTP and Reset Password", //confirm and update/insert the new password
    FUNC: authRoutes,
    CRUD: "POST",
    path: "/api/forgot-password/request-otp/:userId/:schoolId",
    link: "http://localhost:3000/api/forgot-password/request-otp/38/2021307605",
    body: {
        "code": "855106"
    }
  },
  {
    WHAT: "AUTH: Verify Current Password before Changing Password", //for frontend, idk if i can use (if maalala ko)
    FUNC: authRoutes,
    CRUD: "POST",
    path: "/api/verify-password/:userId",
    link: "http://localhost:3000/api/verify-password/38",
    body:{
        "currentPassword": "ylayla"
    }
  },
  {
    WHAT: "AUTH: Verify AND Change Password",
    FUNC: authRoutes,
    CRUD: "POST",
    path: "/api/change-password/:userId",
    link: "http://localhost:3000/api/change-password/38",
    body: {
        "currentPassword": "ylayla",
        "newPassword": "Yla123"
    }
  },
];








