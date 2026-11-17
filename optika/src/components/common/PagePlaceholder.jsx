function PagePlaceholder({ eyebrow, title, description, status }) {
  return (
    <section className="page-placeholder">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="description">{description}</p>
      <p className="page-status">{status}</p>
    </section>
  )
}

export default PagePlaceholder
