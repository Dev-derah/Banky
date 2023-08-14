const Modal = ({ isOpen, onClose, children }) =>
  isOpen ? (
    <>
      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-80" onClick={onClose}></div>
        <div className="flex items-center min-h-screen px-4 py-8 ">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-600">
            {children}
          </div>
        </div>
      </div>
    </>
  ) : null;

export default Modal;
