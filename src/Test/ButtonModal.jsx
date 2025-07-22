
import { createPortal } from "react-dom"
const ButtonModal = ({ }) => {
  return (
    <>
      {createPortal(<div className="fixed translate-x-1/2 translate-y-1/4 inset-0 h-2/3 w-1/2 bg-gray-300 rounded-xl shadow-2xl z-50 overflow-hidden">
        <div className="flex justify-center m-0 p-3 bg-green-900 w-full">
        </div>
      </div>, document.body)
      }
    </>
  )
}

export default ButtonModal; 
