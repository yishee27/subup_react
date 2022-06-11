import * as React from 'react';
import { useEffect, useState } from 'react';
import XIcon from '@mui/icons-material/Close';
import OIcon from '@mui/icons-material/PanoramaFishEye';



interface timeProps {
    status: number;
}

export default function Icon(props: timeProps) {
    const [TimeCoded, setTimeCoded] = useState<boolean>(false);
  
    useEffect(() => {

        if (props.status !== 0)
        setTimeCoded(true);
  
    }, [props.status])

    if( TimeCoded === false){
        return (
            <XIcon sx={{fontSize:40, color:'#FB7452'}}></XIcon>
        );
    }else{
        return (
            <OIcon sx={{fontSize:40, color:'#1C4BFE'}}></OIcon>
        )
    }
}