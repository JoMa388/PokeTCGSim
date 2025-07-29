import { createPortal } from "react-dom"
import PlayCard from "../../../components/PlayCard.jsx"
const Modal = ({ array, from, closeModal, label }) => {
  return (
    <>
      {createPortal(
        <div className="z-50 fixed translate-y-1/8 translate-x-1/2 inset-0 h-6/10 w-1/2 bg-green-900 p-2 rounded-xl">
          {/* Header */}
          <div className="flex justify-center p-1 w-full rounded-t-xl relative">
            <h2 className="text-xl font-extrabold">{label}</h2>
            <p onClick={() => closeModal()} className="absolute right-0 mr-2 -translate-y-1 text-red-900 text-2xl font-extrabold hover:text-red-700 cursor-pointer ">X</p>
          </div>
          <div className="relative h-9/10 z-40 overflow-y-scroll">
            <div className="grid grid-cols-7 bg-gray-300 relative z-50" >
              {array.map((card) => (
                <div key={card.id} className="relative m-2 overflow-visible z-50 ">
                  <PlayCard card={card} from={from} />
                </div>
              ))}
            </div>
          </div>
        </div>
        ,
        document.body)
      }
    </>
  )
}

export default Modal
