import { useState, useEffect } from "react"
import axios from 'axios'
import config from "../config"
import Modal from "../components/Modal"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

function Package() {

    const [packages, setPackage] = useState([])
    const [yourPackage, setYourPackage] = useState({})
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const choosePackage = (item) => {
        setYourPackage(item)
    }

    const fetchData = async () => {
        try {
            axios.get(config.api_path + '/package/list').then(res => {
                setPackage(res.data.result)
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    /// When use  API ( Async / Try catch )
    const handleRegister = async (e) => {
        /// Make (FORM) not reload
        e.preventDefault()

        const payload = {
            packageId: yourPackage.id,
            name: name,
            phone: phone,
            password: password
        }
        try {
            Swal.fire({
                title: 'Are you confirm to Register ?',
                text: 'Please confirm to Register',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            }).then(res => {
                if (res.isConfirmed) {
                    axios.post(config.api_path + '/package/memberRegister', payload).then(res => {
                        if (res.data.message === 'success') {
                            Swal.fire({
                                title: 'Register',
                                text: 'Success to Register',
                                icon: 'success',
                                timer: 2000
                            })
                            document.getElementById('modalClose').click()
                            navigate('/login')
                        }
                    }).catch(err => {
                        throw err.response.data
                    })
                }
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                message: e.message,
                icon: "error"
            })
        }
    }

    return (
        <>
            <div className="container mt-2">
                <div className="h2 text-secondary">Workshop POS : Point of sale on cloud</div>
                <div className="h5">Package :</div>
                <div className="row">
                    {packages.map(item =>
                        <div className="col-4" key={item.id}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="h4 text-success">{item.name}</div>
                                    <div>{item.bill_amount} Bill</div>
                                    <div>{item.price} B</div>
                                    <div className="mt-3">
                                        <button onClick={e => choosePackage(item)} data-bs-toggle="modal" data-bs-target="#modalRegister" className="btn btn-primary">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Modal id="modalRegister" title="Register">
                    <form onSubmit={handleRegister}>
                        <div>
                            <div className="alert alert-info">{yourPackage.name} : {yourPackage.price} B </div>
                        </div>
                        <div className="mt-3">
                            <label>Name : </label>
                            <input className="form-control" onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className="mt-3">
                            <label>Tel :</label>
                            <input className="form-control" onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="mt-3">
                            <label>Password :</label>
                            <input className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="mt-3">
                            <button className="mt-3 btn btn-primary" onClick={handleRegister}>Register <i className="fa fa-arrow-right" /></button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}

export default Package