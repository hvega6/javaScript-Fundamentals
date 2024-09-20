// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    try {
        // Validate input
        if (!courseInfo || !assignmentGroup || !learnerSubmissions) {
            throw new Error("Missing required input: courseInfo, assignmentGroup, or learnerSubmissions");
        }

        if (assignmentGroup.course_id !== courseInfo.id) {
            throw new Error("Invalid input: AssignmentGroup does not belong to the specified CourseInfo.");
        }

        const results = {};

        assignmentGroup.assignments.forEach(assignment => {
            const { id, points_possible, due_at } = assignment;

            // Skip assignments with points_possible of 0 or less
            if (points_possible <= 0) return;

            // Skip assignments due in the future
            const dueDate = new Date(due_at);
            const now = new Date();
            if (dueDate > now) return;

            learnerSubmissions.forEach(submission => {
                if (submission.assignment_id === id) {
                    const { learner_id, submission: { submitted_at, score: originalScore } } = submission;

                    let score = originalScore;
                    
                    // Check if the submission is late and apply penalty if necessary
                    if (new Date(submitted_at) > dueDate) {
                        score = score * 0.9; // Deduct 10% for late submission
                    }

                    // Initialize learner data if not present
                    if (!results[learner_id]) {
                        results[learner_id] = { id: learner_id, avg: 0, totalScore: 0, totalPoints: 0 };
                    }

                    // Calculate percentage score
                    const percentageScore = (score / points_possible) * 100;

                    // Update learner data
                    results[learner_id][id] = Number(percentageScore.toFixed(2));
                    results[learner_id].totalScore += score;
                    results[learner_id].totalPoints += points_possible;
                }
            });
        });

        // Calculate average scores and format results
        return Object.values(results).map(learner => {
            const formattedLearner = { id: learner.id };

            if (learner.totalPoints > 0) {
                formattedLearner.avg = Number((learner.totalScore / learner.totalPoints * 100).toFixed(2));
            } else {
                formattedLearner.avg = 0; // No valid submissions
            }

            // Add individual assignment scores
            assignmentGroup.assignments.forEach(assignment => {
                if (learner[assignment.id] !== undefined) {
                    formattedLearner[assignment.id] = learner[assignment.id];
                }
            });

            return formattedLearner;
        });
    } catch (error) {
        console.error("Error in getLearnerData:", error.message);
        return null; // or you could return an empty array [] depending on how you want to handle errors
    }
}
  
  let result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
 