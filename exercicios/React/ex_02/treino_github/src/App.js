import React, {Component} from 'react';

//imagem
import logo from './assets/img/github-logo.jpg';


import Axios from 'axios';

class TreinoGitHub extends Component{
  constructor(){
    super();
    this.state = {
      lista: [],
      login: '',
      id: '',
      name: '',
      description: '',
      create_at: '',
      size: '',
    };
  }// fim constructor

  atualizaLogin = (event) =>{
    this.setState({login:event.target.value})
    console.log(this.state);
  }

  trazInformacoes = (event) =>{
    event.preventDefault();
    //Axios.get('http://api.github.com/users/'+ this.state.login + '/repos')
    Axios.get('http://localhost:3001/Repos')

      .then(response =>{
        //if(response.status === 200){
          console.log(response.data)
          //this.setState({    
            // login: response.login,
            // lista: response.data,
            // id: response.id,
            // name: response.name,
            // description: response.description,
            // create_at: response.create_at,
            // size: response.size
        
        
        // }else{
        //   console.log("Vixi... Não deu certo... Vc digitou certinho?")
        // } 
      })
      .catch(erro=>{
          this.setState({erro:"Vixi... Não deu certo... Vc digitou certinho?"})
          console.log(erro);
      });
  }

  render(){
    return(
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src = {logo} />
            <h1>Super GitHub</h1>
          </div>
        </header>

        <main className="conteudoPrincipal">
          <section>
            <div>
              <h2>Repositório GitHub</h2>
              <form>
                <div className='container'>
                  <input 
                    type='text'
                    className='className__Git'
                    placeholder= 'Digite o usuário para ver seu gitHub'
                    value={this.state.login}
                    onChange={this.atualizaLogin}
                  />

                  <button
                    id="btn_buscaCep"
                    onClick={this.trazInformacoes}
                  >
                    Procurar Repositório do GitHub
                  </button>

                </div>
              </form>
            </div>

            <div className="container">
              <table id = "tabela-git">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data de Criação</th>
                    <th>Tamanho</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{this.state.id}</td>
                    <td>{this.state.name}</td>
                    <td>{this.state.description}</td>
                    <td>{this.state.create_at}</td>
                    <td>{this.state.size}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </section>

        </main>
      </div>
    );
  }//fim render

}//fim class TreinoGitHub

export default TreinoGitHub;
