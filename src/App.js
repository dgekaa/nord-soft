import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { LoginPassword, UserName } from "./authorization/authorization.js"
import Information from "./information/information.js"
import NotFound from "./notFound/notFound.js"

class App extends Component {
  state = {
    loginOrUsername : true,
    currentPassword : "nord-soft",
    currentLogin : "Evgeniy",
    passwordValue : "",
    loginValue : "",
    userNameValue : ""
  }

  clickLoginBtn = () => {
    const { loginOrUsername, passwordValue, currentPassword, loginValue, currentLogin } = this.state;
    if(passwordValue === currentPassword && loginValue === currentLogin){
      this.setState({
        loginOrUsername : !loginOrUsername,
      })
    }else{
      console.log('NO!!')
    } 
  }

   clickLogout = () => {
    const { loginOrUsername } = this.state;
      this.setState({
        loginOrUsername : !loginOrUsername,
        passwordValue : "",
        loginValue: ""
      })
   }

  changePassword = ({ target : {value} }) => {
    this.setState({
      passwordValue : value
    })
  }

  changeLogin = ({ target : {value} }) => {
    this.setState({
      loginValue : value
    })
  }

  changeUserName = ({ target : {value} }) => {
     this.setState({
      userNameValue : value
    })
  }

  render(){
    const { loginOrUsername, passwordValue, loginValue, userNameValue, currentPassword, currentLogin } = this.state;

    return(
      <BrowserRouter>
        <Fragment>
          <Switch>
            { 
              loginOrUsername 
                ? <Route 
                  exact path="/" 
                  render={ props => 
                    <LoginPassword 
                      { ...props }  
                      onClick={ this.clickLoginBtn }
                      loginOrUsername={ loginOrUsername }
                      passwordValue={ passwordValue }
                      loginValue={ loginValue }
                      onchangePassword={ this.changePassword }
                      onchangeLogin={ this.changeLogin }
                      currentPassword={ currentPassword }
                      currentLogin={ currentLogin }
                    />
                  }
                />
                : <Route 
                    exact path="/" 
                    render={ props => 
                      <UserName 
                        { ...props }  
                        onChange={ this.changeUserName }
                        value={ userNameValue }
                      />
                  }
                />
            }
            {
              userNameValue
                ? <Route 
                  path="/information" 
                  render={ props => 
                    <Information 
                      { ...props }  
                      userNameValue={ userNameValue } 
                      loginOrUsername={ loginOrUsername }
                      clickLoginBtn={ this.clickLoginBtn }
                      clickLogout={ this.clickLogout }
                    />
                  }
                />
                : <Redirect to="/"/>
            }
            <Route component={ NotFound }/>
          </Switch>    
        </Fragment>
      </BrowserRouter> 
      
    )

  }
}

export default App;
