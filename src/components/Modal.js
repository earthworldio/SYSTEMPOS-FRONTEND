function Modal(props) {
    let modalSize = 'modal-dialog'
    if (props.modalSize) { modalSize += ' ' + props.modalSize }
    return (
        <>
            <div className="modal" id={props.id} tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard='false' aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={modalSize}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id='staticBackdroplabel'>{props.title}</h1>
                            <button id='modalClose' type="button" className="btn-close ctnClose" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal