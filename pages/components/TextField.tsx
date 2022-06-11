import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import BellIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface TextFieldProps {
  placeholder: string;
  ariaLabel: string;
}

export default function TextField(props: TextFieldProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        m: '10px 10px',
        display: 'flex',
        alignItems: 'center',
        width: 450,
        height:60,
        borderRadius: 10
      }}
    >
      <Box sx={{
        borderRadius: 10,
        m: '10px 10px',
        width:330,
        backgroundColor:'#F1F5FE'}}>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': props.ariaLabel }}
      />
      </Box>
      <BellIcon sx={{ fontSize:'40px', color:'#BABEC8'}}/>
      <AccountCircleIcon sx={{ fontSize:'40px', color:'#BABEC8'}}/>
    </Paper>
  );
}
