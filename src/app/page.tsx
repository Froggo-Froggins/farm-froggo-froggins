import Image from "next/image";
import styles from "./page.module.css";
import Topbar from "./components/topbar/Topbar";
import CustomButton from "./components/button/Button";

export default function Home() {
  return (
    <main className={"main"}>
      <Topbar/>
      <h1 style={{textAlign:'center'}}>Farm $FROGGINS by completing tasks!</h1>
      <div className="customButtonHolder">
        <CustomButton text="Connect X" link="https://www.google.com"/>
      </div>
    </main>
  );
}
