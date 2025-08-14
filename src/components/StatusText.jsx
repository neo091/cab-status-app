const StatusText = ({ status }) => {
  return (
    <p className="text-xl">
      Estado:{" "}
      {status !== "descansando" ? (
        status === "libre" ? (
          <span className="text-green-500 font-bold ">Libre</span>
        ) : (
          <span className="text-red-500 font-bold ">Ocupado</span>
        )
      ) : (
        <span className="text-gray-500 font-bold ">Descansando 😴</span>
      )}
    </p>
  )
}

export default StatusText
