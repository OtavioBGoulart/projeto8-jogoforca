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
let palavraEscolhida;
let palavraSemCaracteresEspeciais;
let arraySemCaracteres = [];

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
    setCorResultado,
    desabilitaInput,
    setDesabilitaInput }) {

    function escolhePalavraAleatoria() {
        erros = 0;
        setAtualizaForca(forca0);
        palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
        palavraSemCaracteresEspeciais = palavraEscolhida.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        //console.log(palavraSemCaracteresEspeciais);
        //console.log(palavraEscolhida);
        arrayLetrasPalavraEscolhida = palavraEscolhida.split('');
        arraySemCaracteres = palavraSemCaracteresEspeciais.split('');
        console.log(arraySemCaracteres)
        console.log(arrayLetrasPalavraEscolhida);

        const arrayUnderlined = arrayLetrasPalavraEscolhida.map(() => "_");
        setPreenchendoForca(arrayUnderlined);
        const preencheFalse = alfabeto.map(() => false)
        setDesabilitaBotao(preencheFalse);

        setDesabilitaInput(false);

        setCorResultado("black");

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
    setCorResultado,
    desabilitaInput,
    setDesabilitaInput }) {



    function confereLetra(letra, index) {

        if (erros >= 6) {
            return
        }

        function mapeiaArray(value, index) {

            if (preenchendoForca[index] === "_" && value === letra) {
                return arrayLetrasPalavraEscolhida[index]
            } else if (preenchendoForca[index] === arrayLetrasPalavraEscolhida[index]) {
                return preenchendoForca[index]
            } else {
                return "_"
            }
        }

        if (arrayLetrasPalavraEscolhida.includes(letra)) {
            
            const mostraLetra = arraySemCaracteres.map(mapeiaArray);
            setPreenchendoForca(mostraLetra);

            let confereAcerto = 0;

            for (let i = 0; i < arrayLetrasPalavraEscolhida.length; i++) {
                if (mostraLetra[i] === arrayLetrasPalavraEscolhida[i]) {
                    confereAcerto++;
                    console.log(confereAcerto)
                }
            }
    
            if (confereAcerto === preenchendoForca.length) {
                ganhou();
            }
            
        } else {
            erros = erros + 1;

            let forcaAtualizada;

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

                default:
                    return null;

            }
            setAtualizaForca(forcaAtualizada);
        }

        const trocaBotao = [...desabilitaBotao];
        trocaBotao[index] = true
        setDesabilitaBotao(trocaBotao);
        //console.log(erros);

        if (erros === 6) {
            perdeu();
        }

        function perdeu() {
            setPreenchendoForca(arrayLetrasPalavraEscolhida);
            setCorResultado("red");
            const preencherTrue = alfabeto.map(() => true);
            setDesabilitaBotao(preencherTrue);

            setDesabilitaInput(true);
        }

        function ganhou() {
            setPreenchendoForca(arrayLetrasPalavraEscolhida);
            setCorResultado("green");
            const preencherTrue = alfabeto.map(() => true);
            setDesabilitaBotao(preencherTrue);

            setDesabilitaInput(true);
        }

    }

    return (
        <div className="caixa-teclas">
            {alfabeto.map((letra, index) => <button key={index} onClick={() => confereLetra(letra, index)} className="botao-letra" disabled={desabilitaBotao[index]}>{letra.toUpperCase()}</button>)}
        </div>
    )
}

function Chute({ desabilitaInput,
    setDesabilitaInput,
    chutePalavra,
    setChutePalavra,
    preenchendoForca,
    setPreenchendoForca,
    corResultado,
    setCorResultado,
    desabilitaBotao,
    setDesabilitaBotao,
}) {

    function mudouInput(event) {
        setChutePalavra(event.target.value);
    }

    function chutar() {

        if (corResultado === "green") {
            return
        }

        if (palavraEscolhida !== chutePalavra) {
            perdeu()
        } else {
            ganhou()
        }

        setChutePalavra("");
    }

    function perdeu() {
        setPreenchendoForca(arrayLetrasPalavraEscolhida);
        setCorResultado("red");
        const preencherTrue = alfabeto.map(() => true);
        setDesabilitaBotao(preencherTrue);

        setDesabilitaInput(true);
    }

    function ganhou() {
        setPreenchendoForca(arrayLetrasPalavraEscolhida);
        setCorResultado("green");
        const preencherTrue = alfabeto.map(() => true);
        setDesabilitaBotao(preencherTrue);

        setDesabilitaInput(true);
    }

    return (
        <div className="caixa-chute">
            <p>Já sei a palavra</p>
            <input disabled={desabilitaInput} value={chutePalavra} onChange={mudouInput}></input>
            <button className="botao-chutar" onClick={chutar}>Chutar</button>
        </div>
    )
}

export default function App() {
    const preencherTrue = alfabeto.map(() => true)
    const [preenchendoForca, setPreenchendoForca] = useState([]);
    const [desabilitaBotao, setDesabilitaBotao] = useState(preencherTrue);
    const [atualizaForca, setAtualizaForca] = useState(forca0);
    const [desabilitaInput, setDesabilitaInput] = useState(true)
    const [corResultado, setCorResultado] = useState("black");
    const [chutePalavra, setChutePalavra] = useState("");

    //console.log(preenchendoForca)
    console.log("palavra escolhida", palavraEscolhida)



    return (
        <>
            <div className="img-palavra">
                <Forca atualizaForca={atualizaForca} setAtualizaForca={atualizaForca} />
                <GeraLetras arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca}
                    setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao}
                    atualizaForca={atualizaForca} setAtualizaForca={setAtualizaForca} corResultado={corResultado} setCorResultado={setCorResultado}
                    desabilitaInput={desabilitaInput} setDesabilitaInput={setDesabilitaInput} />
            </div>
            <TecladoAlfabeto arrayLetrasPalavraEscolhida={arrayLetrasPalavraEscolhida} preenchendoForca={preenchendoForca}
                setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao}
                atualizaForca={atualizaForca} setAtualizaForca={setAtualizaForca} corResultado={corResultado} setCorResultado={setCorResultado}
                desabilitaInput={desabilitaInput} setDesabilitaInput={setDesabilitaInput} />
            <Chute desabilitaInput={desabilitaInput} setDesabilitaInput={setDesabilitaInput} chutePalavra={chutePalavra} setChutePalavra={setChutePalavra}
                preenchendoForca={preenchendoForca} setPreenchendoForca={setPreenchendoForca} desabilitaBotao={desabilitaBotao} setDesabilitaBotao={setDesabilitaBotao}
                corResultado={corResultado} setCorResultado={setCorResultado} />
        </>
    )
}

