import SVG from 'react-inlinesvg';

function InlineSVG({
  className,
  path,
  svgClassName,
  width = 25,
  height = 25,
}) {
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <SVG
        src={path}
        style={{
          width,
          height,
        }}
        className={svgClassName}
      />
    </div>
  );
}

export default InlineSVG;
