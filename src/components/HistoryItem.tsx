import { IconsTrash } from "../assets/Icons"

export type HistoryItemType = {
  created_at: string
  amount: string
  paymethod: string
  duration: string
  id: string
}

interface HistoryItemProps {
  item: HistoryItemType
  onDelete: (id: string) => void
  currency: string
}

function HistoryItem({ item, onDelete, currency }: HistoryItemProps) {
  return (
    <>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg flex overflow-hidden hover:border-green-500/50 transition-colors">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <p className="text-2xl font-black text-white">
              {item.amount}{" "}
              <span className="text-green-400 text-lg">{currency}</span>
            </p>
            <span
              className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${item.paymethod === "CASH" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
            >
              {item.paymethod}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            ⏱️ {item.duration} •{" "}
            {new Date(item.created_at).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-gray-700/30 hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all px-4 flex items-center"
        >
          <IconsTrash />
        </button>
      </div>

      {/* <div className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-2xl flex items-center justify-between group animate-fadeIn">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${item.paymethod === "CARD" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}
          >
            {item.paymethod === "CARD" ? "💳" : "💵"}
          </div>

          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">
              {new Date(item.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xl font-black text-white">
              {item.amount}
              <span className="text-sm ml-1 text-gray-400">{currency}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-900 text-gray-500 uppercase">
            {item.paymethod === "CARD" ? "T" : "E"}
          </span>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <IconsTrash size={5} />
          </button>
        </div>
      </div> */}
    </>
  )
}

export default HistoryItem
