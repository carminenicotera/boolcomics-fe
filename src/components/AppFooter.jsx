export default function AppFooter() {

  return (
    <>
      <footer className="bg-light text-center py-3 mt-4">
        <div className="container">
          <p className="mb-0">
            &copy; { new Date().getFullYear() } BoolComics. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}