import React from 'react';

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



const  ExportToXLS=( {DATA})=> {
    
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let ano = new Date().getYear();
    
    const hoy = dia + '-' + mes + '-' + ano;
    const Name_File = `Inventory-${hoy}`;
  return (
    
    <div className = "ExportToXLS">
        <ExcelFile  element = { <button className ="btn btn-primary mx-1">Export to XLS</button>  }filename = {Name_File}> 
             <ExcelSheet data = {DATA} name = "Inventory" >
                            <ExcelColumn label = "Internal Code" value = "internalCode"/>
                            <ExcelColumn label = "Serial"        value = "serial"/>
                            <ExcelColumn label = "Device"        value = "device"/> 
                            <ExcelColumn label = "Trade"         value = "trade"/> 
                            <ExcelColumn label = "Model"         value = "model"/> 
                            <ExcelColumn label = "Color"         value = "color"/> 
                            <ExcelColumn label = "Room"          value = "room"/> 
                            <ExcelColumn label = "userDevice"    value = "userDevice"/> 
                            <ExcelColumn label = "Doc Resp"      value = "docRes"/>                             
                            <ExcelColumn label = "status"        value = "status"/> 
            </ExcelSheet> 
        </ExcelFile>
    </div>
  )
}

export default ExportToXLS