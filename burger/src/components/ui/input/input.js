import React from 'react';
import classes from './input.module.css';

const input = (props)=>{
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    console.log(props.invalid);
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
            onChange={props.changed} 
            className={inputClasses.join(' ')}
              {...props.elementConfig} 
              defaultValue={props.value}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
            onChange={props.changed}
            className={inputClasses.join(' ')}
             {...props.elementConfig} 
             defaultValue={props.value}/>
            break;
        case ('select'):
        inputElement = (<select 
          onChange={props.changed}
          className={inputClasses.join(' ')}>
          {props.elementConfig.options.map(option =>(
           <option 
           key={option.value} 
           value={option.value}>{option.displayValue}
           </option>   
          ))}
          </select>)
            break;
        default:
            inputElement = <input 
            onChange={props.changed}
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            defaultValue={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;