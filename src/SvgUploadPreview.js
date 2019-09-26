import React from 'react';
import PropTypes from 'prop-types';
import { PatchEvent, set, unset } from 'part:@sanity/form-builder/patch-event';
import FormField from 'part:@sanity/components/formfields/default';
import styles from './SvgUploadPreview.css';

class SvgStringInput extends React.Component {
  inputRef = React.createRef();

  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.object,
    level: PropTypes.number,
    onChange: PropTypes.func,
  };

  handleChange = event => {
    const file = event.target.files[0];
    if (file.type !== 'image/svg+xml') {
      // eslint-disable-next-line no-alert
      window.alert(`The type of the selected file is not svg: ${file.type}`);
      return;
    }
    const reader = new FileReader();
    reader.onload = readerEvent => {
      this.props.onChange(PatchEvent.from(set(readerEvent.target.result)));
    };
    reader.readAsText(file);
  };

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const { value, type, level } = this.props;
    return (
      <FormField label={type.title} level={level} description={type.description}>
        <input ref={this.inputRef} type="file" placeholder={type.placeholder} onChange={this.handleChange} />
        {value && (
          <div className={styles.svgPreviewBackground}>
            <div dangerouslySetInnerHTML={{ __html: value }} />
            <button type="button" onClick={() => this.props.onChange(PatchEvent.from(unset()))}>
              Remove
            </button>
          </div>
        )}
      </FormField>
    );
  }
}

export default SvgStringInput;
