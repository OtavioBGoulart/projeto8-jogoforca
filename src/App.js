import forca0 from "./img/forca0.png";
import forca1 from "./img/forca1.png";
import forca2 from "./img/forca2.png";
import forca3 from "./img/forca3.png";
import forca4 from "./img/forca4.png";
import forca5 from "./img/forca5.png";
import forca6 from "./img/forca6.png";
import alfabeto from "./alfabeto";
import palavras from "./palavras"
import React, { useState } from "react";

let arrayLetrasPalavraEscolhida = [];
let erros = 0;
console.log("forca", forca0)

function Forca({ atualizaForca, setAtualizaForca }) {
    /* const placar = 6;
    const forca = "forca" */
    return (
        <div className="forca">
            <img src={atualizaForca} className="stage" alt="" />
        </div>
    )
}

function GeraLetras({ preenchendoForca,
    setPreenchendoForca,
    desabilitaBotao,
    setDesabilitaBotao,
    atualizaForca,
    setAtualizaForca,
    corResultado,
    setCorResultado }) {

    function escolhePalavraAleatoria() {
        erros = 0;
        setAtualizaForca(forca0);
        const palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
        console.log(palavraEscolhida);
        arrayLetrasPalavraEscolhida = palavraEscolhida.split('');

        const arrayUnderlined = arrayLetrasPalavraEscolhida.map(() => "_");
        setPreenchendoForca(arrayUnderlined);
        const preencheFalse = alfabeto.map(() => false)
        setDesabilitaBotao(preencheFalse);
    }


    return (
        <div className="caixa-direita">
            <button className="button-escolhe-palavra" onClick={escolhePalavraAleatoria}>
                <p>Escolher Palavra</p>
            </button>
            <div className="palavra">
                {preenchendoForca.map((letra, index) => <p key={index} style={{ color: corResultado }}>{letra}</p>)}
            </div>
        </div>
    )
}

function TecladoAlfabeto({ preenchendoForca,
    setPreenchendoForca,
    desabilitaBotao,
    setDesabilitaBotao,
    atualizaForca,
    setAtualizaForca,
    corResultado,
    setCorResultado }) {



    function confereLetra(letra, index) {

        if (erros >= 6) {
            return
        }

        function mapeiaArray(value, index) {

            if (preenchendoForca[index] === "_" && value === letra) {
                return value
            } else if (preenchendoForca[index] === value) {
                return preenchendoForca[index]
            } else {
                return "_"
            }
        }

        if (arrayLetrasPalavraEscolhida.includes(letra)) {
            const mostraLetra = arrayLetrasPalavraEscolhida.map(mapeiaArray);
            setPreenchendoForca(mostraLetra);
        } else {
            erros = erros + 1;
            console.log(erros)
            let forcaAtualizada;
            //const forcaAtualizada = `forca${erros}`;
            //console.log(typeof forcaAtualizada)

            switch (erros) {
                case 1:
                    forcaAtualizada = forca1
                    break;
                case 2:
                    forcaAtualizada = forca2
                    break;

                case 3:
                    forcaAtualizada = forca3
                    break;

                case 4:
                    forcaAtualizada = forca4
                    break;

                case 5:
                    forcaAtualizada = forca5
                    break;

                case 6:
                    forcaAtualizada = forca6
                    break;

            }
            console.log("forcaatualizada", forcaAtualizada);
            setAtualizaForca(forcaAtualizada);
        }

        const trocaBotao = [...desabilitaBotao];
        trocaBotao[index] = true
        setDesabilitaBotao(trocaBotao);
        console.log(erros);

        if (erros === 6) {
            Perdeu();
        }

        function Perdeu() {
            setPreenchendoForca(arrayLetrasPalavraEscolhida);
            setCorResultado("red");
            const preencheFalse = alfabeto.map(() => false);
            setDesabilitaBotao(preencheFalse);
        }

    }

    return (
        <div className="caixa-teclas">
            {alfabeto.map((letra, index) => <button key={index} onClick={() => confereLetra(letra, index)} className="botao-letra" disabled={desabilitaBotao[index]}>{letra.toUpperCase()}</button>)}
        </div>
    )
}

function Chute() {
    return (
        <div className="caixa-chute">
            <p>Já sei a palavra</p>
            <input></input>
            <button className="botao-chutar">Chutar</button>
        </div>
    )
}

export default function App() {
    const preencherTrue = alfabeto.map(() => true)
    const [preenchendoForca, setPreenchendoForca] = useState([]);
    const [desabilitaBotao, setDesabilitaBotao] = useState(preencherTrue);
    const [atualizaForca, setAtualizaForca] = useState(forca0);
    const [corResultado, setCorResultado] = useState("black");
    console.log(atualizaForca);


    return (
        <>
            <div className="img-palavra">
                <Forca atualizaForca={atualizaForca} setAtualizaForca={atualizaForca} />
                <GeraLetras arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca}
                    setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao}
                    atualizaForca={atualizaForca} setAtualizaForca={setAtualizaForca} corResultado={corResultado} setCorResultado={setCorResultado} />
            </div>
            <TecladoAlfabeto arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca}
                setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao}
                atualizaForca={atualizaForca} setAtualizaForca={setAtualizaForca} corResultado={corResultado} setCorResultado={setCorResultado} />
            <Chute />
        </>
    )
}

