import { getmainData } from '@/apis/main';
import ServerUserInfo from '@/components/ServerUserInfo';
import UserInfo from '@/components/UserInfo';

export default async function Home() {
  const data = await getmainData();
  return (
    <div>
      <div className="h-10">{data.todo}</div>
      <UserInfo />
      <ServerUserInfo todo={data.todo} />
    </div>
  );
}
