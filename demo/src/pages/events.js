import axios from 'axios';
import { useState, useEffect,setUpdatedState, useRef, useCallback } from 'react';
import { NoSsr } from '@mui/base/NoSsr';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Button } from '@mui/base/Button';
import { useButton } from '@mui/base/useButton';
import { Component } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import {Container, Stack, checkboxClasses} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles, makeStyles} from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/styles";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { TextField } from "@mui/material"; 
import { ClassNames } from '@emotion/react';
import MenuItem from '@mui/material/MenuItem';
import { setValue } from 'mongoose/lib/utils';

const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'senha', headerName: 'Senha', width: 150 },
    { field: 'empresa', headerName: 'Empŕesa', width: 150 },
    { field: 'CNPJ', headerName: 'CNPJ', width: 150 },
    { field: 'CEP', headerName: 'CEP', width: 150 },
    { field: 'endereço', headerName: 'Endereço', width: 150 },
    { field: 'numero', headerName: 'Número', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 }
  ];

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: "white",
        whiteSpace: "nowrap",
        fontPalette: "white"
      },
      body: {
        fontPalette: "white",
        whiteSpace: "nowrap"
      }
    
  }))(TableCell);
  const useStyles = makeStyles({

    root: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "blue"
        },
    }
});
  
  const StyledTableRow = withStyles((theme) => ({

  }))(TableRow);


  
const Events = () => {

let item = useRef([])


const [valueSelect, setvalueSelect] = useState('')
const optionsSelect = {

}
const [getValue, setgetValue]= useState('')



useEffect(() => {
    
    getItems()
}, [item.current])



const getItems = async () => {

        await axios.get("http://localhost:3005/api/v1/empresa/test")
        .then(res => {
            let dataRes = Object.entries(res.data.data.data); 
           
            
            let arrayIte = [];
            /*dataRes.map(firstArray => {
                
                firstArray.map(secondArray => {
                   if(typeof secondArray == 'object'){
                    }
                })
                
            }) */
            for(let i = 0; i<res.data.data.data.length; i++ ){
                    arrayIte.push(res.data.data.data[i])
                
            }

            item.current = arrayIte;
            return;;})
    
}


const reRender = useCallback(async()=>{
    getItems();
})
const handleChange = (event) => {
    setvalueSelect(event.target.value);
  };

const handleGet = (event) => {
    const reqBodyCNPJ = {
        CNPJ: getValue
    }
    axios({
        method: 'GET',
        url: "http://localhost:3005/api/v1/empresa/" + getValue,
      })
    .then(res=>{    
        console.log("HERE")
        item.current = (res.data.data.empresa)
        console.log(item.current)
    })  
      ;}

const bodySelect = () =>{
    if(valueSelect=="add"){
      return (  <div><TextField
                        label="Senha"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Nome da empresa"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="CNPJ"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="CEP"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Endereço"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Número"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Telefone"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Email"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                    <br /></div> )
    }
    if(valueSelect=="delete"){
        return(<TextField
            label="CNPJ"
            variant="filled"
            color="secondary"
            style={{ marginRight: 10 }}
        />)
    }
    if(valueSelect=="update"){
           return(  <div><TextField
                        label="Senha"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Nome da empresa"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="CNPJ"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="CEP"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Endereço"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Número"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Telefone"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Email"
                        variant="filled"
                        color="secondary"
                        style={{ marginRight: 10 }}
                    />
                    <br /></div> )
    }
    if(valueSelect=="get"){
            return(<div>
              <FormControl onSubmit={handleGet}>  
                <TextField
                label="CNPJ"
                variant="filled"
                color="secondary"
                onInput={e=>setgetValue(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}label="Submit" onClick={handleGet}></Button></FormControl>
            </div>)
    }
    if(valueSelect=="getAll"){
        reRender();
        return <div></div>
    }
    else{
        return <div></div>
    }
}
const body = () => {

            console.log(item.current);
            console.log("inside body")
        return(
            <div>
                        <DataGrid
                    columns={columns}  
                    autoHeight ={true}
                    rows={item.current}
                    getRowId={(row) => Math.random()}
                    />
                </div> )
        }
        return(
          
            <>
            <div>
                <div>
                    <div>
                    <Select
                       onChange={handleChange}
                       label={"select"}
                       value={optionsSelect}
                       onOpen={() => {
                              document.querySelector(".MuiModal-backdrop")?.click();
                        }}
                       onClose={() => {
                            setTimeout(() => {
                           document.activeElement.blur();
                             }, 0);
                           }}
                        sx={{
                        "&:hover": {
                            backgroundColor: "#b34b4b"
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#b34b4b"
                        }
                        }}
                    >
                            <MenuItem value={'add'}>Adicionar</MenuItem>
                            <MenuItem value={'delete'}>Deletar por CNPJ</MenuItem>
                            <MenuItem value={"update"}>Modificar empresa</MenuItem>
                            <MenuItem value={"get"}>Consultar por CNPJ</MenuItem>
                            <MenuItem value={"getAll"}>Todas empresas</MenuItem>

                            
                    </Select>
                    </div>
                        {bodySelect()}
                    <div>
                        <div>
                            <div>
                         
                                    <tbody>
                                        {body()}
                                    </tbody>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }


export default Events;
