import React from "react";

export default function Footer(props) {
  const date = new Date();
  return (
    <footer className="footer">
      <p>&copy;Build Your Future Today {date.getFullYear()}</p>
    </footer>
  );
}
