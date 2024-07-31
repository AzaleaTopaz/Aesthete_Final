import '../Aesthete CSS/footer.css' // Import custom CSS if needed

export default function Footer() {
  return (
    <footer className="footer has-text-white">
      <div className="content has-text-centered">
        <p>
          <a
            className="footer-link has-text-white"
            href="https://github.com/AzaleaTopaz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Azalea Nikitin
          </a>
        </p>
        <p>
          <a
            className="footer-link has-text-white"
            href="https://github.com/AzaleaTopaz/Aesthete_Final"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Page
          </a>
        </p>
      </div>
    </footer>
  );
}
