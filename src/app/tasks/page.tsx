import styles from './tasksPage.module.css'
import Topbar from "../components/topbar/Topbar";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/auth";
import User from "../components/user/User";
import Points from '../components/points/Points';
import Tasks, { ITask } from '../components/tasks/Tasks';

const tasks: ITask[] = [
  { desc: "Complete the profile setup", points: 10, link: "/profile",taskButtonText:"Start" },
  { desc: "Join the community chat", points: 15, link: "/chat",taskButtonText:"Start" },
  { desc: "Refer a friend", points: 20, link: "/refer",taskButtonText:"Start" },
  { desc: "Submit a feedback form", points: 5, link: "/feedback",taskButtonText:"Start" },
  { desc: "Complete a survey", points: 25, link: "/survey",taskButtonText:"Start" },
];


export default async function TasksPage() {
  
  const ses = await getServerSession(authConfig);

  console.info(ses?.user);
  return (
    <div className={styles.tasksPage}>
        <Topbar/>
        <User session={ses}/>
        <Points points={200} referalPoints={43} referals={3}/>
        <Tasks currentTasks={tasks}/>
    </div>
  );
}