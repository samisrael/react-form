import React from "react";
import Paper from "@mui/material/Paper";
import { Typography, TextField, Button, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    console.log(data);
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
      ></TextField>
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
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        sx={{ margin: 2, padding: "10px 20px" }}
      >
        Upload Resume
      </Button>
      <TextField label="Resume Link" {...register("resume")}></TextField>
      <TextField type="file" variant="outlined" />

      <Typography variant="h6">Social Accounts</Typography>
      <TextField
        type="url"
        label="LinkedIn"
        {...register("linkedin")}
      ></TextField>
      <TextField
        type="url"
        label="LeetCode"
        {...register("leetcode")}
      ></TextField>
      <Button variant="contained" type="submit">
        Submit Form
      </Button>
    </Paper>
  );
};

export default FormComponent;
