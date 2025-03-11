import React from "react";
import Paper from "@mui/material/Paper";
import { Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadButton } from "@bytescale/upload-widget-react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

let schema = Yup.object().shape({
  name: Yup.string()
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
  profile: Yup.mixed()
    .required("You need to upload your profile!")
    .test("fileSize", "Size should be lesser than 2MB", (value) => {
      return value && value[0].size <= 2000000;
    }),
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

const FormComponent = () => {
  const paperStyle = {
    padding: "1em",
    width: 400,
    margin: "20px auto",
    display: "grid",
    gap: "1em",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const handleData = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  };

  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(handleData)}
    >
      <Typography variant="h5">Fields</Typography>
      <TextField
        label="Username"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      >
        Username
      </TextField>
      <TextField
        label="Bio"
        {...register("bio")}
        multiline
        error={!!errors.bio}
        helperText={errors.bio?.message}
      ></TextField>
      <TextField
        label="Portfolio Link"
        {...register("portfolio")}
        error={!!errors.portfolio}
        helperText={errors.portfolio?.message}
      ></TextField>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Resume
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
        />
      </Button>
      <TextField label="Resume Link" {...register("resume")}></TextField>
      <Typography variant="h6">Profile</Typography>
      <div>
        <input type="file" {...register("profile", { required: true })} />
        {errors.profile && <p>{errors.profile?.message}</p>}
      </div>

      <Typography variant="h6">Social Accounts</Typography>
      <TextField
        label="LinkedIn"
        {...register("linkedin")}
        error={!!errors.linkedin}
        helperText={errors.linkedin?.message}
      ></TextField>
      <TextField
        label="LeetCode"
        {...register("leetcode")}
        error={!!errors.leetcode}
        helperText={errors.leetcode?.message}
      ></TextField>
      <TextField
        label="Behance"
        {...register("behance")}
        error={!!errors.behance}
        helperText={errors.behance?.message}
      ></TextField>
      <TextField
        label="Dribbble"
        {...register("dribbble")}
        error={!!errors.dribbble}
        helperText={errors.dribbble?.message}
      ></TextField>
      <TextField
        label="Hackerrank"
        {...register("hackerrank")}
        error={!!errors.hackerrank}
        helperText={errors.hackerrank?.message}
      ></TextField>
      <TextField
        label="Instagram"
        {...register("instagram")}
        error={!!errors.instagram}
        helperText={errors.instagram?.message}
      ></TextField>
      <TextField
        label="X (Twitter)"
        {...register("twitter")}
        error={!!errors.twitter}
        helperText={errors.twitter?.message}
      ></TextField>
      <TextField
        label="Reddit"
        {...register("reddit")}
        error={!!errors.reddit}
        helperText={errors.reddit?.message}
      ></TextField>
      <TextField
        label="HackerEarth"
        {...register("hackerearth")}
        error={!!errors.hackerearth}
        helperText={errors.hackerearth?.message}
      ></TextField>
      <TextField
        label="CodeChef"
        {...register("codechef")}
        error={!!errors.codechef}
        helperText={errors.codechef?.message}
      ></TextField>
      <TextField
        label="GeeksforGeeks"
        {...register("geeks")}
        error={!!errors.geeks}
        helperText={errors.geeks?.message}
      ></TextField>
      <Button variant="contained" type="submit">
        Submit Form
      </Button>
    </Paper>
  );
};

export default FormComponent;
