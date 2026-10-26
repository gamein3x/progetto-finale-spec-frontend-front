import { createPortal } from "react-dom";

export default function Modal({
    content="",
    show = false,
    onClose = () => {}
}) {
    // portal su document.body: il modale resta fuori dall'albero DOM di header/pagine
    return show && createPortal(<div className="modal-container" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
            {content}
        </div>
        <button onClick={onClose}>Close</button>
    </div>,
        document.body
    )
}