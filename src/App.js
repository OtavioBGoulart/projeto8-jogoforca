import forca0 from "./img/forca0.png";
import forca6 from "./img/forca6.png";
import alfabeto from "./alfabeto";
import React, { useState } from "react";

let arrayLetrasPalavraEscolhida = [];

function Forca() {
    /* const placar = 6;
    const forca = "forca" */
    return (
        <div className="forca">
            <img src={forca0} className="stage0" alt="" />
        </div>
    )
}

function GeraLetras({ preenchendoForca, setPreenchendoForca, desabilitaBotao, setDesabilitaBotao }) {

    function escolhePalavraAleatoria() {
        const palavraEscolhida = "bom"
        arrayLetrasPalavraEscolhida = palavraEscolhida.split('');

        const arrayUnderlined = arrayLetrasPalavraEscolhida.map(() => "_");
        setPreenchendoForca(arrayUnderlined);
        setDesabilitaBotao(false);
    }


    return (
        <div className="caixa-direita">
            <button className="button-escolhe-palavra" onClick={escolhePalavraAleatoria}>
                <p>Escolher Palavra</p>
            </button>
            <div className="palavra">
                {preenchendoForca.map((letra, index) => <p key={index}>{letra}</p>)}
            </div>
        </div>
    )
}

function TecladoAlfabeto({ preenchendoForca, setPreenchendoForca, desabilitaBotao, setDesabilitaBotao }) {

    /* function preencheLetras(value, index) {
        console.log(value);
        if (preenchendoForca[index] === "_" && value === letra) {
            return value
        } else if (preenchendoForca[index] === value) {
            return preenchendoForca[index]
        } else {
            return "_"
        }
    }; */


    function confereLetra(letra) {
        console.log(arrayLetrasPalavraEscolhida);

        //const mostraLetra = arrayLetrasPalavraEscolhida.map(preencheLetras(value, index));
        //console.log(mostraLetra);

        /* setDesabilitaBotao(true) */
        /* if (arrayLetras.includes(letra)) {
            const mostraLetra = [...preenchendoForca];
            arrayLetras.filter
            
        } */
        //setPreenchendoForca(mostraLetra);
        //setDesabilitaBotao(desabilitarClicado);

    }

    return (
        <div className="caixa-teclas">
            {alfabeto.map((letra, index) => <button key={index} onClick={() => confereLetra(letra)} className="botao-letra" disabled={desabilitaBotao}>{letra.toUpperCase()}</button>)}
        </div>
    )
}

export default function App() {
    const [preenchendoForca, setPreenchendoForca] = useState([]);
    const [desabilitaBotao, setDesabilitaBotao] = useState(true);
    console.log(desabilitaBotao);


    return (
        <>
            <div className="img-palavra">
                <Forca />
                <GeraLetras arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca} setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao} />
            </div>
            <TecladoAlfabeto arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca} setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao} />
        </>
    )
}