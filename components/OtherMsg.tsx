const OtherMsg = ({ user, message }: { user: string; message: string }) => (
  <div className="p-6px 10px m-3 text-right">
    <p className="text-right text-black text-lg">{user}</p>
    <div className="bg-green-400 text-white max-w-320px px-2 py-1 rounded-lg inline-block">
      <p className="text-2xl">{message}</p>
    </div>
  </div>
);

export default OtherMsg;
