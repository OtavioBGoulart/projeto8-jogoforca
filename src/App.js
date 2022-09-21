import forca0 from "./img/forca0.png";
import alfabeto from "./alfabeto";
import React from "react";

function Forca() {

    return (
        <div className="forca">
            <img src={forca0} className="stage0" alt="" />
        </div>
    )
}

function EscolherPalavra() {

    return (
        <button className="button-escolhe-palavra">
            <p>Escolher Palavra</p>
        </button>
    )
}

function GeraLetras() {
    const palavras = ["banana", "tomate"];
    const palavra = "banana";
    const tamanhoPalavra = palavra.length;
    const [preenchendoForca, setPreenchendoForca] = React.useState(["_", "_", "_", "_", "_", "_"]);

    const letraEscolhida = "c"
    console.log(preenchendoForca)
    console.log(tamanhoPalavra);
    return (
        <div className="palavra">
            {preenchendoForca.map((letra, index) => <p key={index}>{letra}</p>)}
        </div>
    )
}

function EscolheRenderiza() {
    return (
        <div className="caixa-direita">
            <EscolherPalavra />
            <GeraLetras />
        </div>
    )
}

function TecladoAlfabeto() {


    return (
        <div className="caixa-teclas">
        {alfabeto.map((palavra, index) => <button key={index} className="botao-letra">{palavra.toUpperCase()}</button>)}
        </div>
    )
}

export default function App() {

    return (
        <>
            <div className="img-palavra">
                <Forca />
                <EscolheRenderiza />
            </div>
            <TecladoAlfabeto />
        </>
    )
}