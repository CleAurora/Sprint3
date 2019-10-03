import React,{Component} from 'react';
//imagem
import logo from "../../assets/img/icon-login.png"

//component
import Axios from 'axios';
import Rodape from '../../components/Rodape/Rodope';
import Titulo from '../../components/Titulo/Titulo'

export default class Eventos extends Component{

    constructor(){
        super();
        this.state = {
            lista: [] 
            ,titulo: '',
            dataEvento: '',
            ativo: '',
            idCategoriaNavigation: ''

        };
    }

    componentDidMount(){
        Axios.get('http://192.168.7.85:5000/api/eventos')
            .then(data =>{
                this.setState({lista: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });
    }



    AdicionaEvento = (event) =>{
        event.preventDefault();

        Axios.post('http://192.168.7.85:5000/api/eventos',{
            titulo: this.state.titulo,
            dataEvento: this.state.dataEvento,
            ativo: this.state.ativo,
            idCategoriaNavigation: this.idCategoriaNavigation
        })
            .then(data =>{
                this.setState({lista: data.data});
            })
            .catch(erro => {
                console.log(erro);
            });

    }

    atualizaTitulo = (event) =>{
        this.setState({titulo:event.target.value})
    }
    atualizaLocal = (event) =>{
        this.setState({localizacao:event.target.value})
    }
    atualizaDataEvento = (event) =>{
        this.setState({dataEvento:event.target.value})
    }
    atualizaAcessoLivre = (event) =>{
        this.setState({ativo:event.target.value})
    }
    atualizaidCategoriaNavigation = (event) =>{
        this.setState({idCategoriaNavigation:event.target.value})
    } 

    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} />

                        <nav className="cabecalhoPrincipal-nav">
                            Administrador
                        </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        { <Titulo titulo ="Eventos" /> }
                        <div className="container" id="conteudoPrincipal-lista">

                            <table id="tabela-lista">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Evento</th>
                                <th>Data</th>
                                <th>Acesso Livre</th>
                                <th>Tipo do Evento</th>
                                </tr>
                            </thead>

                            <tbody id="tabela-lista-corpo">
                                {
                                    this.state.lista.map(element =>{
                                        return(
                                            <tr>
                                                <td>{element.idEvento}</td>
                                                <td>{element.titulo}</td>
                                                <td>{element.dataEvento}</td>
                                                <td>{element.ativo ? 'Ativo': 'Inativo'}</td>
                                                <td>{element.idCategoriaNavigation.nome}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>

                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">

                                <input 
                                    id="evento__titulo"
                                    onChange={this.atualizaTitulo}     
                                    placeholder="título do evento" 
                                    type="text"
                                />
                                <input      
                                    id="evento__localizacao" 
                                    onChange={this.atualizaLocal}
                                    placeholder="localização" 
                                    type="text" 

                                />
                                <input 
                                    id="evento__data" 
                                    onChange={this.atualizaDataEvento}
                                    placeholder="dd/MM/yyyy" 
                                    type="text"
                                    

                                />
                                <select id="option__acessolivre" onChange = {this.atualizaAcessoLivre}>
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                                    
                                </select>
                                <select id="option__tipoevento" onChange = {this.atualizaidCategoriaNavigation}>
                                    <option value="0" disabled >Categoria do Evento</option>
                                    {this.state.lista.map(element =>{
                                        return (<option value = {element.idCategoria} key={element.idCategoria} > {element.idCategoriaNavigation.nome} </option>)})} 
                                    
                                </select> 
                                <textarea rows="3" cols="50" placeholder="descrição do evento" id="evento__descricao"></textarea>

                            </div>

                            <div className="item">
                                <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                            </div>
                        </div>
                    </section>
                </main>

                <Rodape />
            </div>
        );
    }
}