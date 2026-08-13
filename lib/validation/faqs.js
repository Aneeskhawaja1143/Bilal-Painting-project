export function validateFaq(data) {
  const errors = {};

  const question = (data.question || "").trim();
  const answer = (data.answer || "").trim();

  if (!question) {
    errors.question = "Question is required.";
  } else if (question.length > 200) {
    errors.question = "Question must be 200 characters or fewer.";
  }

  if (!answer) {
    errors.answer = "Answer is required.";
  } else if (answer.length > 800) {
    errors.answer = "Answer must be 800 characters or fewer.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}