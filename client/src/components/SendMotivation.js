import React, { useState } from 'react'
import {
  Box,
  Container,
  TextField,
	FormControl,
	Button,
	FormHelperText,
	FormLabel,
	FormControlLabel,
  Typography,
  RadioGroup,
  Radio
} from "@mui/material";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function SendMotivation({processAddMotivation, patientId}) {
  const [motivationType, setMotivationType] = useState(null);
  const [youtubeLink, setYouTubeLink] = useState('');
  const [motivationQoute, setMotivationQuote] = useState('');

  const [motivationTypeError, setMotivationTypeError] = useState(false);
  const [youtubeLinkError, setYoutubeLinkError] = useState({error: false, errorMsg: ""});
  const [motivationQouteError, setMotivationQouteErrorError] = useState({error: false, errorMsg: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    resetErrors();

    if (!motivationType) {
      setMotivationTypeError(true)
      isValid = false;
    }

    if (motivationType === 'youtube' && youtubeLink.trim() === '') {
			setYoutubeLinkError({error: true, errorMsg: "Link is required"});
			isValid = false;
		}

    if (motivationType === 'Quote' && motivationQoute.trim() === '') {
			setYoutubeLinkError({error: true, errorMsg: "Motivation quote is required"});
			isValid = false;
		}

    if (isValid) {
      const content = (motivationType === 'youtube') ? youtubeLink : motivationQoute;

      const motivationRequest = {
        type: motivationType,
        content,
        patientId
      }

      // process the request
      processAddMotivation(motivationRequest);

      resetForm();
    }
  }

  const resetForm = () => {
    setMotivationType(null);
    setYouTubeLink('');
    setMotivationQuote('');
  }

  const resetErrors = () => {
    setMotivationTypeError(false);
    setYoutubeLinkError({error: false, errorMsg: ""});
    setMotivationQouteErrorError({error: false, errorMsg: ""});
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" color="textPrimary">
				Send Motivation
			</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormControl component="fieldset" style={{border: '1px solid #ddd', borderRadius: 5}} sx={{ m: 1 }} fullWidth error={motivationTypeError}>
            <FormLabel>Motivation Type</FormLabel>
            <RadioGroup value={motivationType} onChange={(e) => setMotivationType(e.target.value)} >
              <FormControlLabel value="youtube" control={<Radio />} label="Youtube Link" />
              <FormControlLabel value="Quote" control={<Radio />} label="Tips/Quote" />
            </RadioGroup>
            {motivationTypeError && <FormHelperText>Please select a motivation type</FormHelperText>}
          </FormControl>

          { motivationType === 'youtube' &&
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                onChange={(e) => setYouTubeLink(e.target.value)}
                label="Youtube Link"
                variant="outlined"
                color="primary"
                type="text"
                required
                error={youtubeLinkError.error}
                helperText={youtubeLinkError.errorMsg}
              />
            </FormControl>
          }

          { motivationType === 'Quote' &&
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                onChange={(e) => setMotivationQuote(e.target.value)}
                label="Motivation Quote"
                variant="outlined"
                color="primary"
                type="text"
                multiline
                required
                rows="4"
                error={motivationQouteError.error}
                helperText={motivationQouteError.errorMsg}
              />
            </FormControl>
          }

        <br />
					<div style={{display: 'flex', justifyContent:'flex-end', width:'100%'}}>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							endIcon={<KeyboardArrowRight />}
						> Submit </Button>
					</div>
        </form>
      </Box>
    </Container>
  )
}
