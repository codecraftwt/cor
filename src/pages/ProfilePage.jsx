import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear errors when typing
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      valid = false;
      newErrors.firstName = "First name is required.";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      valid = false;
      newErrors.lastName = "Last name is required.";
    }

    // Email validation
    if (!formData.email.trim()) {
      valid = false;
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      valid = false;
      newErrors.email = "Invalid email address.";
    }

    // Phone validation
    if (!formData.phoneNumber) {
      valid = false;
      newErrors.phoneNumber = "Phone number is required.";
    } else if (formData.phoneNumber.length < 10) {
      valid = false;
      newErrors.phoneNumber = "Invalid phone number.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      country: "",
      email: "",
      phoneNumber: "",
    });
    setErrors({});
    console.log("Form reset.");
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Form submitted successfully:", formData);
    } else {
      console.log("Form validation failed.");
    }
  };

  const commonStyles = {
    // width: "333px",
    height: "52px",
    boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
    backgroundBlendMode: "overlay",
    borderRadius: "10px",
    border: "1px solid #C4D7DB",
    backgroundColor: "#FFFFFF",
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Card sx={{ borderRadius: "30px", boxShadow: 3, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Box component="form" sx={{ mt: 5 }}>
            {/* First Name and Last Name */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    First Name
                  </FormLabel>
                  <TextField
                    style={{ ...commonStyles }}
                    fullWidth
                    variant="outlined"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Last Name
                  </FormLabel>
                  <TextField
                    style={{ ...commonStyles }}
                    fullWidth
                    variant="outlined"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* Company and Country */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Company
                  </FormLabel>
                  <TextField
                    style={{ ...commonStyles }}
                    fullWidth
                    variant="outlined"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Country of Residence
                  </FormLabel>
                  <TextField
                    style={{ ...commonStyles }}
                    fullWidth
                    variant="outlined"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* Email and Phone Number */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Email Address
                  </FormLabel>
                  <TextField
                    style={{ ...commonStyles }}
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Phone Number
                  </FormLabel>
                  <PhoneInput
                    country={"us"}
                    value={formData.phoneNumber}
                    onChange={(value) => handleInputChange("phoneNumber", value)}
                    style={{ ...commonStyles, padding: "0 12px" }}
                    isValid={() => !errors.phoneNumber}
                  />
                  {errors.phoneNumber && (
                    <Typography
                      color="error"
                      style={{ fontSize: "12px", marginTop: "5px" }}
                    >
                      {errors.phoneNumber}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            {/* Buttons */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                style={{
                  width: "100px",
                  height: "40px",
                  borderRadius: "30px",
                  color:'black',
                  borderColor:'black',
                  textTransform:'capitalize'
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{
                  width: "100px",
                  height: "40px",
                  borderRadius: "30px",
                  background:'black',
                  textTransform:'capitalize'

                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
