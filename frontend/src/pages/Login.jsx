import loginImg from "../assets/Images/login.webp"
import Templete from "../components/core/Auth/Templete"

function Login() {
  return (
    <Templete
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login;