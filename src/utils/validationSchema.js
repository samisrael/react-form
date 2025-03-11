import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Username is required!")
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
    ),
  bio: Yup.string()
    .required("Bio is required!")
    .min(150, "Min: 150 characters")
    .max(200, "Max: 200 characters"),
  portfolio: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid URL!",
      (value) =>
        !value ||
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          value
        )
    ),
  resume: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid URL!",
      (value) =>
        !value ||
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          value
        )
    ),
//   profile: Yup.mixed()
//     .required("You need to upload your profile!")
//     .test(
//       "fileSize",
//       "Size should be lesser than 2MB",
//       (value) => value && value[0].size <= 2000000
//     ),
  linkedin: Yup.string()
    .required("LinkedIn URL is required!")
    .matches(
      /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/$/,
      "Enter a valid LinkedIn URL!"
    ),
  leetcode: Yup.string()
    .required("LeetCode URL is required!")
    .matches(
      /^https:\/\/leetcode\.com\/u\/[a-zA-Z0-9-]+\/$/,
      "Enter a valid LeetCode URL!"
    ),
  behance: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid Behance URL!",
      (value) =>
        !value || /^https:\/\/www\.behance\.net\/[a-zA-Z0-9-]+\/$/.test(value)
    ),
  dribbble: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid Dribbble URL!",
      (value) =>
        !value || /^https:\/\/dribbble\.com\/[a-zA-Z0-9-]+$/.test(value)
    ),
  hackerrank: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid Hackerrank URL!",
      (value) =>
        !value || /^https:\/\/www\.hackerrank\.com\/profile\/\w+$/.test(value)
    ),
  instagram: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid Instagram URL!",
      (value) =>
        !value || /^https:\/\/www\.instagram\.com\/[a-zA-Z0-9_]+\/$/.test(value)
    ),
  twitter: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid X(Twitter) URL!",
      (value) => !value || /^https:\/\/x\.com\/[a-zA-Z0-9-_]+$/.test(value)
    ),
  reddit: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid Reddit URL!",
      (value) =>
        !value ||
        /^https:\/\/www\.reddit\.com\/user\/[a-zA-Z0-9_]+\/$/.test(value)
    ),
  hackerearth: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid HackerEarth URL!",
      (value) =>
        !value ||
        /^https:\/\/www\.hackerearth\.com\/@([a-zA-Z0-9-_]+)\/$/.test(value)
    ),
  codechef: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid CodeChef URL!",
      (value) =>
        !value ||
        /^https:\/\/www\.codechef\.com\/users\/([a-zA-Z0-9-_]+)$/.test(value)
    ),
  geeks: Yup.string()
    .nullable()
    .test(
      "is-valid-url",
      "Enter a valid GeeksforGeeks URL!",
      (value) =>
        !value ||
        /^https:\/\/www\.geeksforgeeks\.org\/user\/([a-zA-Z0-9-_]+)\/$/.test(
          value
        )
    ),
});
