import React from 'react'

export default function Personagem(props) {
  const divStyle = {
    color: props.cor
  }
  return (<p style={divStyle} className="mx-2">{ props.nome }</p>)
}