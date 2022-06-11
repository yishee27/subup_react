import Drawer from './components/Drawer'
import Table from './components/Table'
import Button from './components/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from './components/TextField'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import Progress from './components/Progress'
import Thumbnail from './components/Thumbnail'
import ReadOnlyText from './components/ReadOnlyText'
import TimeCoded from './components/TimeCoded'
import Language from './components/Language'

const tableHeader = [
  { id: 'status', label: 'Status', minWidth: 110, align: 'center', show: true },
  { id: 'incharge', label: 'Translator', minWidth: 10, align: 'center', show: true },
  { id: 'title', label: 'Video', minWidth: 290, align: 'center', show: true },
  { id: 'time coded', label: 'Time coded', minWidth: 0, align: 'center', show: true, }, 
  { id: 'price', label: 'Price/Min', minWidth: 0, align: 'center', show: true, }, 
  { id: 'language', label: 'Language', minWidth: 160, align: 'center', show: true, },

]

interface Project {
  duration: number;
  incharge: string;
  language: string;
  price: number;
  status: number;
  thumbnail: string;
  title: string;
  url: string;
}

export default function Projects(initialData: { projects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(initialData.projects);
  }, [initialData.projects])

  const handleActionMenuItemOnClick = async (index: any) => {
    const res = await fetch("http://localhost:3000/api/projects", {
      method: 'PUT',
      body: JSON.stringify(index)
    });
    const projects: Project[] = await res.json();
    setProjects(projects);
  }

  return(
  	<div className="container">
      <p className="smallTitle"> Pages / Projects </p>
    	<h1 className="title">Projects</h1>
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <TextField
         ariaLabel={"search query"}
         placeholder={"Search Query"}
        />
      </Box>

      <Box>
      <Button
         routePath={"addProject"}
         startIcon={<AddCircleIcon/>}
         text={"Add a Project"}
        /> 
        
      </Box>
      <Table
        tableHeader= { tableHeader }
        tableData={ projects }
        handleActionMenuItemOnClick={ (index: number) => handleActionMenuItemOnClick(index) }
        render={ (col: any, row: any) => { 
          const data: any = {};
          const rowData = row[col.id];
          data[col.id] = rowData;
          return <div>
            { data.hasOwnProperty('status') && <Progress status={data.status} text={row.incharge} />  }
            { data.hasOwnProperty('incharge') && <ReadOnlyText text={data.incharge} /> }
            { data.hasOwnProperty('title') && 
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Thumbnail src={row.thumbnail} alt={row.title} href={row.url} duration={row.duration} />
                <div style={{ marginLeft: '50px' }}>{row.title}</div>
              </Box>
               }
            { data.hasOwnProperty('time coded') && <TimeCoded status={row.status} /> }
            { data.hasOwnProperty('price') && <ReadOnlyText style={{ color: "green" }} text={data.price} format={"ko-KR"} /> }
            { data.hasOwnProperty('language') && <Language language={data.language} /> }
          </div>
        }}    
      />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/projects");
  const projects: Project[] = await res.json();
  return {props: { projects }}
}

Projects.getLayout = function getLayout(page: any) {
  return (
    <Drawer>
      {page}
    </Drawer>
  )
}