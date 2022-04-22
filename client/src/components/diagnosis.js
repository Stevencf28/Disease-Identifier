import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import api from "../api";

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const symptopms = [
  { label: "Abdominal Pain", value: "abdominal_pain" },
  { label: "Abnormal Menstruation", value: "abnormal_menstruation" },
  { label: "Acidity", value: "acidity" },
  { label: "Acute Liver Failure", value: "acute_liver_failure" },
  { label: "Altered Sensorium", value: "altered_sensorium" },
  { label: "Anxiety", value: "anxiety" },
  { label: "Back Pain", value: "back_pain" },
  { label: "Belly Pain", value: "belly_pain" },
  { label: "Blackheads", value: "blackheads" },
  { label: "Bladder Discomfort", value: "bladder_discomfort" },
  { label: "Blister", value: "blister" },
  { label: "Blood in Sputum", value: "blood_in_sputum" },
  { label: "Bloody Stool", value: "bloody_stool" },
  {
    label: "Blurred and Distorted Vision",
    value: "blurred_and_distorted_vision",
  },
  { label: "Breathlessness", value: "breathlessness" },
  { label: "Brittle Nails", value: "brittle_nails" },
  { label: "Bruising", value: "bruising" },
  { label: "Burning Micturition", value: "burning_micturition" },
  { label: "Chest Pain", value: "chest_pain" },
  { label: "Chills", value: "chills" },
  { label: "Cold Hands and Feets", value: "cold_hands_and_feets" },
  { label: "Coma", value: "coma" },
  { label: "Congestion", value: "congestion" },
  { label: "Constipation", value: "constipation" },
  { label: "Continuous Feel of Urine", value: "continuous_feel_of_urine" },
  { label: "Continuous Sneezing", value: "continuous_sneezing" },
  { label: "Cough", value: "cough" },
  { label: "Cramps", value: "cramps" },
  { label: "Dark Urine", value: "dark_urine" },
  { label: "Dehydration", value: "dehydration" },
  { label: "Depression", value: "depression" },
  { label: "Diarrhea", value: "diarrhoea" },
  { label: "Dischromic Patches", value: "dischromic _patches" },
  { label: "Distention of Abdomen", value: "distention_of_abdomen" },
  { label: "Dizziness", value: "dizziness" },
  { label: "Drying and Tingling Lips", value: "drying_and_tingling_lips" },
  { label: "Enlarged Thyroid", value: "enlarged_thyroid" },
  { label: "Excessive Hunger", value: "excessive_hunger" },
  { label: "Extra Marital Contacts", value: "extra_marital_contacts" },
  { label: "Family History", value: "family_history" },
  { label: "Fast Heart Rate", value: "fast_heart_rate" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Fluid Overload", value: "fluid_overload" },
  { label: "Fluid Overload.1", value: "fluid_overload.1" },
  { label: "Foul Smell of Urine", value: "foul_smell_of urine" },
  { label: "Headache", value: "headache" },
  { label: "High Fever", value: "high_fever" },
  { label: "Hip Joint Pain", value: "hip_joint_pain" },
  {
    label: "History of Alcohol Consumption",
    value: "history_of_alcohol_consumption",
  },
  { label: "Increased Appetite", value: "increased_appetite" },
  { label: "Indigestion", value: "indigestion" },
  { label: "Inflammatory Nails", value: "inflammatory_nails" },
  { label: "Internal Itching", value: "internal_itching" },
  { label: "Irregular Sugar Level", value: "irregular_sugar_level" },
  { label: "Irritability", value: "irritability" },
  { label: "Irritation in Anus", value: "irritation_in_anus" },
  { label: "Itching", value: "itching" },
  { label: "Joint Pain", value: "joint_pain" },
  { label: "Knee Pain", value: "knee_pain" },
  { label: "Lack of Concentration", value: "lack_of_concentration" },
  { label: "Lethargy", value: "lethargy" },
  { label: "Loss of Appetite", value: "loss_of_appetite" },
  { label: "Loss of Balance", value: "loss_of_balance" },
  { label: "Loss of Smell", value: "loss_of_smell" },
  { label: "Malaise", value: "malaise" },
  { label: "Mild Fever", value: "mild_fever" },
  { label: "Mood Swings", value: "mood_swings" },
  { label: "Movement Stiffness", value: "movement_stiffness" },
  { label: "Mucoid Sputum", value: "mucoid_sputum" },
  { label: "Muscle Pain", value: "muscle_pain" },
  { label: "Muscle Wasting", value: "muscle_wasting" },
  { label: "Muscle Weakness", value: "muscle_weakness" },
  { label: "Nausea", value: "nausea" },
  { label: "Neck Pain", value: "neck_pain" },
  { label: "Nodal Skin Eruptions", value: "nodal_skin_eruptions" },
  { label: "Obesity", value: "obesity" },
  { label: "Pain Behind the Eyes", value: "pain_behind_the_eyes" },
  { label: "Painful Walking", value: "painful_walking" },
  {
    label: "Pain During Bowel Movements",
    value: "pain_during_bowel_movements",
  },
  { label: "Pain in Anal Region", value: "pain_in_anal_region" },
  { label: "Palpitations", value: "palpitations" },
  { label: "Passage of Gases", value: "passage_of_gases" },
  { label: "Patches in Throat", value: "patches_in_throat" },
  { label: "Phlegm", value: "phlegm" },
  { label: "Polyuria", value: "polyuria" },
  { label: "Prominent Veins on Calf", value: "prominent_veins_on_calf" },
  { label: "Puffy Face and Eyes", value: "puffy_face_and_eyes" },
  { label: "Pus Filled Pimples", value: "pus_filled_pimples" },
  { label: "Red Spots Over Body", value: "red_spots_over_body" },
  {
    label: "Receiving Blood Transfusion",
    value: "receiving_blood_transfusion",
  },
  {
    label: "Receiving Unsterile Injections",
    value: "receiving_unsterile_injections",
  },
  { label: "Redness of Eyes", value: "redness_of_eyes" },
  { label: "Restlessness", value: "restlessness" },
  { label: "Runny Nose", value: "runny_nose" },
  { label: "Rusty Sputum", value: "rusty_sputum" },
  { label: "Scurring", value: "scurring" },
  { label: "Shivering", value: "shivering" },
  { label: "Skin Rash", value: "skin_rash" },
  { label: "Stomach Bleeding", value: "stomach_bleeding" },
  { label: "Silver Like Dusting", value: "silver_like_dusting" },
  { label: "Sinus Pressure", value: "sinus_pressure" },
  { label: "Skin Peeling", value: "skin_peeling" },
  { label: "Slurred Speech", value: "slurred_speech" },
  { label: "Small Dents in Nails", value: "small_dents_in_nails" },
  { label: "Spinning Movements", value: "spinning_movements" },
  { label: "Spotting Urination", value: "spotting_ urination" },
  { label: "Stiff Neck", value: "stiff_neck" },
  { label: "Stomach Pain", value: "stomach_pain" },
  { label: "Sunken Eyes", value: "sunken_eyes" },
  { label: "Sweating", value: "sweating" },
  { label: "Swelled Lymph Nodes", value: "swelled_lymph_nodes" },
  { label: "Swelling Joints", value: "swelling_joints" },
  { label: "Swelling of Stomach", value: "swelling_of_stomach" },
  { label: "Swollen Blood Vessels", value: "swollen_blood_vessels" },
  { label: "Swollen Extremeties", value: "swollen_extremeties" },
  { label: "Swollen Legs", value: "swollen_legs" },
  { label: "Throat Irritation", value: "throat_irritation" },
  { label: "Toxic Look", value: "toxic_look_(typhos)" },
  { label: "Unsteadiness", value: "unsteadiness" },
  { label: "Red Sore Around Nose", value: "red_sore_around_nose" },
  { label: "Ulcers on Tongue", value: "ulcers_on_tongue" },
  { label: "Visual Dsturbances", value: "visual_disturbances" },
  { label: "Vomitting", value: "vomiting" },
  { label: "Watering From Eyes", value: "watering_from_eyes" },
  { label: "Weakness in Limbs", value: "weakness_in_limbs" },
  { label: "Weakness of one Body Side", value: "weakness_of_one_body_side" },
  { label: "Weight Gain", value: "weight_gain" },
  { label: "Weight Loss", value: "weight_loss" },
  { label: "Yellow Crust Ooze", value: "yellow_crust_ooze" },
  { label: "Yellowing of Eyes", value: "yellowing_of_eyes" },
  { label: "Yellow Urine", value: "yellow_urine" },
  { label: "Yellowish Skin", value: "yellowish_skin" },
];

function getStyles(symptomObject, selectedSymptoms, theme) {
  const isSymptomSelected = selectedSymptoms.find(
    (symptom) => symptom.value === symptomObject.value
  );

  return {
    fontWeight:
      isSymptomSelected === undefined
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

export default function Diagnosis() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [error, setError] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [rfcResult, setRfcResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(false);
    setRfcResult("");

    if (selectedSymptoms.length === 0) {
      setError(true);
      return;
    }

    const requestBody = {};

    selectedSymptoms.forEach((symptopm) => {
      requestBody[symptopm.value] = 1;
    });

    setOpenLoading(true);

    // run the model
    api
      .runRfcPredict(requestBody)
      .then((result) => {
        console.log("RFC Prediction:", result);
        setRfcResult(result.data.prediction);
        setOpenLoading(false);
      })
      .catch((error) => {
        console.log("Error in RFC Prediction: ", error);
        const rfcError = `Failed running prediction: ${error}`;
        setRfcResult(rfcError);
        setOpenLoading(false);
      });
  };

  const handleChange = (event) => {
    const selectedSymptom = event.target.value; // will return an array
    setSelectedSymptoms(selectedSymptom);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Symptoms Diagnosis
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 1, gap: 1 }}
          >
            <FormControl sx={{ m: 2, width: "400px" }} error={error} fullWidth>
              <InputLabel id="multi-symptoms-label">Symptoms</InputLabel>
              <Select
                labelId="multi-symptoms-label"
                id="multi-symptoms"
                multiple
                value={selectedSymptoms}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((symptom) => (
                      <Chip key={symptom.value} label={symptom.label} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {symptopms.map((symptom) => (
                  <MenuItem
                    key={symptom.value}
                    value={symptom}
                    style={getStyles(symptom, selectedSymptoms, theme)}
                  >
                    {symptom.label}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText>
                  Please select at least one symptom
                </FormHelperText>
              )}
            </FormControl>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRight />}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>

            <div>
              <Typography component="h3" variant="h5" sx={{ mb: 1, mt: 3 }}>
                Diagnosis:
              </Typography>
              <Typography component="h4" variant="h6" sx={{ mb: 1 }}>
                {rfcResult}
              </Typography>
            </div>
          </Box>
        </Box>
      </Container>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
