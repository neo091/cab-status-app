import CenterBoton from "../components/CenterBotton"
import FinishTripDoalog from "../components/FinishTripDialog"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HomeComponent from "../components/Home"
import Loader from "../components/Loader"
import { Login } from "../components/Login"
import { useAuth } from "../context/auth/useAuth"
import Layout from "../layouts/Layout"

const Home = () => {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) return <HomeComponent />

  return (
    <Layout>
      <Header />
      <CenterBoton />
      <Footer />
      <FinishTripDoalog />
    </Layout>
  )
}

export default Home
