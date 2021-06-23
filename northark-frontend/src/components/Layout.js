const Layout = ({ children }) => {
  return (
    <div id="layout">
      <nav>
        Navigation
      </nav>
      { children }
      <footer>
        Footer
      </footer>
    </div>
  )
}
export default Layout
