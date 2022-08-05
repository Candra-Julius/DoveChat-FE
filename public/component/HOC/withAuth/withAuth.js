import Login from "../../../../pages/login"
// import { useRouter } from "next/router"

const withAuth = (Component) => {
    const Auth = (props) =>{
        // const router = useRouter()
        const {isLoggedIn} = props
        if(!isLoggedIn){
            return (
                // router.push('/login')
                <Login/>
            )
        }
        return(
            <Component {...props}/>
        )
    }
    if(Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }
    return Auth
}

export default withAuth