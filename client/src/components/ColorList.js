import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    //? Make a put request to save your updated color
    //? think about where will you get the id from...
    //? where is is saved right now?
    console.log('This is saved edit colors', colors);
    console.log('This is color', color);
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('inside save edit', res)
        setColorToEdit(res.data)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log('This is color to delete', color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res)
      })
  };

  const handlechanges = e => {
    setColorToEdit({...colorToEdit, [e.target.name]: e.target.value})
  };

  const addColor = e => {
    axiosWithAuth()
      .post('/api/colors', colorToEdit)
      .then(res => {
        console.log(res)
      })
  };

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
      {/* stretch - build another form here to add a color */}
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
