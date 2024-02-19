import config from '../config'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useState } from 'react'
import axios from 'axios'

function Navbar() {
    const navigate = useNavigate()
    const [memberName, setMemberName] = useState()

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
    /// Call value for show name of user :
    const handleEditProfile = async () => {
        try {
            const url = config.api_path + '/member/info'
            await axios.get(url , config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setMemberName(res.data.result.name)
                };
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    const handleChangeProfile = async () => {
        try {
            const url = config.api_path + '/member/changeProfile'
            const payload = { memberName: memberName }

            await axios.put(url , payload , config.headers()).then(res => {
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'Already change data',
                        text: 'Change data success',
                        icon: 'success',
                        timer: 2000
                    })
                }
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
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
                        <button className="btn btn-info mr-2" data-toggle='modal' data-target='#modalEditProfile' onClick={handleEditProfile}>
                            <i className="fa fa-user mr-2"></i>
                            PROFILE
                        </button>
                        <button onClick={handleSignout} className='btn btn-danger'>
                            <i className='fa fa-times mr-2'></i>
                            SIGNOUT
                        </button>
                    </li>
                </ul>
            </nav>

            <Modal id='modalEditProfile' title='Edit profile' >
                <div>
                    <label>Name :</label>
                    <input value={memberName} onChange={e => setMemberName(e.target.value)} className='form-control'></input>
                </div>
                <div className='mt-3'>
                    <button onClick={handleChangeProfile} className='btn btn-primary'>
                        <i className='fa fa-check mr-2'></i>
                        SAVE
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Navbar