interface PaginadorProps {
  totalPages: number
  page: number
  prevPage: () => void
  nextPage: () => void
}

function Paginador({ prevPage, nextPage, page, totalPages }: PaginadorProps) {
  return (
    <div className="flex items-center justify-between mt-8 bg-gray-800 p-2 rounded-xl border border-gray-700">
      <button
        disabled={page === 0}
        onClick={prevPage}
        className="p-2 text-white disabled:opacity-30 hover:bg-gray-700 rounded-lg transition-colors"
      >
        Anterior
      </button>
      <span className="text-gray-400 text-sm font-medium">
        Pág. <span className="text-white">{page + 1}</span> de {totalPages}
      </span>
      <button
        disabled={page >= totalPages - 1}
        onClick={nextPage}
        className="p-2 text-white disabled:opacity-30 hover:bg-gray-700 rounded-lg transition-colors"
      >
        Siguiente
      </button>
    </div>
  )
}

export default Paginador
