const UserInfo = ({ name = "Harsh Singh", role = "Admin", image = null }) => {
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3 !px-4 !py-4 rounded-3xl bg-purple-200/60 border border-purple-200 shadow-md backdrop-blur-md hover:shadow-lg transition-all duration-300">
      <div className="text-right">
        <p className="text-base font-semibold text-purple-600">{name}</p>
        <p className="text-sm font-medium text-purple-500">{role}</p>
      </div>

      {image ? (
        <div className="w-11 h-11 rounded-full bg-white border border-purple-200 shadow-sm overflow-hidden">
          <img
            src={image}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-full bg-white text-purple-600 border border-purple-300 flex items-center justify-center font-bold text-lg  shadow">
          {getInitial(name)}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
