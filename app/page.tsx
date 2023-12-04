import Link from 'next/link';
import React from 'react';

function Index() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-auto flex-col space-y-4">
        {arr.map((item) => (
          <Link
            className="w-32 p-4 bg-gray-200 flex justify-center items-center cursor-pointer rounded-lg"
            href={`/${item}`}
          >
            <div>대화 {item}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;
