const Discard = ({ array }) => {
  return (
    <>
      {array.length > 0 && (
        <div className="flex relative h-full justify-center items-center">
          <img src={array.at(0).images.small} className="h-full w-full absolute" />
          {/* <img src="https://images.pokemontcg.io/svp/160.png" className="h-full" /> */}
          <p className="absolute text-3xl font-bold">{array.length}</p>
        </div>
      )}
    </>

  )
}

export default Discard 
