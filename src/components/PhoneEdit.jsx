import React from "react"

const PhoneEdit = ({ setShowEditTelefono, telefono }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <strong>Enviar a:</strong> <span>{telefono}</span>
      <button onClick={() => setShowEditTelefono(true)}>Editar</button>
    </div>
  )
}

export default PhoneEdit
