function HTMLContent({ className, content }) {
  const htmlEscape = content?.replace(/&quot;/g, '"');

  return (
    <div
      className={`${className} html-content`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: htmlEscape,
      }}
    />
  );
}

export default HTMLContent;
