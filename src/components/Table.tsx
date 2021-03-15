import classes from './scss/table.module.scss';

export type Header<T> =
  | {
      title: React.ReactNode;
      key: string;
      render: (record: T, index: number) => React.ReactNode;
      dataIndex?: undefined;
    }
  | {
      title: React.ReactNode;
      key: string;
      dataIndex: keyof T;
      render?: undefined;
    };

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  EmptyComponent?: React.ComponentType;
  count?: number;
  keyExtractor?: (row: T, index: number) => string;
}

function Table<T>({ headers, data, EmptyComponent, keyExtractor }: TableProps<T>) {
  if (data.length === 0 && EmptyComponent) return <EmptyComponent />;

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} className={classes.th}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {data.map((d, index) => (
            <tr key={keyExtractor ? keyExtractor(d, index) : index}>
              {headers.map((header) => (
                <td key={header.key} className={classes.td}>
                  {header.render ? header.render(d, index) : d[header.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
