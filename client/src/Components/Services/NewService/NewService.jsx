import React, { useState, useEffect} from 'react'
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../../../js/useLocalStorage';

import axios from 'axios';
import moment from 'moment';

import { jsPDF } from "jspdf";
import logoColumbia from './logo-columbia.jpeg';

const {REACT_APP_API} = process.env;


export default function NewService( props ) {
  const [listDocuments   , setListDocuments]    = useState();
  const [docSelected     , setdocSelected]      = useState('');
  
  const [newDate         , setnewDate]          = useState('');
  const [newRequester    , setnewRequester]     = useState('');
  const [newPosition     , setnewPosition]      = useState('');
  const [newDepartment   , setnewDepartment]    = useState('');
  const [newService      , setnewService]       = useState('');
  const [newObservations , setnewObservations] = useState('');

  const [newTitle        , setnewTitle]        = useState('');
  const [newVobo         , setnewVobo]         = useState('');
  const [newResponsable  , setnewResponsable]  = useState('');
  const [newAccordance   , setnewAccordance]   = useState('');
  const [canSave         , setcanSave]         = useState(false);
  const [userLogged    , setUserLogged]        = useLocalStorage('userLogged','');

  
  
  const SendFileToServer = async(nameFilePDF)=> {
    console.log(nameFilePDF)
    const form = new FormData();
    /* const responseFileUpload = await axios.post('/serviceUpload',nameFilePDF, {
      headers: {
          "authorization": `Bearer ${userLogged.userToken}`,
      }
      }); */
  
      const file = {
        file : nameFilePDF,
      }
    const responseFileUpload = await axios.post(`${REACT_APP_API}/serviceUpload`,file);
    console.log(responseFileUpload)
    if (responseFileUpload) {
      alert()
    } else {
      
      alert('NO PASO NADA')
    }
  }
  

 //version MEDIA CARTA
 function genPDF(numberService) {
  let nameFilePDF = docSelected+ "-"+ numberService+".pdf";
  
  const docPdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: 'letter',
  });

  let pageHeight = docPdf.internal.pageSize.height || docPdf.internal.pageSize.getHeight();
  let pageWidth = docPdf.internal.pageSize.width || docPdf.internal.pageSize.getWidth();

  let centerText = function(text, y) {
    var textWidth = docPdf.getStringUnitWidth(text) * docPdf.internal.getFontSize() / docPdf.internal.scaleFactor;
    var textOffset = (docPdf.internal.pageSize.width - textWidth) / 2;
    docPdf.text(textOffset, y, text);
  }

  var logo = new Image();
  logo.src = logoColumbia;

  docPdf.rect(10,2,pageWidth-20,17)

  docPdf.addImage(logo, 'JPEG', 20, 5, 12, 12);

  docPdf.setFont('times','bold');
  docPdf.setFontSize(11);
    docPdf.text("SOLICITUD DE SERVICIOS DE "+ newTitle, pageWidth / 2, 7,{align:"center"});

    docPdf.text(docSelected, pageWidth / 2, 12,{align:"center"}); 

  docPdf.setFontSize(9);
    docPdf.text("NOMBRE:" + newRequester,10,25)
    docPdf.text("FECHA:"  + moment(newDate).format('dddd DD/MMMM/YYYY'),pageWidth / 2+30,25)
    docPdf.text("PUESTO:" + newPosition,10,35) 

  
  docPdf.setFillColor(0,0,255);
  docPdf.rect(10,30,pageWidth-20,6,'F')
  docPdf.setTextColor(255,255,255);
    centerText("DESCRIPCIÓN DEL SERVICIO",35)
  docPdf.rect(10,30,pageWidth-20,23)
  docPdf.setTextColor(0,0,0);
  docPdf.setFont('arial','normal');
    centerText(newService,45);

  docPdf.setFillColor(0,0,255);
  docPdf.rect(10,50,pageWidth-20,6,'F')
  docPdf.setTextColor(255,255,255);
    centerText("OBSERVACIONES",55)
  docPdf.rect(10,50,pageWidth-20,23)
  docPdf.setTextColor(0,0,0);
  docPdf.setFont('arial','normal');
    centerText(newObservations,60);

  //SOLICITANTE
  docPdf.setFillColor(204,204,204);
  docPdf.setLineDash([1, 1], 10);
  docPdf.rect(10,75,55,5,'F')
  docPdf.setTextColor(0,0,0);
  docPdf.setFontSize(8);
  docPdf.setFont('arial','normal');
    docPdf.text("SOLICITANTE",30,79)

  docPdf.rect(10,75,55,20) 
  docPdf.rect(10,95,55,5)

  docPdf.setFont('arial','normal');
    docPdf.text(newRequester,28,99)

  docPdf.setFillColor(204,204,204);
  
  docPdf.rect(10,100,55,5,'F')
  docPdf.setTextColor(0,0,0);
  
  docPdf.rect(10,100,55,5)
  docPdf.setFontSize(8);
  docPdf.setFont('arial','normal');
    docPdf.text("FIRMA DEL SOLICITANTE",21,103)
 

    //vobo
    docPdf.setFillColor(204,204,204);
    docPdf.setLineDash([1, 1], 10);
    docPdf.rect(80,75,55,6,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("VO.BO",104,79)
  
    docPdf.rect(80,75,55,20) 
    docPdf.rect(80,95,55,5)
  
      docPdf.text(newVobo,94,99)
  
    docPdf.setFillColor(204,204,204);
    
    docPdf.rect(80,100,55,5,'F')
    docPdf.setTextColor(0,0,0);
    
    docPdf.rect(80,100,55,5)
    docPdf.setFontSize(8);
      docPdf.text("FIRMA  DIRECTOR",97,103)
   

  //ENTERADO
  docPdf.setFillColor(204,204,204);
    docPdf.setLineDash([1, 1], 10);
    docPdf.rect(150,75,55,6,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("ENTERADO",171,79)
  
    docPdf.rect(150,75,55,20) 
    docPdf.rect(150,95,55,5)
  
      docPdf.text(newResponsable,165,99)
  
    docPdf.setFillColor(204,204,204);
    
    docPdf.rect(150,100,55,5,'F')
    docPdf.setTextColor(0,0,0);
    
    docPdf.rect(150,100,55,5)
    docPdf.setFontSize(8);
      docPdf.text("ENCARGADO DE INFORMATICA",156,103)
   

//C O N F O R M I D A D 
docPdf.setFillColor(204,204,204);
    docPdf.setLineDash([1, 1], 10);
    docPdf.rect(215,75,55,6,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("SOLICITANTE",231,79)
  
    docPdf.rect(215,75,55,20) 
    docPdf.rect(215,95,55,5)
  
      docPdf.text(newRequester,232,99)
  
    docPdf.setFillColor(204,204,204);
    
    docPdf.rect(215,100,55,5,'F')
    docPdf.setTextColor(0,0,0);
    
    docPdf.rect(215,100,55,5)
    docPdf.setFontSize(8);
      docPdf.text("CONFORMIDAD CON EL SERVICIO",221,103)
  
//PARTE SEGUNDA, MITAD HACIA ABAJO
let NUEVO_LIMITE= 105
docPdf.setLineDash([1, 0], 10);
docPdf.rect(10,2+NUEVO_LIMITE,pageWidth-20,17)

  docPdf.addImage(logo, 'JPEG', 20, 5+NUEVO_LIMITE, 12, 12);

  docPdf.setFont('times','bold');
  docPdf.setFontSize(11);
    docPdf.text("SOLICITUD DE SERVICIOS DE "+ newTitle, pageWidth / 2, 7+ NUEVO_LIMITE,{align:"center"});

    docPdf.text(docSelected, pageWidth / 2, 12+ NUEVO_LIMITE,{align:"center"}); 

  docPdf.setFontSize(9);
    docPdf.text("NOMBRE:" + newRequester,10,25+ NUEVO_LIMITE);
    docPdf.text("FECHA:"  + moment(newDate).format('dddd DD/MMMM/YYYY'),pageWidth / 2+30,25+ NUEVO_LIMITE);
    docPdf.text("PUESTO:" + newPosition,10,35+ NUEVO_LIMITE) ;

  docPdf.setFillColor(0,0,255);
  docPdf.rect(10,30+ NUEVO_LIMITE,pageWidth-20,6,'F')
  docPdf.setTextColor(255,255,255);
    centerText("DESCRIPCIÓN DEL SERVICIO",35+ NUEVO_LIMITE)
  docPdf.rect(10,30 + NUEVO_LIMITE,pageWidth-20,23)
  docPdf.setTextColor(0,0,0);
  docPdf.setFont('arial','normal');
    centerText(newService,45 + NUEVO_LIMITE);

  docPdf.setFillColor(0,0,255);
  docPdf.rect(10,50 +NUEVO_LIMITE,pageWidth-20,6,'F')
  docPdf.setTextColor(255,255,255);
    centerText("OBSERVACIONES",55+ NUEVO_LIMITE)
  docPdf.rect(10,50 + NUEVO_LIMITE,pageWidth-20,23)
  docPdf.setTextColor(0,0,0);
  docPdf.setFont('arial','normal');
    centerText(newObservations,60 + NUEVO_LIMITE);

//SOLICITANTE
docPdf.setFillColor(204,204,204);
docPdf.setLineDash([1, 1], 10);
docPdf.rect(10,75+ NUEVO_LIMITE,55,5,'F')
docPdf.setTextColor(0,0,0);
docPdf.setFontSize(8);
docPdf.setFont('arial','normal');
  docPdf.text("SOLICITANTE",30,79 + NUEVO_LIMITE)

docPdf.rect(10,75+ NUEVO_LIMITE,55,20) 
docPdf.rect(10,95+ NUEVO_LIMITE,55,5)

docPdf.setFont('arial','normal');
  docPdf.text(newRequester,28,99+ NUEVO_LIMITE)

docPdf.setFillColor(204,204,204);

docPdf.rect(10,100 + NUEVO_LIMITE,55,5,'F')
docPdf.setTextColor(0,0,0);

docPdf.rect(10,100 + NUEVO_LIMITE,55,5)
docPdf.setFontSize(8);
docPdf.setFont('arial','normal');
  docPdf.text("FIRMA DEL SOLICITANTE",21,103+ NUEVO_LIMITE)

//vobo
docPdf.setFillColor(204,204,204);
docPdf.setLineDash([1, 1], 10);
docPdf.rect(80,75+ NUEVO_LIMITE,55,6,'F')
docPdf.setTextColor(0,0,0);
docPdf.setFontSize(8);
  docPdf.text("VO.BO",104,79 + NUEVO_LIMITE)

docPdf.rect(80,75 + NUEVO_LIMITE,55,20) 
docPdf.rect(80,95 + NUEVO_LIMITE,55,5)

  docPdf.text(newVobo,94,99 + NUEVO_LIMITE)

docPdf.setFillColor(204,204,204);

docPdf.rect(80,100+ NUEVO_LIMITE,55,5,'F')
docPdf.setTextColor(0,0,0);

docPdf.rect(80,100 + NUEVO_LIMITE,55,5)
docPdf.setFontSize(8);
  docPdf.text("FIRMA  DIRECTOR",97,103+ NUEVO_LIMITE)


//ENTERADO
docPdf.setFillColor(204,204,204);
docPdf.setLineDash([1, 1], 10);
docPdf.rect(150,75 + NUEVO_LIMITE,55,6,'F')
docPdf.setTextColor(0,0,0);
docPdf.setFontSize(8);
  docPdf.text("ENTERADO",171,79+ NUEVO_LIMITE)

docPdf.rect(150,75 + NUEVO_LIMITE,55,20) 
docPdf.rect(150,95 + NUEVO_LIMITE,55,5)

  docPdf.text(newResponsable,165,99 + NUEVO_LIMITE);

docPdf.setFillColor(204,204,204);

docPdf.rect(150,100 + NUEVO_LIMITE,55,5,'F')
docPdf.setTextColor(0,0,0);

docPdf.rect(150,100 + NUEVO_LIMITE,55,5)
docPdf.setFontSize(8);
  docPdf.text("ENCARGADO DE INFORMATICA",156,103 + NUEVO_LIMITE);


//C O N F O R M I D A D 
docPdf.setFillColor(204,204,204);
docPdf.setLineDash([1, 1], 10);
docPdf.rect(215,75 + NUEVO_LIMITE,55,6,'F')
docPdf.setTextColor(0,0,0);
docPdf.setFontSize(8);
  docPdf.text("SOLICITANTE",231,79+ NUEVO_LIMITE)

docPdf.rect(215,75 + NUEVO_LIMITE,55,20) 
docPdf.rect(215,95 + NUEVO_LIMITE,55,5)

  docPdf.text(newRequester,232,99 + NUEVO_LIMITE)

docPdf.setFillColor(204,204,204);

docPdf.rect(215,100 + NUEVO_LIMITE,55,5,'F')
docPdf.setTextColor(0,0,0);

docPdf.rect(215,100 + NUEVO_LIMITE,55,5)
docPdf.setFontSize(8);
  docPdf.text("CONFORMIDAD CON EL SERVICIO",221,103 + NUEVO_LIMITE);


docPdf.save(nameFilePDF);
SendFileToServer(nameFilePDF);

}




  //version HOJA CARTA COMPLETA
  function genPDF_HOJA_CARTA() {
  
    const docPdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: 'letter',
    });

    let pageHeight = docPdf.internal.pageSize.height || docPdf.internal.pageSize.getHeight();
    let pageWidth = docPdf.internal.pageSize.width || docPdf.internal.pageSize.getWidth();

    let centerText = function(text, y) {
      var textWidth = docPdf.getStringUnitWidth(text) * docPdf.internal.getFontSize() / docPdf.internal.scaleFactor;
      var textOffset = (docPdf.internal.pageSize.width - textWidth) / 2;
      docPdf.text(textOffset, y, text);
    }

    var logo = new Image();
    logo.src = logoColumbia;

    docPdf.rect(10,2,pageWidth-10,30)

    docPdf.addImage(logo, 'JPEG', 10, 5, 20, 20);

    docPdf.setFont('times','bold');
    docPdf.setFontSize(14);
      docPdf.text("COLEGIO COLUMBIA AC", pageWidth / 2, 10,{align:"center"});

    docPdf.setFont('arial','normal');
    docPdf.setFontSize(12);
      docPdf.text("SOLICITUD DE SERVICIOS DE "+ newTitle, pageWidth / 2, 20,{align:"center"});

    docPdf.text(docSelected, pageWidth / 2, 30,{align:"center"}); 

    
    docPdf.text("FECHA:"  + moment(newDate).format('dddd DD/MMMM/YYYY'),pageWidth / 2+20,40)
    docPdf.text("NOMBRE:" + newRequester,10,45)
    docPdf.text("PUESTO:" + newPosition,10,55) 

    
    docPdf.setFillColor(0,0,255);
    docPdf.rect(10,60,pageWidth-10,8,'F')
    docPdf.setTextColor(255,255,255);
      centerText("DESCRIPCIÓN DEL SERVICIO",65)
    docPdf.rect(10,60,pageWidth-10,30)

    docPdf.setFillColor(0,0,255);
    docPdf.rect(10,100,pageWidth-10,8,'F')
    docPdf.setTextColor(255,255,255);
      centerText("OBSERVACIONES",105)
    docPdf.rect(10,100,pageWidth-10,30)

    //SOLICITANTE
    docPdf.setFillColor(204,204,204);
    docPdf.setLineDash([1, 1], 10);
    docPdf.rect(10,140,60,8,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("SOLICITANTE",30,145)
    docPdf.rect(10,140,60,25)

    docPdf.rect(10,165,60,7)
      docPdf.text(newRequester,28,170)

    docPdf.setFillColor(204,204,204);
    
    docPdf.rect(10,172,60,8,'F')
    docPdf.setTextColor(0,0,0);
    
    docPdf.rect(10,172,60,8)
    docPdf.setFontSize(8);
      docPdf.text("FIRMA DEL SOLICITANTE",21,176)


      //vobo
    docPdf.setFillColor(204,204,204);
    docPdf.rect(85,140,60,8,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("VO.BO",109,145)
    docPdf.rect(85,140,60,25)

    docPdf.rect(85,165,60,7)
      docPdf.text(newVobo,101,170)

    docPdf.setFillColor(204,204,204);
    docPdf.rect(85,172,60,8,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.rect(85,172,60,8)
    docPdf.setFontSize(8);
      docPdf.text("FIRMA DIRECTOR",104,176)

    //enterado
    docPdf.setFillColor(204,204,204);
    docPdf.rect(155,140,60,8,'F');
    docPdf.setTextColor(0,0,0);
    docPdf.setFontSize(8);
      docPdf.text("ENTERADO",176,145)
    docPdf.rect(155,140,60,25)

    docPdf.rect(155,165,60,7)
      docPdf.text(newResponsable,172,170)

    docPdf.setFillColor(204,204,204);
    docPdf.rect(155,172,60,8,'F')
    docPdf.setTextColor(0,0,0);
    docPdf.rect(155,172,60,8)
    docPdf.setFontSize(8);
      docPdf.text("ENCARGADO DE INFORMATICA",165,176)

//C O N F O R M I D A D 
  docPdf.setFillColor(204,204,204);
  docPdf.rect(228,140,60,8,'F')
  docPdf.setTextColor(0,0,0);
  docPdf.setFontSize(8);
    docPdf.text("S O L I C I T A N T E",248,145)
  docPdf.rect(228,140,60,25)

  docPdf.rect(228,165,60,7)
    docPdf.text(newRequester,248,170)

  docPdf.setFillColor(204,204,204);
  docPdf.rect(228,172,60,8,'F')
  docPdf.setTextColor(0,0,0);
  docPdf.rect(228,172,60,8)
  docPdf.setFontSize(8);
    docPdf.text("CONFORMIDAD CON EL SERVICIO",234,176)

    centerText("Original:  Encargado de Informática y Sistemas            Copia: Solicitante",245)

  docPdf.save("winnithepoo.pdf");
}


  async function handleFormService() {
    let id_tmp = uuidv4();
    
    const serviceData = {
      id           : id_tmp,
      date         : newDate,
      document     : docSelected,
      title        : newTitle,
      requester    : newRequester,
      position     : newPosition,
      department   : newDepartment,
      serviceReq   : newService,
      observations : newObservations,
      vobo         : newVobo,
      responsable  : newResponsable,
      accordance   : newAccordance,

      serviceStatus: 'Required',
      numberTask   : props.numrequest,
      level        : props.level,
    }
    try {
      const response = await axios.post(`${REACT_APP_API}/services`,serviceData, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
        });
      if (response) {
        console.log(response)
        props.setnewOrderService(response.data.number);          
        genPDF(response.data.number)
        props.onHide();
      }
    } catch(error) {
      console.log(error.message);
    }   
  }

  async function handleDocument(e) {
    try {
      let response = await axios.get(`${REACT_APP_API}/ConfigServiceOrder/${e}`
      );
      if (response) {
        setnewTitle(response.data.title);
        setnewRequester(response.data.requester);
        setnewVobo(response.data.vobo);
        setnewResponsable(response.data.responsable);
        setnewAccordance(response.data.accordance);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const check_canSave = ()=> {
    if (newPosition && newDepartment && newDate && newService) setcanSave(true) 
    else setcanSave(false)
  }

  function handleNewRequester(e) {  
    setnewRequester(e);
    check_canSave();
  }
  function handleNewPosition(e) {
    setnewPosition(e);
    check_canSave();
  }
  function handleNewDepartment(e) {
    setnewDepartment(e);
    check_canSave();
  }
  function handleNewService(e) {
    setnewService(e);
    check_canSave();
  }
  function handleNewObservations(e) {
    setnewObservations(e)
    check_canSave();
  }

/*------------------------------------------*/
const getListDocuments =async()=> {
  try {
      const response = await axios.get(`${REACT_APP_API}/configServiceOrder`);
      if (response.data.length > 0 ) {
          let listTmp = []
          for (let d in response.data) listTmp.push(response.data[d].document);
          setListDocuments(listTmp);
        
          setdocSelected(listTmp[0]);
          setnewTitle(response.data[0].title); 

          setnewRequester(response.data[0].requester);
          
          setnewVobo(response.data[0].vobo);
          setnewResponsable(response.data[0].responsable); 
          setnewAccordance(response.data[0].requester)
      }
      return response;
  } catch (error) {
      console.log(error.message);
  }
}
/*------------------------------------------*/


  useEffect( ()=> {
    getListDocuments();
  },[]);

  return (
    <Modal 
      {...props}
      size = "lg" 
      centered 
      aria-labelledby = "contained-modal-title-vcenter" scrollable 
    >
      <Modal.Header closeButton style = {{backgroundColor:'#CCF'}}>
        <Col xs = {12} xl = {8} lg = {7} md = {7} sm className = "text-left">  
          <Modal.Title style = {{fontSize:'14px'}}>
            SERVICE REQUEST
          </Modal.Title>
          <Col>
            <p> {newTitle}</p>
          </Col>
          
        </Col>
        <Col xs = {12} xl = {3} lg = {5} md = {5} sm className = "text-left">  
          <Form.Select 
              options = {listDocuments}  
              name = "document" 
              id   = "document"
              onChange = { (e)=> handleDocument(e.target.value) } 
              size = "sm"
          >
              {listDocuments && listDocuments.map( (element)=> ( <option key={element} value = {element}> {element}</option>))};
          </Form.Select>
          
         </Col>
      </Modal.Header>
      <Modal.Body>
        <Container>
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {6} lg = {6} md = {12} sm className = "text-center">       
            <Form.Label className = "text-center mt-1">Current Date</Form.Label>
              <DatePicker
                selected={Date.parse(newDate)}      
                onChange={(date) => setnewDate(date)}
                dateFormat="dd, MMMM , yyyy"
              />
          </Col>
          <Col xs = {12} xl = {6} lg = {6} md = {12} sm className = "text-center">        
            <Form.Label>Requester</Form.Label>
            <Form.Control 
              type         = "text" 
              name         = "requester" 
              value        = {newRequester}
              onChange     = { (ev)=> handleNewRequester(ev.target.value)} 
            />
          </Col >  
        </Row>
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {6} lg = {6} md = {6} sm className = "text-center">        
            <Form.Label>Position</Form.Label>
            <Form.Control 
              type         = "text" 
              name         = "position" 
              value = {newPosition}
              onChange     = { (ev)=> handleNewPosition(ev.target.value)} 
            />
          </Col >  
          <Col xs = {12} xl = {6} lg = {6} md = {6} sm className = "text-center">        
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type         = "text" 
                name         = "department" 
                value = {newDepartment}
                onChange     = { (ev)=> handleNewDepartment(ev.target.value)} 
              />
          </Col >  
        </Row>
         <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {10} lg = {10} md = {12} sm className = "text-center">
            <Form.Label className="mb-3 text-center">Service</Form.Label>
            <Form.Control 
              as           = "textarea"  
              name         = "service" 
              defaultValue = {newService}
              onChange     = { (ev) => handleNewService(ev.target.value)} 
            />
          </Col>
        </Row> 
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {8} lg = {8} md = {12} sm className = "text-center">
            <Form.Label className="mb-3">Observations</Form.Label>
            <Form.Control 
              as           = "textarea"  
              name         = "observations" 
              defaultValue = {newObservations}
              onChange     = { (ev) => handleNewObservations(ev.target.value)} 
            />
          </Col>
        </Row> 
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Row className = "d-md-flex justify-content-center py-1">
        <Col>
          <Button variant="secondary" onClick = {props.onHide}>
            Close
          </Button>
        </Col>
        <Col>
          <Button variant="primary" 
                  disabled = {!canSave}
                  onClick = {handleFormService}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
  )
}