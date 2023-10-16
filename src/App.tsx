import React from 'react';
import './App.css';

type ParamType = string;

interface Color {
  color: string;
}
interface Param {
  id: number;
  name: ParamType;
  type: ParamType;
}
interface ParamValue {
   paramId: number;
   value: ParamType;
}
interface Model {
   paramValues: ParamValue[];
   colors?: Color[];
}
interface Props {
   params: Param[];
   model: Model;
}
interface State {
  paramValues:ParamValue[]
}

const params: Param[] = 
  [
    {
      id: 1,
      name: "Назначение",
      type:'string'
    },
    {
      id: 2,
      name: "Длина2",
      type:'string'
    }
  ]

const initialModel: Model =
  {
    "paramValues": [
      {
        "paramId": 1,
        "value": "повседневное"
      },
      {
        "paramId": 2,
        "value": "макси"
      }
    ] 
  }

class ParamEditor extends React.Component<Props, State> {
  
  state:State = this.props.model;

  public getModel(): Model {
    return this.props.model
  }

  handleChange = (paramId:number, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => {
      const updatedParamValues = prevState.paramValues.map(paramValue => {
        if (paramValue.paramId === paramId) {
          return { ...paramValue, value: event.target.value };
        }
        return paramValue;
      });
      return { paramValues: updatedParamValues };
    });
  };
  
  render() {
    const {params} = this.props;
    return (
      <>
        {this.state.paramValues.map((el) => {
          return (
            params.map(param => {
              if (param.id === el.paramId) {
                return (
                  <label className="App_label">
                  {param.name}
                  <input className="App_input" value={el.value} onChange={e => this.handleChange(param.id, e)}/>
                  </label>
                )
              }
              return false;
            })
          )
        })}
        <button onClick={(event) => {
          event.preventDefault();
          console.log(this.getModel());
        }}>
          Get model in console
        </button>
      </>

    );
  }
}

function App() {
  return (
    <div className="App">
      <form className="App_form">
        <ParamEditor params={params} model={initialModel}/>
      </form>
    </div>
  );
}

export default App;
