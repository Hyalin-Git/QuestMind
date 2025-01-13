import Image from "next/image";
import Link from "next/link";

export default function DashboardAside() {
  return (
    <div>
      <nav>
        <div>
          <Link href={"/"}>
            <Image
              src={"/quest-mind-logo.svg"}
              width={140}
              height={140}
              alt="QuestMind"
            />
          </Link>
        </div>
        <div>
          <ul>
            <li>Les joueurs</li>
            <li>Les jeux</li>
            <li>Les sponsors</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
