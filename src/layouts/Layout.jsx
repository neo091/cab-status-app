function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-dvh bg-gray-900 text-white fade-in">
      {children}
    </div>
  )
}

export default Layout
