import { Outlet } from "react-router-dom";

export default function DefaultLyout() {

  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}