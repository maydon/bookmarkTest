import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Table, { Header } from '../components/Table';
import LinkContext, { Link as LinkInterface } from '../contexts/LinkContext';

import classes from './scss/links.module.scss';

const formatNumber = (n: number) => {
  if (n < 10) return `0${n}`;
  return n;
};

const Links = () => {
  const { links, setLinks } = useContext(LinkContext);
  const headers: Header<LinkInterface>[] = [
    { title: 'URL', key: 'url', dataIndex: 'url' },
    { title: 'Titre', key: 'title', dataIndex: 'title' },
    { title: 'Auteur', key: 'author', dataIndex: 'author' },
    {
      title: "Date d'ajout",
      key: 'createdAt',
      render: (row) => {
        const date = new Date(row.createdAt);
        return `${formatNumber(date.getDay())}/${formatNumber(date.getMonth())}/${date.getFullYear()}`;
      },
    },
    {
      title: '',
      key: 'actions',
      render: (row) => (
        <div className={classes.actions}>
          <Link to={`/update/${row.id}`}>Modifier</Link>
          <div
            onClick={() => {
              setLinks(links.filter((link) => link.id !== row.id));
            }}
            className={classes.delete}
          >
            Supprimer
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <Button className={classes.add} to="/add" variant="link">
        Ajouter un url
      </Button>
      <Table
        EmptyComponent={() => (
          <div className={classes.empty}>
            Aucun lien trouvé essayez de cliquer sur le bouton ci-dessus pour ajouter un
          </div>
        )}
        keyExtractor={(link) => link.url}
        headers={headers}
        data={links}
      />
    </div>
  );
};

export default Links;
