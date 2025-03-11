import * as Yup from "yup";



// Username validation
export const usernameValidation = Yup.string()
  .required("Name is Required!!")
  .test(
    "min-length",
    "Username must be at least 5 characters long",
    (value) => value && value.length >= 5
  )
  .test(
    "invalid-characters",
    "Username can contain only letters, numbers, and underscores",
    (value) => /^[a-zA-Z0-9_]*$/.test(value)
  )
  .test(
    "invalid-start",
    "Username should start with a character or underscore",
    (value) => value && /^[a-zA-Z_]/.test(value)
  )
  .test(
    "max-length",
    "Username cannot exceed 10 characters",
    (value) => value && value.length <= 10
  );

// Bio validation
export const bioValidation = Yup.string()
  .required("Bio is required!")
  .min(150, "Min: 150 characters")
  .max(200, "Max: 200 characters");

// Profile image validation
export const profileImageValidation = Yup.mixed()
  .required("Profile is required")
  .test(
    "type",
    "Only the following formats are accepted: .jpeg, .jpg",
    (value) =>
      value && (value[0].type === "image/jpeg" || value[0].type === "image/jpg")
  )
//   .test(
//     "is-valid-size",
//     "Image should be lesser than 2MB",
//     (value) => value && value.size <= (2 * 1024 * 1024)
//   );

// Portfolio URL validation
export const portfolioValidation = urlValidation(
  "Enter a valid Portfolio URL!"
);

// Social Accounts validation
export const socialUrlValidation = urlValidation("Enter a valid URL!");

const urlValidation = (message) =>
  Yup.string()
    .nullable()
    .matches(
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      message
    );

// Resume validation (File or URL)
export const resumeValidation = Yup.mixed().test(
  "valid-resume",
  "You must provide either a file or a URL for the resume",
  (value, context) => {
    const { file } = context.parent;

    // If there is a file and it's valid (.docx or .pdf), it's acceptable
    if (
      file &&
      (file[0]?.type === "application/pdf" ||
        file[0]?.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      return true;
    }

    // If there is a URL and it's valid, it's acceptable
    if (value && /^https?:\/\/.+/.test(value)) {
      return true;
    }

    // If neither file nor URL is provided, return false
    return false;
  }
);