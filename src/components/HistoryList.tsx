import { IconsTrash } from "../assets/Icons"
import { useConfig } from "../context/config/useConfig"

type HistoryItem = {
  created_at: string
  amount: string
  paymethod: string
  duration: string
  id: string
}

interface HistoriListProps {
  historyList: HistoryItem[]
  handleDelete: (id: string) => void
}

function HistoriList({ historyList, handleDelete }: HistoriListProps) {
  const { currency } = useConfig()
  return historyList.map((h: HistoryItem) => (
    <div
      key={h.id}
      className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg flex overflow-hidden hover:border-green-500/50 transition-colors"
    >
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <p className="text-2xl font-black text-white">
            {h.amount}{" "}
            <span className="text-green-400 text-lg">{currency}</span>
          </p>
          <span
            className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${h.paymethod === "CASH" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
          >
            {h.paymethod}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          ⏱️ {h.duration} •{" "}
          {new Date(h.created_at).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
          })}
        </p>
      </div>
      <button
        onClick={() => handleDelete(h.id)}
        className="bg-gray-700/30 hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all px-4 flex items-center"
      >
        <IconsTrash />
      </button>
    </div>
  ))
}

export default HistoriList
