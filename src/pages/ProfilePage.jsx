import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Select,
  MenuItem,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useToast } from "../utils/ToastContext";

const ProfilePage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    email: "",
    phoneNumber: "",
  });
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    handleGetCountries();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;
      console.log(token, 'token');

      if (token) {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        setFormData({
          firstName: user.first_name,
          lastName: user.last_name,
          company: user.company_id,
          country: user.country.id, // Store the country ID
          email: user.email,
          phoneNumber: user.phone_number,
        });
      } else {
        console.error("No auth token found");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleGetCountries = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`)
      .then(response => {
        setCountries(response.data.countries);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }

  const handleCountryChange = (event) => {
    setFormData({
      ...formData,
      country: event.target.value,
    });
  };

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
    fetchData();

    console.log("Form reset.");
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/profile`,
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: `+${formData.phoneNumber}`,
            country_id: formData.country,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        showToast('Profile updated successfully', 'success');
        console.log("Profile updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  const commonStyles = {
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
                    disabled
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <FormLabel style={{ fontSize: "16px", fontWeight: "600" }}>
                    Country of Residence
                  </FormLabel>
                  <Select
                    style={{ ...commonStyles }}
                    fullWidth
                    value={formData.country}
                    onChange={handleCountryChange}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
                    disabled
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
                  color: "black",
                  borderColor: "black",
                  textTransform: "capitalize",
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
                  background: "black",
                  textTransform: "capitalize",
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
