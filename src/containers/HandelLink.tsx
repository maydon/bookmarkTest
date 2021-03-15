import { useContext, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Submit from '../components/Button';
import TagsInput from '../components/TagsInput';
import TextField from '../components/TextField';
import LinkContext from '../contexts/LinkContext';
import useInput from '../hooks/useInput';
import { validate, getLinkDetails } from '../utils/link';

import classes from './scss/addLink.module.scss';

const HandelLink = ({ history, match }: RouteComponentProps<{ id?: string }>) => {
  const { links, setLinks } = useContext(LinkContext);
  const { id } = match.params;
  const { link, index } = useMemo(() => {
    const index = links.findIndex((l) => l.id === Number(id));
    return { index, link: index !== -1 ? links[index] : null };
  }, [id, links]);

  const [linkState, onLinkChange, onLinkBlur, { setTouched: setLinkTouched, setError: setLinkError }] = useInput(
    link ? link.url : '',
    validate,
  );
  const [tags, setTags] = useState(link ? link.tags : []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (linkState.error) {
      setLinkTouched(true);
    } else {
      getLinkDetails(linkState.value)
        .then((data) => {
          if (!link) {
            setLinks([
              ...links,
              {
                id: links.length ? links[links.length - 1].id + 1 : 0,
                url: linkState.value,
                type: data.type,
                title: data.title,
                author: data.author_name,
                duration: data.duration,
                height: data.height,
                width: data.width,
                createdAt: new Date().toISOString(),
                tags: tags,
              },
            ]);
          } else {
            const nextLinks = [...links];
            nextLinks[index] = { ...link, tags };
            setLinks(nextLinks);
          }
          history.push('/');
        })
        .catch(() => {
          setLinkTouched(true);
          setLinkError('Impossible de résoudre le lien');
        });
    }
  };

  if (!link && id !== undefined) {
    return <div>404 not found</div>;
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          error={linkState.touched ? linkState.error : ''}
          value={linkState.value}
          onChange={onLinkChange}
          onBlur={onLinkBlur}
          label={'URL'}
          disabled={!!link}
        />
        <TagsInput className={classes.tags} tags={tags} onTagsChange={setTags} />
        <Submit className={classes.submit}>{link ? 'Modifier lien' : 'Ajouter lien'} </Submit>
      </form>
    </div>
  );
};

export default HandelLink;
