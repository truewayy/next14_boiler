'use client';

import { useEffect, useState } from 'react';

import { getmainData } from '@/apis/main';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({} as any);
  useEffect(() => {
    const getData = async () => {
      const data = await getmainData();
      setUserInfo(data);
    };
    getData();
  }, []);

  return (
    <div>
      <p>client: {userInfo.todo}</p>
    </div>
  );
};
export default UserInfo;
