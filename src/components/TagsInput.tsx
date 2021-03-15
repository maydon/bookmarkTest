import useInput from '../hooks/useInput';
import TextField from './TextField';
import remove from '../assets/remove.svg';
import classes from './scss/tagsInput.module.scss';

interface TagsInputProps {
  tags: string[];
  onTagsChange: (value: string[]) => void;
  className?: string;
  label: string;
}

const TagsInput = ({ tags, label, onTagsChange, className }: TagsInputProps) => {
  // eslint-disable-next-line
  const [{ value, error }, onChange, onBlur, { setError, setValue }] = useInput('');

  const addTag = () => {
    if (!value) {
      setError("Impossible d'ajouter un Tag vide");
    } else if (tags.find((tag) => tag === value)) {
      setError('Tag déjà exist');
    } else {
      onTagsChange([...tags, value]);
      setValue('');
      setError('');
    }
  };

  const renderTag = (tag: string) => {
    return (
      <div key={tag} className={classes.tagContainer}>
        {tag}
        <img
          onClick={() => onTagsChange(tags.filter((t) => t !== tag))}
          src={remove}
          alt="remove"
          className={classes.tagButton}
        />
      </div>
    );
  };

  return (
    <TextField
      className={className}
      label={label}
      error={error}
      inputComponent={
        <div className={classes.inputContainer}>
          {tags.map(renderTag)}
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            className={classes.input}
            value={value}
            onChange={onChange}
          />
          <div onClick={addTag} className={classes.add}>
            Ajouter
          </div>
        </div>
      }
    />
  );
};

TagsInput.defaultProps = {
  label: 'TAGS',
};

export default TagsInput;
