export default function Modal({
    content="",
    show = false,
    onClose = () => {}
}) {
    return show && <div className="modal-container">
        <div className="modal">
            {content}
        </div>
        <button onClick={onClose}>Close</button>
    </div>
}