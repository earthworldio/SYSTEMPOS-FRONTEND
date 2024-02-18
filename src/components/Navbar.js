import config from '../config'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()

    const handleSignout = () => {
        Swal.fire({
            title: 'SIGN OUT',
            message: 'Do you want to signout ?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.removeItem(config.token_name)
                navigate('/login')
            }
        })

    }
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button className="btn btn-info mr-2">
                            <i className="fa fa-user mr-2"></i>
                            Profile
                        </button>
                        <button onClick={handleSignout} className='btn btn-danger' on>
                            <i className='fa fa-times mr-2'></i>
                            SIGNOUT
                        </button>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar