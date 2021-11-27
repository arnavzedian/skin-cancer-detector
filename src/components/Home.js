import styled from "styled-components"
import {HiUpload} from "react-icons/hi"
import { useEffect, useState } from 'react';
import selectFile from '../controllers/selectFile';
import makePrediction from '../controllers/makePrediction';
import loadModel from '../controllers/loadModel';

const Header = styled.div`
    height: 32vh;
    width:100vw;
    background: var(--secondaryColor);
    color:var(--primaryColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
`

const Main = styled.div`
background: var(--tertiaryColor);
height: 100vh;
color:var(--primaryColor);
padding-bottom: 25px;
`

const H1 = styled.h1`
    margin-bottom: 0;
`

const Medium = styled.div``

const Content = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap:25px;
    padding: 0 31vw;
`
const Img = styled.img`
    height:200px;
    width:100%;
    border-radius: 5px;
    object-fit: cover;

`

const InfoSection = styled.div`
    padding:25px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--secondaryColor);`

const UploadButton = styled.button`
    background: var(--secondaryColor);
    width:100%;
    color:var(--primaryColor);
    padding:25px;
    border:none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content:center;
    gap:15px;
`

function Home() {
    const [cancerStatus, setCancerStatus] = useState(false)
    const [predicting, setPredicting] = useState(false)
    const [image, setImage] = useState(false)
    const[model, setModel] = useState(false)

    useEffect(async ()=>{
        let mdl = await loadModel() 
        setModel(mdl)
    })

    return <Main>
        <Header>
            <H1>Skin Cancer Detection</H1>
            <Medium>By Arnav Singh & Devan S</Medium>
        </Header>

        <Content>
            {image? <Img id="imageSource" src={image} />:null }
            <InfoSection>
                {getInfoSectionData()}
            </InfoSection>
            <UploadButton onClick={uploadFile}> <HiUpload/>  Upload</UploadButton>
        </Content>
    </Main>

    async function uploadFile(){
        let e = await selectFile()
        console.log(e)
        var fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        fr.onload = function(e) { setImage(this.result) };
        setPredicting(true)
        let prediction = await makePrediction(model)
        console.log(prediction)
        setCancerStatus(prediction)
        setPredicting(false)
    }

    function getInfoSectionData(){
        if(predicting) return "Predicting..."
        if(!model) return "Model is loading..."
        if(!cancerStatus) return "Please select the button below to check if you have skin cancer"
        return `Skin Cancer Status: ${cancerStatus}`
    }
}

export default Home;
