import React from "react";
import "./style.css";
import Personagem from './components/Personagem';
import { Dropdown, Button, ListGroup } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personagens: []
    }
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => {
        const personagens = data.results
        personagens.sort((a, b) => a.name.localeCompare(b.name))
        this.setState({
          personagens
        })
      })
  }

  removerPersonagem(personagem = null) {
    const personagens = this.state.personagens
    if (personagens.length) {
      let indexPersonagem = 0
      if (personagem) {
        indexPersonagem = personagens.indexOf(personagem)
      }
      if (indexPersonagem != -1) {
        personagens.splice(indexPersonagem, 1)
        this.setState({
          personagens
        })
      }
    }
  }

  render() {
    return (
      <div className="container-personagens">
        <div className="row">
          <div className="col-xs-6 p-3">
            <h1>Personagens:</h1>
            <ListGroup>
              {
                this.state.personagens.map(personagem => {
                  return (
                    <ListGroup.Item key={personagem.name}>
                      <div className="d-flex justify-content-center">
                        <Personagem nome={personagem.name} cor={personagem.eye_color}></Personagem>
                        <Button onClick={() => this.removerPersonagem(personagem)} variant="outline-danger">Remover</Button>
                      </div>
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          </div>
          <div className="col-xs-6 p-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Personagens
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  this.state.personagens.map(personagem => {
                    return (
                      <Dropdown.Item key={personagem.name}>
                        <Personagem nome={personagem.name} cor={personagem.eye_color}></Personagem>
                      </Dropdown.Item>
                    )
                  })
                }
                <Dropdown.Item>
                  <Button onClick={() => this.removerPersonagem()} variant="danger">Remover</Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </div>
      </div>
    )
  }
}
