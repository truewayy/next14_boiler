const MyMsg = ({ message }: { message: string }) => (
  <div className="p-6px 10px m-3">
    <div className="bg-blue-500 text-white max-w-320px px-2 py-1 rounded-lg inline-block">
      <p className="text-2xl">{message}</p>
    </div>
  </div>
);

export default MyMsg;
