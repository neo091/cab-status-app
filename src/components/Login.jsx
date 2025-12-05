import { useState } from "react";
import { useSessionContext } from "../context/Session.context";
import Swal from "sweetalert2";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { doLogin } = useSessionContext();

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
      <div className="bg-white p-5 w-full max-w-sm mx-4 rounded flex flex-col gap-2">
        <h3 className="text-center font-bold text-2xl">Acceder</h3>

        <input
          className="bg-gray-200 p-4 rounded block w-full text-black"
          name="username"
          type="text"
          value={username.toLowerCase()}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />

        <input
          className="bg-gray-200 p-4 rounded block w-full text-black"
          name="password"
          type="password"
          value={password.trim().toLowerCase()}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />

        <div>
          <button
            className="rounded p-4 bg-green-400 w-full"
            onClick={() => {
              const newUsername = username.trim().toLocaleLowerCase();
              const newPassword = password.trim().toLocaleLowerCase();

              if (!newUsername && newUsername == "") {
                console.log("username is empty");
                return;
              }

              if (!newUsername || !newPassword) {
                Swal.fire("Cuidado!", "Usuario y contraseña son obligatorios");
                return;
              }

              if (doLogin({ username: newUsername, password: newPassword })) {
                console.log("Login correcto!");
              } else {
                console.log("Ocurrio un error");
              }
            }}
          >
            Acceder
          </button>
        </div>
      </div>
    </div>
  );
};
