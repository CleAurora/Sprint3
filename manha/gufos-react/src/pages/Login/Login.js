import React,{Component} from 'react';
import logo from '../../assets/img/icon-login.png'; 

//axios
import axios from 'axios';
import Axios from 'axios';

class Login extends Component{

    constructor(){ //para afzer a etsrutura do meu estado
        super();//falo de onde ela vem (classe super, ou pai ou mãe)
        this.state = {// já tenho a estrutura, basta eu criar meu estado no etilo json js
            email: "",
            senha: "",
            erro: ""
        }
    }

    atualizaEstadoEmail = (event) =>{//to criando minha função com um event
        this.setState({email: event.target.value});
    }

    atualizaEstadoSenha = (event) =>{
        this.setState({senha: event.target.value});
    }

    efetuarLogin = (event) =>{//criando mais uma função
        event.preventDefault();
        //console.log(this.state);
        Axios.post("http://192.168.7.85:5000/api/login", {
            email: this.state.email,
            senha: this.state.senha
        })
        .then(response =>{
            if(response.status === 200){
                console.log(response.data.token);
                localStorage.setItem("usuario-gufos",response.data.token);
                this.props.history.push("/categorias")//to referenciando meu objeto login; props são propriedades passadas de componente para componente; historyretorna essa histõria, em que rota ele esá localizado
            }else{
                console.log('Vixi! Deu ruim!')
            }
        }) //me preparando para receber a resposta do backend
        .catch(erro => {
            this.setState({erro: "Usuário ou senha inválidos"});
            console.log(erro);
        });
    }

    render(){
        return(
            <section className="container flex">
            <div className="img__login"><div className="img__overlay"></div></div>

            <div className="item__login">
                <div className="row">
                <div className="item">
                    <img src={logo} className="icone__login" />
                </div>
                <div className="item" id="item__title">
                    <p className="text__login" id="item__description">
                    Bem-vindo! Faça login para acessar sua conta.
                    </p>
                </div>
                <form onSubmit = {this.efetuarLogin}>
                    <div className="item">
                    <input
                        className="input__login"
                        placeholder="username"
                        onInput={this.atualizaEstadoEmail}
                        type="text"
                        name="username"
                        id="login__email"
                    />
                    <p
                        className="text__login"
                        style={{color: "red", textAlign:"center"}} 
                    >
                        {this.state.erro}
                    </p>
                    </div>
                    <div className="item">
                    <input
                        className="input__login"
                        placeholder="password"
                        onInput={this.atualizaEstadoSenha}
                        type="password"
                        name="password"
                        id="login__password"
                    />
                    </div>
                    <div className="item">
                    <button className="btn btn__login" id="btn__login">
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </section>
        ) 
    }

}

export default Login;