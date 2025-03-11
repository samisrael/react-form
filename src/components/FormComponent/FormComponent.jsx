import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validationSchema"; // Custom validation schema
import UploadButton from "../UploadComponent/UploadComponent"; // Reusable component for file upload

const FormComponent = () => {
  const paperStyle = {
    padding: "1em",
    width: 400,
    margin: "20px auto",
    display: "grid",
    gap: "1em",
  };
  const [loading, setLoading] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const socialFields = [
    { label: "Behance", name: "behance" },
    { label: "Dribbble", name: "dribbble" },
    { label: "Hackerrank", name: "hackerrank" },
    { label: "Instagram", name: "instagram" },
    { label: "X (Twitter)", name: "twitter" },
    { label: "Reddit", name: "reddit" },
    { label: "HackerEarth", name: "hackerearth" },
    { label: "CodeChef", name: "codechef" },
    { label: "GeeksforGeeks", name: "geeks" },
  ];

  const handleData = (data) => {
    setLoading(true); // Set loading to true when form is being processed

    // Simulate a delay for form submission 
    setTimeout(() => {
      Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      setLoading(false); // Set loading to false after form submission
    }, 2000); // Simulated delay for 2 seconds
    
  };
  console.log(errors);
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
      />

      <TextField
        label="Portfolio Link"
        {...register("portfolio")}
        error={!!errors.portfolio}
        helperText={errors.portfolio?.message}
      />

      <UploadButton
        label="Upload Resume"
        onChange={(e) => console.log(e.target.files)}
        accept="application/pdf, application/msword, .docx"
      />

      <TextField
        label="Resume Link"
        {...register("resume")}
        error={!!errors.resume}
        helperText={errors.resume?.message}
      />

      <UploadButton
        label="Upload Profile Picture"
        {...register("profile")}
        onChange={(e) => console.log(e.target.files)}
        accept="image/jpeg, image/jpg"
        error={!!errors.profile}
        helperText={errors.profile?.message}
      />

      <Typography variant="h6">Social Accounts</Typography>

      <TextField
        label="LinkedIn"
        {...register("linkedin")}
        error={!!errors.linkedin}
        helperText={errors.linkedin?.message}
      />

      <TextField
        label="LeetCode"
        {...register("leetcode")}
        error={!!errors.leetcode}
        helperText={errors.leetcode?.message}
      />

      {socialFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          {...register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
        />
      ))}

      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={loading} // Disable button when loading
        startIcon={
          loading ? <CircularProgress size={24} color="inherit" /> : null
        } // Show loading spinner
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Paper>
  );
};

export default FormComponent;
