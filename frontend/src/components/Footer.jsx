import React from 'react'

function Footer() {
    const yearRN = new Date().getFullYear();
  return (
    <>
    <footer>
        <p>Copyright {yearRN}</p>
    </footer>
    </>
  );
}

export default Footer;