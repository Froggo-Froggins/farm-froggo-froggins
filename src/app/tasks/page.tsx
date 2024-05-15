import styles from './tasksPage.module.css'
import Topbar from "../components/topbar/Topbar";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/auth";
import User from "../components/user/User";
import Points from '../components/points/Points';

export default async function Tasks() {
  
  const ses = await getServerSession(authConfig);

  console.info(ses?.user);
  return (
    <div className={styles.missions}>
        <Topbar/>
        <User session={ses}/>
        <Points points={200} referalPoints={43} referals={3}/>
    </div>
  );
}