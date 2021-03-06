import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GlobalState from './GlobalState';
import PersonsBox from './PersonsBox';
import AntiBodyComponent from './AntiBodyComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "justify",
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    },

    packageBox:{
      backgroundColor :  "#fff",
      border: "1px solid #999",
      color: "#555",
      fontWeight: "500",
      fontSize: "0.95rem",
      borderRadius: "4px",
      width: "100%",
      padding: "10px",
      cursor: "pointer",
      transition: "all 0.1s ease-in-out",
      "&:hover": {
        backgroundColor : theme.palette.primary.light,     
      },
    },

    packageBoxSelected:{
      backgroundColor:  theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.light}`,
      fontWeight: "500",
      fontSize: "0.95rem",
      borderRadius: "4px",
      width: "100%",
      padding: "10px",
      color: "#fff",
      cursor: "pointer",
    },

    pageTitle:{
      color : theme.palette.primary.main,
      marginBottom: "15px"
    }

  }));

  const Packages = [
    {packageName: 'PRIVATE CONSULTATION WITH CONSULTANT DERMATOLOGIST'},
    {packageName: `FREE CONSULTATION FOR AESTHETIC TREATMENTS AND BOTOX`},
    {packageName: `RADIOFREQUNCY`},
    {packageName: `LASER HAIR`},
    {packageName: `FILLERS`},
    {packageName: `MOLE MAPPING / REMOVAL`},
    {packageName: `DERMABRASION`},
    {packageName: `PEELS`},
    {packageName: `WART REMOVAL`},
  ]

export default function PackageForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);

    const [notes, setNotes] = React.useState(state.notes ?? '');

    const notesChanged = (event) =>
    {
        setNotes(event.target.value);
        setState(state => ({...state, notes : event.target.value }));
        setState(state => ({...state, notesError : false }));
    }
    
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    

    const packageClicked = (item) =>
    {
      if (item.packageName === state.package)
      {
        setState({...state, package : "Consultation"});
      }else
      {
        setState({...state, package : item.packageName});
      }
    
    }

  return (
    <React.Fragment>
      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
        Choose your Service
      </Typography>

      <p style={{textAlign:"left", color:"#555"}}>
      <i> * All appointments and treatments are performed by consultants dermatologist. </i>
      </p>

      <Grid container spacing={1} alignItems="baseline" style={{marginTop:"10px"}}>
        {Packages.map((item) => (
          <Grid item xs={12} md={6}>
            <div
              className={
                item.packageName === state.package
                  ? classes.packageBoxSelected
                  : classes.packageBox
              }
              onClick={() => packageClicked(item)}
            >
              {item.packageName}
            </div>
          </Grid>
        ))}

        <Grid item xs={12}>
          <TextField
            style={{marginTop:"10px"}}
            id="notes"
            // error={state.notesError && state.package === "Others"}
            fullWidth
            // required={state.package === "Others"}
            label="Others"
            value={notes}
            onChange={notesChanged}
            multiline
            rows={4}
            placeholder="please enter your note here..."
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

