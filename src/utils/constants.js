// frontend/src/utils/constants.js
export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export const SUMMARY_STYLES = [
  { value: 'concise', label: 'Concise' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'brief', label: 'Brief' },
];

export const SUMMARY_TARGETS = [
  { value: 'revision', label: 'Revision' },
  { value: 'exam', label: 'Exam' },
  { value: 'overview', label: 'Overview' },
];

export const NOTES_DEPTH = [
  { value: 'brief', label: 'Brief' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'comprehensive', label: 'Comprehensive' },
];

export const NOTES_FORMATS = [
  { value: 'exam', label: 'Exam' },
  { value: 'lecture', label: 'Lecture' },
  { value: 'outline', label: 'Outline' },
];

export const LEARNING_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const PDF_TABS = [
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'summary', label: 'Summary' },
  { id: 'notes', label: 'Notes' },
  { id: 'qa', label: 'Q&A' },
];