import InlineSVG from '../../../utils/InlineSVG';

function InputTemplate(props) {
  const {
    defaultStyle,
    searchStyle,
    large,
    className,
    placeholder,
    value,
    onChange,
  } = props;

  return (
    <div
      className={`
        ${className} 
        ${defaultStyle && 'default-input-wrapper'}
        ${searchStyle && 'search-input-wrapper'}
        input-wrapper
      `}
    >
      {searchStyle && <InlineSVG className="icon-wrapper" svgClassName="icon" path="/icons/search.svg" />}
      <input className={`${large && 'large'} input`} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export function Input(props) {
  return (
    <InputTemplate {...props} defaultStyle />
  );
}

export function Search(props) {
  return (
    <InputTemplate {...props} searchStyle />
  );
}

export default Input;
