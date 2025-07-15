const Container = ({ heading, placeholder }) => {
  return (
    <div className="my-5 h-[calc(100vh-7rem)]" >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl text-gray- border-l-4 border-violet-500 pl-3">
          {heading}
        </h1>
        <button className="mx-20  cursor-pointer bg-purple-200/60 text-purple-600 font-semibold border-purple-200  px-5 py-2 rounded-full hover:bg-gray-200">
          + Create
        </button>
      </div>

      <div className="bg-gray-100 px-6 pt-5 mx-20 rounded-xl h-max ">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 rounded-full outline-none w-full border border-purple-500 text-slate-800 bg-white max-w-sm"
          />
          <button className="bg-gray-100  text-purple-600 px-4 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
            Search
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto h-95 mr-10 pr-2 scrollbar-thin ">
          {Array(6)
            .fill()
            .map((_, idx) => (
              <div key={idx} className="bg-violet-200 h-11 rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Container;
