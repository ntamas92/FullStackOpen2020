export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description? : string;
}

export interface GroupCoursePart extends CoursePartBase {
  groupProjectCount: number;
}

export interface SubmittableCoursePart extends CoursePartBase {
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartBase | GroupCoursePart | SubmittableCoursePart
