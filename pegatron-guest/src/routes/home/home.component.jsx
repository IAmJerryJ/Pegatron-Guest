import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, FormControlLabel, Checkbox, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import './home.css'; // Import the CSS file

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Box>
    );
  }

  return content;
}

const Home = () => {
  const purposes = ['Business Meeting', 'Site Inspection', 'Vendor Meeting', 'Maintenance', 'Interview', 'Other'];
  const [purpose, setPurpose] = useState(purposes[0]);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  const handlePurposeChange = (e) => {
    const newPurpose = e.target.value;
    setPurpose(newPurpose);
  };

  return (
    <Box className="container" sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
        <TextField
          required
          id="standard-required"
          label="First & Second Name"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
        <TextField
          id="outlined-select-line"
          select
          label="Purpose of Visit"
          fullWidth
          required
          value={purpose}
          onChange={handlePurposeChange}
          InputLabelProps={{ shrink: true }}  // 保持标签固定
          margin="normal"
        >
          {purposes.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              {purpose}
            </MenuItem>
          ))}
        </TextField>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
        <TextField
          required
          id="standard-required"
          label="Person/Department to Visit"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
        <TextField
          required
          id="standard-required"
          label="Phone Number"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Paper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
          <DatePicker
            label={<Label componentName="Date of Visit" valueType="date" />}
            value={selectedDateTime}
            onChange={handleDateTimeChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Paper>
        <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
          <TimePicker
            label={<Label componentName="Time In" valueType="time" />}
            value={selectedDateTime}
            onChange={handleDateTimeChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Paper>
      </LocalizationProvider>
      <FormControlLabel required control={<Checkbox />} label="Required" />
      <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
        By submitting this form, I confirm that all information provided is accurate and that I agree to comply with the company's policies and procedures during my visit.
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
