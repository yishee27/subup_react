import * as React from 'react';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface languageProps {
    language: String;
}

interface LanguageMap {
    English: String;
    Korean: String;
  }

const languageMap: LanguageMap  = {
    English: "EN",
    Korean: "KR"
  }

export default function Icon(props: languageProps) {
    const [fromLanguage, setFromLanguage] = useState<string | undefined>("");
    const [toLanguage, setToLanguage] = useState<string | undefined>("");

    useEffect(() => {

        const fromLanguage = Object.keys(languageMap).find(( (key: any) => languageMap[key as keyof LanguageMap] === (props.language).slice(0,2) ));
        setFromLanguage(fromLanguage);

        const toLanguage = Object.keys(languageMap).find(( (key: any) => languageMap[key as keyof LanguageMap] === (props.language).slice(2,4) ));
        setToLanguage(toLanguage);
  
    }, [props.language])

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Chip label={fromLanguage}  sx={{backgroundColor: '#212661', color:'white'}} />
            <ArrowForwardIcon color="disabled"/>
            <Chip label={toLanguage}  sx={{backgroundColor: '#212661', color:'white'}} />
        </Box>




    )
}