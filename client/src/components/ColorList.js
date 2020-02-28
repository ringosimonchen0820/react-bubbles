import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log('this is colors', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  // console.log('this is color outside save', color)
  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // console.log('This is save edit colors',colors)
    // console.log('this is color', color)
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      // props.history.push(`/movies/${colors.id}`);
      console.log('res inside save edit',res)
      setColorToEdit(res.data)
    })
  }
  const addColor = e => {
    axiosWithAuth().post('/api/colors', colorToEdit)
    .then(res=> console.log(res))
  }
  console.log('this is color to edit', colorToEdit)
  // console.log('this is props', props)
  const deleteColor = color => {
    console.log('this is colar in delete', color)
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(res => {
      // props.history.push('bubblePage')
    })
  }
  const handlechanges = e => {
    setColorToEdit({...colorToEdit, [e.target.name]: e.target.value})
}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={addColor}>
        <input
          type='text'
          placeholder='color'
          name='color'
          onChange={handlechanges}
          value={colorToEdit.color}
        />
        <input
          type='text'
          placeholder='color-code'
          name='code'
          onChange={handlechanges}
          value={colorToEdit.code.hex}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ColorList;