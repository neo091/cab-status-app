import HistoryItem, { HistoryItemType } from "./HistoryItem"

interface HistoriListProps {
  historyList: HistoryItemType[]
  handleDelete: (id: string) => void
  currency: string
}

function HistoryList({
  historyList,
  handleDelete,
  currency,
}: HistoriListProps) {
  return (
    <div className="flex flex-col gap-3">
      {historyList.map((h: HistoryItemType) => (
        <HistoryItem
          item={h}
          currency={currency}
          onDelete={handleDelete}
          key={h.id}
        />
      ))}
    </div>
  )
}

export default HistoryList
