import { Link } from "@inertiajs/inertia-react";
import "../../css/paginater.css";
import parse from "html-react-parser";

export default function Paginater({ page_links }) {
  return (
    <div className="paginater-container">
      {page_links.length !== 0 &&
        page_links.map((link) => {
          if (link.url !== null) {
            return (
              <Link
                key={link.label}
                href={link.url}
                className={link.active === true ? "active" : ""}
              >
                {parse(link.label)}
              </Link>
            );
          }
        })}
    </div>
  );
}
