Overview
The getLearnerData function is a JavaScript utility designed to process and analyze learner submission data for a given course and assignment group. It calculates scores, applies late submission penalties, and generates a summary of learner performance.
Features

Processes learner submissions for multiple assignments
Calculates percentage scores for each assignment
Applies a 10% penalty for late submissions
Computes average scores for each learner
Handles various error cases and edge conditions

Function Signature
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)

Parameters
courseInfo: Object containing course information
assignmentGroup: Object containing assignment group details and individual assignments
learnerSubmissions: Array of learner submission objects

Return Value
An array of learner objects, each containing:

id: Learner ID
avg: Average score across all assignments
Individual assignment scores (as percentages)

Returns null if an error occurs during processing.
