import { Link } from "react-router"

const Unauthorized = () => {
  return (
    <>
      <h1>Unauthorized</h1>
      <h2>You have to login to access</h2>
      <Link to='/auth'>Go to login page</Link>
    </>
  )
}

export default Unauthorized