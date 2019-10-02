import React, {Component} from 'react';

//imagem
import logo from './assets/img/images.png';


import Axios from 'axios';


class ViaCep extends Component{

  constructor(){
    super();
    this.state = {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      unidade: '',
      ibge: '',
      gia: '',
    };
  }

  // componentDidMount(){
  //   var cepDigitado = this.state.cep;
  //   fetch('viacep.com.br/ws/'+ cepDigitado + '/json/unicode')
  //     .then(response => response.json())
  //     .then(data => this.setState({lista:data}));
  // }

  atualizaCEP = (event) =>{
    this.setState({cep:event.target.value})
    console.log(this.state);
  }

  trazInfomacoes = (event) =>{
    event.preventDefault();
    Axios.get('http://viacep.com.br/ws/'+this.state.cep+'/json/')

      .then(response =>{
        if(response.status === 200){
          console.log(response.data)
          // this.props.history.push('/viacep');
          this.setState({
            cep: response.cep,
            logradouro: response.logradouro,
            complemento: response.complemento,
            bairro: response.bairro,
            localidade: response.localidade,
            uf: response.uf,
            unidade: response.unidade,
            ibge: response.ibge,
            gia: response.gia,
          })
        }else{
          console.log("Oops! Deu erro! Vc digitou só números? Tem algum caractere estranho?")
        }
      })
      .catch(erro =>{
        this.setState({erro: "Oops! Deu erro! Vc digitou só números? Tem algum caractere estranho?"});
        console.log(erro);
      });
  }


  render(){
    return(
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src={logo} />
            <h1>Meu CEP</h1>
          </div>
        </header>
    
        <main className="conteudoPrincipal">
          <section>
            <div>
              <h2>CEP</h2>
              <form>
                <div className = "container">
                  <input
                    type="text"
                    className="className__CEP"
                    placeholder="Digite o Cep a ser procurado"
                    value={this.state.cep}
                    onChange={this.atualizaCEP}  
                  />
                  
                  <button
                    id="btn__buscaCep"
                    onClick={this.trazInfomacoes}
                  >
                    Procurar CEP
                  </button>

                </div>
              </form>
            </div>

            <div className="container">
                <table id = "tabela-cep">
                  <thead>
                   <tr>
                     <th>CEP</th>
                     <th>Logradouro</th>
                     <th>Complemento</th>
                     <th>Bairro</th>
                     <th>Localidade</th>
                     <th>UF</th>
                     <th>Unidade</th>
                     <th>IBGE</th>
                     <th>GIA</th>
                   </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{this.state.cep}</td>
                      <td>{this.state.logradouro}</td>
                      <td>{this.state.complemento}</td>
                      <td>{this.state.bairro}</td>
                      <td>{this.state.localidade}</td>
                      <td>{this.state.uf}</td>
                      <td>{this.state.unidade}</td>
                      <td>{this.state.ibge}</td>
                      <td>{this.state.gia}</td>
                    </tr>
                </tbody>
                </table>
            </div>


          </section>

        </main>
      </div>
    );
  }


}

export default ViaCep;
