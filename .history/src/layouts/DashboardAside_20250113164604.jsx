import Image from "next/image";

export default function DashboardAside() {
  return (
    <div>
      <nav>
        <div>
          <Image src={""} />
        </div>
        <ul>
          <li>Les joueurs</li>
          <li>Les jeux</li>
          <li>Les sponsors</li>
        </ul>
      </nav>
    </div>
  );
}
